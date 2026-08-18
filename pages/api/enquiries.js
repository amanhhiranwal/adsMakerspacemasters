import {
  getAllEnquiries,
  insertEnquiry,
  updateEnquiryStatus,
  deleteEnquiryById,
} from "@/lib/db";
import { isAuthenticatedRequest } from "@/lib/auth";

export default async function handler(req, res) {
  // 1. PUBLIC ENDPOINT: POST (Submitting form on landing page)
  if (req.method === "POST") {
    try {
      const {
        fullName,
        first_name,
        last_name,
        email,
        phone,
        institution,
        type,
        city,
        location,
        designation,
        role,
        message,
        comment,
        requirements,
        students,
        solution_interest,
        implementation_time,
        source,
      } = req.body || {};

      const resolvedName = (
        fullName || `${first_name || ""} ${last_name || ""}`
      ).trim();
      const resolvedEmail = (email || "").trim();
      const resolvedPhone = (phone || "").trim();
      const resolvedInstitution =
        institution ||
        (type === "mastersx" ? "College" : "School") ||
        type ||
        "School";
      const resolvedCity = (city || location || "").trim();
      const resolvedDesignation = designation || role || "Other";
      const resolvedMessage = (message || comment || requirements || "").trim();

      if (!resolvedName || !resolvedEmail || !resolvedPhone) {
        return res.status(422).json({
          success: false,
          message:
            "Please provide your full name, email address, and phone number.",
        });
      }

      // Phone number must be exactly 10 digits
      if (!/^\d{10}$/.test(resolvedPhone)) {
        return res.status(422).json({
          success: false,
          message: "Please enter a valid 10-digit phone number.",
        });
      }

      const newEnquiry = {
        id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: resolvedName,
        email: resolvedEmail,
        phone: resolvedPhone,
        institution: resolvedInstitution,
        city: resolvedCity,
        designation: resolvedDesignation,
        message: resolvedMessage,
        students: students || "",
        solution_interest: solution_interest || "",
        implementation_time: implementation_time || "",
        status: "New",
        source: source || "Hero Section Form",
        createdAt: new Date().toISOString(),
      };

      const savedEnquiry = await insertEnquiry(newEnquiry);

      return res.status(200).json({
        success: true,
        message: "Thank you! Your enquiry has been saved successfully.",
        data: savedEnquiry,
      });
    } catch (error) {
      console.error("POST /api/enquiries error:", error);
      return res.status(500).json({
        success: false,
        message: "An internal server error occurred. Please try again.",
      });
    }
  }

  // 2. PROTECTED ENDPOINTS: GET, PATCH, DELETE (Admin Authentication Required)
  const session = isAuthenticatedRequest(req);
  if (!session) {
    return res.status(401).json({
      success: false,
      message:
        "Unauthorized. Admin authentication required to access lead records.",
    });
  }

  // GET: Fetch all enquiries (Protected)
  if (req.method === "GET") {
    try {
      const enquiries = await getAllEnquiries();
      return res.status(200).json({
        success: true,
        data: enquiries,
      });
    } catch (error) {
      console.error("GET /api/enquiries error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch enquiries from database.",
      });
    }
  }

  // PATCH: Update status or notes (Protected)
  if (req.method === "PATCH") {
    try {
      const { id, status, notes } = req.body || {};

      if (!id) {
        return res
          .status(422)
          .json({ success: false, message: "Enquiry ID is required." });
      }

      const updated = await updateEnquiryStatus(id, status, notes);

      if (!updated) {
        return res
          .status(404)
          .json({ success: false, message: "Enquiry not found." });
      }

      return res.status(200).json({
        success: true,
        message: "Enquiry updated successfully.",
        data: updated,
      });
    } catch (error) {
      console.error("PATCH /api/enquiries error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to update enquiry." });
    }
  }

  // DELETE: Remove an enquiry (Protected)
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res
          .status(422)
          .json({ success: false, message: "Enquiry ID is required." });
      }

      const deleted = await deleteEnquiryById(id);

      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Enquiry not found." });
      }

      return res.status(200).json({
        success: true,
        message: "Enquiry deleted successfully.",
      });
    } catch (error) {
      console.error("DELETE /api/enquiries error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete enquiry." });
    }
  }

  return res
    .status(405)
    .json({ success: false, message: "Method not allowed" });
}