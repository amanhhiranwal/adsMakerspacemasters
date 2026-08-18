import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Users,
  Building2,
  GraduationCap,
  Search,
  Download,
  RefreshCw,
  Eye,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  CheckCircle2,
  Clock,
  ExternalLink,
  X,
  Lock,
  User,
  LogOut,
  ShieldCheck,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function AdminPanel() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [adminUser, setAdminUser] = useState(null);

  // Login form states
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("all");
  const [selectedDesignation, setSelectedDesignation] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Check existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/session");
        const data = await res.json();
        if (res.ok && data.authenticated) {
          setIsAuthenticated(true);
          setAdminUser(data.user || { username: "admin" });
          fetchEnquiries();
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setAuthChecking(false);
      }
    };

    checkSession();
  }, []);

  // Fetch enquiries when authenticated
  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries");
      if (res.status === 401) {
        setIsAuthenticated(false);
        showToast("Session expired. Please log in again.");
        return;
      }
      const result = await res.json();
      if (result.success) {
        setEnquiries(result.data || []);
      }
    } catch (err) {
      console.error("Failed to load enquiries:", err);
      showToast("Failed to refresh leads.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!usernameInput.trim() || !passwordInput.trim()) {
      setLoginError("Please enter both username and password.");
      return;
    }

    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput.trim(),
          password: passwordInput,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAdminUser(data.user);
        setPasswordInput("");
        showToast("Welcome to Makerspace Masters Admin!");
        fetchEnquiries();
      } else {
        setLoginError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login submission error:", err);
      setLoginError("Network connection error. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsAuthenticated(false);
      setAdminUser(null);
      setEnquiries([]);
      showToast("Logged out successfully.");
    }
  };

  // Update Status handler
  const handleStatusChange = async (id, newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead((prev) => ({ ...prev, status: newStatus }));
        }
        showToast(`Status updated to "${newStatus}"`);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      showToast("Failed to update status.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Delete Enquiry handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      const res = await fetch(`/api/enquiries?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(null);
        }
        showToast("Enquiry deleted successfully.");
      }
    } catch (err) {
      console.error("Error deleting enquiry:", err);
      showToast("Failed to delete enquiry.");
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (enquiries.length === 0) {
      showToast("No data available to export.");
      return;
    }

    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Institution Type",
      "City",
      "Designation",
      "Message / Requirements",
      "Status",
      "Source",
      "Submitted Date",
    ];

    const rows = filteredEnquiries.map((e) => [
      `"${e.id}"`,
      `"${(e.name || "").replace(/"/g, '""')}"`,
      `"${(e.email || "").replace(/"/g, '""')}"`,
      `"${(e.phone || "").replace(/"/g, '""')}"`,
      `"${(e.institution || "").replace(/"/g, '""')}"`,
      `"${(e.city || "").replace(/"/g, '""')}"`,
      `"${(e.designation || "").replace(/"/g, '""')}"`,
      `"${(e.message || "").replace(/"/g, '""')}"`,
      `"${e.status || "New"}"`,
      `"${e.source || "Hero Form"}"`,
      `"${new Date(e.createdAt).toLocaleString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `makerspace_enquiries_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Exported CSV successfully!");
  };

  // Filtered List
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      (e.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.phone || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.city || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.message || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesInstitution =
      selectedInstitution === "all" ||
      (e.institution || "").toLowerCase() === selectedInstitution.toLowerCase();

    const matchesDesignation =
      selectedDesignation === "all" ||
      (e.designation || "").toLowerCase() === selectedDesignation.toLowerCase();

    const matchesStatus =
      selectedStatus === "all" ||
      (e.status || "new").toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesInstitution && matchesDesignation && matchesStatus;
  });

  // Calculate Metrics
  const totalLeads = enquiries.length;
  const newLeads = enquiries.filter((e) => (e.status || "New").toLowerCase() === "new").length;
  const schoolLeads = enquiries.filter(
    (e) => (e.institution || "").toLowerCase() === "school"
  ).length;
  const collegeLeads = enquiries.filter(
    (e) => (e.institution || "").toLowerCase() === "college"
  ).length;

  const getStatusBadge = (status) => {
    switch ((status || "New").toLowerCase()) {
      case "new":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "contacted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "demo scheduled":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "follow up":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "closed":
        return "bg-neutral-100 text-neutral-800 border-neutral-300";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-200";
    }
  };

  // Initial session loader screen
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-900 mx-auto mb-3" />
          <p className="text-sm font-semibold text-neutral-600 font-['Montserrat',sans-serif]">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  // If NOT Authenticated -> Render Login Screen
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Login | Makerspace Masters</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-neutral-950 text-white shadow-2xl text-sm font-semibold flex items-center gap-2 border border-neutral-800 animate-in fade-in slide-in-from-bottom-4">
              <CheckCircle2 className="w-4 h-4 text-[#C9F2B6]" />
              <span>{toastMessage}</span>
            </div>
          )}

          <div className="max-w-md w-full">
            {/* Brand Logo & Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-4">
                <img
                  src="/images/common/mainLogo.svg"
                  alt="Makerspace Masters"
                  className="h-11 w-auto mx-auto object-contain"
                />
              </Link>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider mb-2 font-['Montserrat',sans-serif]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9F2B6]" />
                <span>Protected Admin Portal</span>
              </div>
              <h2 className="text-2xl font-bold font-['Montserrat',sans-serif] text-neutral-950">
                Sign in to Dashboard
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-['Work_Sans',sans-serif]">
                Enter your administrative credentials to manage consultation leads and inquiries.
              </p>
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-xl border border-neutral-200/80">
              {loginError && (
                <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5 font-['Montserrat',sans-serif]">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="admin"
                      className="w-full px-3.5 py-3 pl-10 text-sm rounded-xl bg-neutral-50 border border-neutral-200 focus:border-neutral-900 focus:bg-white transition-all outline-none font-['Work_Sans',sans-serif]"
                      autoFocus
                    />
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5 font-['Montserrat',sans-serif]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-3 pl-10 pr-10 text-sm rounded-xl bg-neutral-50 border border-neutral-200 focus:border-neutral-900 focus:bg-white transition-all outline-none font-['Work_Sans',sans-serif]"
                    />
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-700 transition cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3.5 px-6 bg-[#131313] hover:bg-neutral-800 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-xl hover:scale-[1.01] text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C9F2B6]" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Admin</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Back to Site Link */}
            <div className="text-center mt-6">
              <Link
                href="/"
                className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition inline-flex items-center gap-1"
              >
                <span>← Back to Makerspace Masters</span>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // If Authenticated -> Render Full Admin Dashboard
  return (
    <>
      <Head>
        <title>Admin Dashboard | Makerspace Masters Enquiries</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-[#F8F9FA] text-neutral-900 font-['Work_Sans',sans-serif] flex flex-col">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-neutral-950 text-white shadow-2xl text-sm font-semibold flex items-center gap-2 border border-neutral-800 animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 className="w-4 h-4 text-[#C9F2B6]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <img
                  src="/images/common/mainLogo.svg"
                  alt="Makerspace Masters"
                  className="h-9 w-auto object-contain"
                />
              </Link>
              <div className="h-5 w-px bg-neutral-200 mx-1 hidden sm:block" />
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider font-['Montserrat',sans-serif]">
                Admin Panel
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={fetchEnquiries}
                disabled={loading}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                title="Refresh Data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                onClick={exportToCSV}
                className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#C9F2B6]" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              <Link
                href="/"
                className="px-3 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold transition flex items-center gap-1"
                target="_blank"
              >
                <span className="hidden sm:inline">Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              {/* User Profile & Logout */}
              <div className="h-5 w-px bg-neutral-200 mx-1" />
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-xl hover:bg-rose-50 text-neutral-600 hover:text-rose-600 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
          
          {/* Top Title & Subtitle */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-['Montserrat',sans-serif] text-neutral-950 tracking-tight">
                Consultation Enquiries
              </h1>
              <p className="text-sm text-neutral-600 font-['Work_Sans',sans-serif] mt-1">
                Real-time dashboard of school & college consultation requests submitted via your ads landing page.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 bg-white px-3.5 py-2 rounded-xl border border-neutral-200 shadow-2xs self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Secure Session • {enquiries.length} Total Submissions</span>
            </div>
          </div>

          {/* KPI Metric Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Card 1: Total */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-['Montserrat',sans-serif]">
                  Total Leads
                </span>
                <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-extrabold font-['Montserrat',sans-serif] text-neutral-950">
                {totalLeads}
              </div>
              <div className="text-xs text-neutral-500 mt-1">All time received</div>
            </div>

            {/* Card 2: New Leads */}
            <div className="bg-white p-5 rounded-2xl border border-[#FE9F99]/40 shadow-xs bg-gradient-to-br from-white to-[#FE9F99]/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 font-['Montserrat',sans-serif]">
                  Action Required
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FE9F99]/20 flex items-center justify-center text-rose-800">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-extrabold font-['Montserrat',sans-serif] text-rose-900">
                {newLeads}
              </div>
              <div className="text-xs text-rose-700/80 mt-1">Status: "New"</div>
            </div>

            {/* Card 3: Schools */}
            <div className="bg-white p-5 rounded-2xl border border-[#C9F2B6]/50 shadow-xs bg-gradient-to-br from-white to-[#C9F2B6]/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 font-['Montserrat',sans-serif]">
                  Schools (K-12)
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#C9F2B6]/30 flex items-center justify-center text-emerald-900">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-extrabold font-['Montserrat',sans-serif] text-emerald-950">
                {schoolLeads}
              </div>
              <div className="text-xs text-emerald-800/80 mt-1">Makerspace Masters</div>
            </div>

            {/* Card 4: Colleges */}
            <div className="bg-white p-5 rounded-2xl border border-[#ABBCFE]/50 shadow-xs bg-gradient-to-br from-white to-[#ABBCFE]/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 font-['Montserrat',sans-serif]">
                  Colleges & Higher Ed
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#ABBCFE]/30 flex items-center justify-center text-indigo-900">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-extrabold font-['Montserrat',sans-serif] text-indigo-950">
                {collegeLeads}
              </div>
              <div className="text-xs text-indigo-800/80 mt-1">Masters X Division</div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs mb-6 flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, phone, city, or requirements..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:bg-white focus:border-neutral-900 transition font-['Work_Sans',sans-serif]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Institution Filter */}
              <select
                value={selectedInstitution}
                onChange={(e) => setSelectedInstitution(e.target.value)}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-800 outline-none focus:border-neutral-900 cursor-pointer"
              >
                <option value="all">All Institutions</option>
                <option value="school">Schools (K-12)</option>
                <option value="college">Colleges / Universities</option>
              </select>

              {/* Designation Filter */}
              <select
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-800 outline-none focus:border-neutral-900 cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="principal">Principal</option>
                <option value="management">Management</option>
                <option value="educator">Educator</option>
                <option value="trainer">Trainer / STEM Head</option>
                <option value="other">Other</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-800 outline-none focus:border-neutral-900 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="demo scheduled">Demo Scheduled</option>
                <option value="follow up">Follow Up</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Enquiries Data Table */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-bold text-neutral-600 uppercase tracking-wider font-['Montserrat',sans-serif]">
                    <th className="py-3.5 px-4 sm:px-6">Contact / Lead</th>
                    <th className="py-3.5 px-4">Institution & City</th>
                    <th className="py-3.5 px-4">Designation</th>
                    <th className="py-3.5 px-4">Message Preview</th>
                    <th className="py-3.5 px-4">Submitted Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-neutral-500">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-neutral-400" />
                        <span>Loading enquiries from database...</span>
                      </td>
                    </tr>
                  ) : filteredEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-neutral-500">
                        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-neutral-400">
                          <Search className="w-5 h-5" />
                        </div>
                        <div className="font-semibold text-neutral-800">No enquiries found</div>
                        <div className="text-xs text-neutral-500 mt-1">
                          Try adjusting your search query or filters.
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredEnquiries.map((lead) => (
                      <tr
                        key={lead.id}
                        className="hover:bg-neutral-50/80 transition duration-150 group"
                      >
                        {/* Lead Info */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="font-bold text-neutral-950 font-['Montserrat',sans-serif]">
                            {lead.name}
                          </div>
                          <div className="flex flex-col gap-0.5 mt-1 text-xs text-neutral-600">
                            <a
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-1.5 hover:text-neutral-950 transition"
                            >
                              <Phone className="w-3 h-3 text-neutral-400" />
                              <span>{lead.phone}</span>
                            </a>
                            <a
                              href={`mailto:${lead.email}`}
                              className="flex items-center gap-1.5 hover:text-neutral-950 transition"
                            >
                              <Mail className="w-3 h-3 text-neutral-400" />
                              <span className="truncate max-w-[180px]">{lead.email}</span>
                            </a>
                          </div>
                        </td>

                        {/* Institution & City */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                              (lead.institution || "").toLowerCase() === "college"
                                ? "bg-[#ABBCFE]/30 text-indigo-900 border-[#ABBCFE]/60"
                                : "bg-[#FE9F99]/20 text-rose-900 border-[#FE9F99]/50"
                            }`}
                          >
                            {lead.institution || "School"}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-neutral-600 mt-1.5 font-medium">
                            <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                            <span>{lead.city || "Not Specified"}</span>
                          </div>
                        </td>

                        {/* Designation */}
                        <td className="py-4 px-4">
                          <span className="text-xs font-semibold text-neutral-800 bg-neutral-100 px-2.5 py-1 rounded-lg">
                            {lead.designation || "Other"}
                          </span>
                        </td>

                        {/* Message Preview */}
                        <td className="py-4 px-4 max-w-xs">
                          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                            {lead.message || <span className="text-neutral-400 italic">No notes provided</span>}
                          </p>
                        </td>

                        {/* Submitted Date */}
                        <td className="py-4 px-4 text-xs text-neutral-600 whitespace-nowrap">
                          <div>
                            {new Date(lead.createdAt || Date.now()).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            {new Date(lead.createdAt || Date.now()).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <select
                            value={lead.status || "New"}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            disabled={isUpdatingStatus}
                            className={`px-3 py-1 rounded-full text-xs font-bold border outline-none cursor-pointer ${getStatusBadge(
                              lead.status
                            )}`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Demo Scheduled">Demo Scheduled</option>
                            <option value="Follow Up">Follow Up</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 transition cursor-pointer"
                              title="View Full Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(lead.id)}
                              className="p-2 rounded-xl hover:bg-rose-50 text-neutral-400 hover:text-rose-600 transition cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="py-3.5 px-6 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500 flex items-center justify-between">
              <span>
                Showing {filteredEnquiries.length} of {enquiries.length} total inquiries
              </span>
              <span>🔒 Encrypted Admin Session</span>
            </div>
          </div>
        </main>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative my-8">
              {/* Close button */}
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute right-5 top-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                      selectedLead.status
                    )}`}
                  >
                    {selectedLead.status || "New"}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    ID: {selectedLead.id}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-['Montserrat',sans-serif] text-neutral-950">
                  {selectedLead.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Submitted on {new Date(selectedLead.createdAt).toLocaleString()} via{" "}
                  {selectedLead.source || "Hero Form"}
                </p>
              </div>

              {/* Details Grid */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-neutral-400">Phone</div>
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="text-sm font-semibold text-neutral-900 hover:underline flex items-center gap-1.5 mt-0.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{selectedLead.phone}</span>
                    </a>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase text-neutral-400">Email</div>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="text-sm font-semibold text-neutral-900 hover:underline flex items-center gap-1.5 mt-0.5 truncate"
                    >
                      <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span className="truncate">{selectedLead.email}</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-neutral-400">
                      Institution Type
                    </div>
                    <div className="text-sm font-semibold text-neutral-900 flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{selectedLead.institution || "School"}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase text-neutral-400">City</div>
                    <div className="text-sm font-semibold text-neutral-900 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{selectedLead.city || "Not provided"}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80">
                  <div className="text-[11px] font-bold uppercase text-neutral-400">
                    Designation / Role
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 flex items-center gap-1.5 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{selectedLead.designation || "Not provided"}</span>
                  </div>
                </div>

                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80">
                  <div className="text-[11px] font-bold uppercase text-neutral-400 mb-1">
                    Requirements / Message
                  </div>
                  <p className="text-sm text-neutral-800 whitespace-pre-wrap leading-relaxed font-['Work_Sans',sans-serif]">
                    {selectedLead.message || "No specific message provided."}
                  </p>
                </div>
              </div>

              {/* Status Selector in Modal */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-700">Update Status:</span>
                  <select
                    value={selectedLead.status || "New"}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold border bg-white cursor-pointer"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Demo Scheduled">Demo Scheduled</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${(selectedLead.phone || "").replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
