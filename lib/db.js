import { Pool } from "pg";
import fs from "fs";
import path from "path";

// File storage fallback configuration
const dataDir = path.join(process.cwd(), "data");
const jsonFilePath = path.join(dataDir, "enquiries.json");

function ensureJsonFileExists() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(jsonFilePath)) {
    fs.writeFileSync(jsonFilePath, JSON.stringify([], null, 2), "utf8");
  }
}

function readJsonEnquiries() {
  ensureJsonFileExists();
  try {
    const data = fs.readFileSync(jsonFilePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading enquiries.json:", error);
    return [];
  }
}

function writeJsonEnquiries(enquiries) {
  ensureJsonFileExists();
  fs.writeFileSync(jsonFilePath, JSON.stringify(enquiries, null, 2), "utf8");
}

// PostgreSQL Pool Singleton
let pool = null;
let isTableInitialized = false;

export function isPostgresConfigured() {
  return Boolean(
    process.env.DATABASE_URL ||
      process.env.POSTGRES_URL ||
      process.env.PGHOST ||
      process.env.DB_HOST
  );
}

export function getPool() {
  if (!isPostgresConfigured()) {
    return null;
  }

  if (!pool) {
    const connectionString =
      process.env.DATABASE_URL || process.env.POSTGRES_URL;

    if (connectionString) {
      const isRemote =
        connectionString.includes("neon.tech") ||
        connectionString.includes("supabase.co") ||
        connectionString.includes("render.com") ||
        connectionString.includes("railway.app") ||
        connectionString.includes("aws") ||
        process.env.PGSSLMODE === "require" ||
        process.env.NODE_ENV === "production";

      pool = new Pool({
        connectionString,
        ssl: isRemote ? { rejectUnauthorized: false } : undefined,
      });
    } else {
      pool = new Pool({
        host: process.env.PGHOST || process.env.DB_HOST || "localhost",
        user: process.env.PGUSER || process.env.DB_USER || "postgres",
        password: process.env.PGPASSWORD || process.env.DB_PASSWORD || "",
        database: process.env.PGDATABASE || process.env.DB_NAME || "postgres",
        port: parseInt(process.env.PGPORT || process.env.DB_PORT || "5432", 10),
        ssl:
          process.env.PGSSL === "true" || process.env.DB_SSL === "true"
            ? { rejectUnauthorized: false }
            : undefined,
      });
    }

    pool.on("error", (err) => {
      console.error("Unexpected error on idle PostgreSQL client:", err);
    });
  }

  return pool;
}

export async function initDb() {
  const currentPool = getPool();
  if (!currentPool || isTableInitialized) return;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS enquiries (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      institution VARCHAR(100),
      city VARCHAR(100),
      designation VARCHAR(100),
      message TEXT,
      students VARCHAR(50),
      solution_interest VARCHAR(100),
      implementation_time VARCHAR(100),
      status VARCHAR(50) DEFAULT 'New',
      source VARCHAR(100) DEFAULT 'Hero Section Form',
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
  `;

  try {
    await currentPool.query(createTableQuery);
    isTableInitialized = true;
    console.log("PostgreSQL 'enquiries' table verified and ready.");
  } catch (error) {
    console.error("Failed to initialize PostgreSQL table:", error);
  }
}

// Database helper functions with automatic PostgreSQL / JSON fallback
export async function getAllEnquiries() {
  const currentPool = getPool();

  if (currentPool) {
    try {
      await initDb();
      const res = await currentPool.query(
        "SELECT * FROM enquiries ORDER BY created_at DESC"
      );
      return res.rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        institution: row.institution,
        city: row.city,
        designation: row.designation,
        message: row.message,
        students: row.students,
        solution_interest: row.solution_interest,
        implementation_time: row.implementation_time,
        status: row.status,
        source: row.source,
        notes: row.notes,
        createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
        updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : null,
      }));
    } catch (error) {
      console.error("PostgreSQL query error in getAllEnquiries (falling back to JSON):", error);
    }
  }

  // Fallback to local JSON
  const data = readJsonEnquiries();
  data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  return data;
}

export async function insertEnquiry(enquiryData) {
  const currentPool = getPool();

  if (currentPool) {
    try {
      await initDb();
      const insertQuery = `
        INSERT INTO enquiries (
          id, name, email, phone, institution, city, designation,
          message, students, solution_interest, implementation_time,
          status, source, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7,
          $8, $9, $10, $11,
          $12, $13, $14, $15
        ) RETURNING *;
      `;

      const values = [
        enquiryData.id,
        enquiryData.name,
        enquiryData.email,
        enquiryData.phone,
        enquiryData.institution || "School",
        enquiryData.city || "",
        enquiryData.designation || "Other",
        enquiryData.message || "",
        enquiryData.students || "",
        enquiryData.solution_interest || "",
        enquiryData.implementation_time || "",
        enquiryData.status || "New",
        enquiryData.source || "Hero Section Form",
        enquiryData.createdAt || new Date(),
        new Date(),
      ];

      const res = await currentPool.query(insertQuery, values);
      const row = res.rows[0];

      return {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        institution: row.institution,
        city: row.city,
        designation: row.designation,
        message: row.message,
        students: row.students,
        solution_interest: row.solution_interest,
        implementation_time: row.implementation_time,
        status: row.status,
        source: row.source,
        notes: row.notes,
        createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
      };
    } catch (error) {
      console.error("PostgreSQL insert error in insertEnquiry (saving to JSON fallback):", error);
    }
  }

  // Fallback to JSON
  const enquiries = readJsonEnquiries();
  enquiries.unshift(enquiryData);
  writeJsonEnquiries(enquiries);
  return enquiryData;
}

export async function updateEnquiryStatus(id, status, notes) {
  const currentPool = getPool();

  if (currentPool) {
    try {
      await initDb();
      let query = "UPDATE enquiries SET updated_at = NOW()";
      const values = [];
      let idx = 1;

      if (status !== undefined) {
        query += `, status = $${idx}`;
        values.push(status);
        idx++;
      }
      if (notes !== undefined) {
        query += `, notes = $${idx}`;
        values.push(notes);
        idx++;
      }

      query += ` WHERE id = $${idx} RETURNING *;`;
      values.push(id);

      const res = await currentPool.query(query, values);
      if (res.rows.length > 0) {
        const row = res.rows[0];
        return {
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          institution: row.institution,
          city: row.city,
          designation: row.designation,
          message: row.message,
          status: row.status,
          notes: row.notes,
          createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
          updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : null,
        };
      }
    } catch (error) {
      console.error("PostgreSQL update error in updateEnquiryStatus:", error);
    }
  }

  // Fallback to JSON
  const enquiries = readJsonEnquiries();
  const index = enquiries.findIndex((e) => e.id === id);
  if (index !== -1) {
    if (status !== undefined) enquiries[index].status = status;
    if (notes !== undefined) enquiries[index].notes = notes;
    enquiries[index].updatedAt = new Date().toISOString();
    writeJsonEnquiries(enquiries);
    return enquiries[index];
  }
  return null;
}

export async function deleteEnquiryById(id) {
  const currentPool = getPool();

  if (currentPool) {
    try {
      await initDb();
      const res = await currentPool.query("DELETE FROM enquiries WHERE id = $1 RETURNING id", [id]);
      if (res.rowCount > 0) return true;
    } catch (error) {
      console.error("PostgreSQL delete error in deleteEnquiryById:", error);
    }
  }

  // Fallback to JSON
  let enquiries = readJsonEnquiries();
  const initialLen = enquiries.length;
  enquiries = enquiries.filter((e) => e.id !== id);
  if (enquiries.length !== initialLen) {
    writeJsonEnquiries(enquiries);
    return true;
  }
  return false;
}
