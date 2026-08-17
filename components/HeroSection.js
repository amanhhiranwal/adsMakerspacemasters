import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Wrench,
  Cpu,
  GraduationCap,
  CheckCircle2,
  Send,
  Loader2,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  MessageSquare,
} from "lucide-react";

export default function HeroSection({ onOpenModal }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    institution: "",
    city: "",
    designation: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (apiError) setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[+]?[\d\s\-()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.institution) {
      newErrors.institution = "Please select institution type.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Please enter your city.";
    }

    if (!formData.designation) {
      newErrors.designation = "Please select your designation.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          institution: "",
          city: "",
          designation: "",
          message: "",
        });
      } else {
        setApiError(data.message || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error("Hero form submission error:", err);
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScrollToModules = () => {
    const modulesEl = document.getElementById("modules");
    if (modulesEl) {
      modulesEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden min-h-[720px] lg:min-h-[88vh] flex items-center justify-center py-12 md:py-20 bg-white"
    >
      {/* Background WebP Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src="https://dev.makerspacemasters.com/images/makerspace/master.webp"
          onError={(e) => {
            e.currentTarget.src = "/images/makerspace/master.webp";
          }}
          alt="Makerspace Masters Innovation Labs"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />

        {/* Ambient Gradient Overlays for Maximum Text & Form Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/70 lg:bg-gradient-to-r lg:from-white/95 lg:via-white/90 lg:to-white/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent opacity-70" />
      </div>

      {/* Hero Content & Form Split Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Headline, Value Proposition & Key Highlights */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* NEP 2020 Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-semibold shadow-md mb-5 border border-white/20 transition hover:scale-102">
              <span className="w-2 h-2 rounded-full bg-[#C9F2B6] animate-pulse" />
              <span>NEP 2020 Aligned Innovation & STEM Labs</span>
            </div>

            {/* Primary H1 Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black font-['Montserrat',sans-serif] text-neutral-950 tracking-tight leading-[1.12] mb-5">
              Transforming Classrooms into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-600 underline decoration-[#C9F2B6] decoration-wavy decoration-from-font underline-offset-8">
                State-of-the-Art
              </span>{" "}
              Makerspaces
            </h1>

            {/* Subheadline Description */}
            <p className="text-base sm:text-lg text-neutral-700 font-normal max-w-2xl leading-relaxed mb-8 font-['Work_Sans',sans-serif]">
              Complete turnkey lab setup, proprietary experiential STEM & robotics curriculum, 18+ multidisciplinary modules, and continuous teacher enablement for schools, colleges & institutions.
            </p>

            {/* Key Feature Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5 w-full max-w-xl mb-8">
              <div className="p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-neutral-200/70 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FE9F99]/20 border border-[#FE9F99]/40 flex items-center justify-center text-neutral-900 shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-900 font-['Montserrat',sans-serif]">
                    Turnkey Setup
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium font-['Work_Sans',sans-serif]">
                    Tools, Machines & Furniture
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-neutral-200/70 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9F2B6]/30 border border-[#C9F2B6]/50 flex items-center justify-center text-neutral-900 shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-900 font-['Montserrat',sans-serif]">
                    Robotics & AI
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium font-['Work_Sans',sans-serif]">
                    Grade 1-12 Hands-on Kits
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-neutral-200/70 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ABBCFE]/30 border border-[#ABBCFE]/50 flex items-center justify-center text-neutral-900 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-900 font-['Montserrat',sans-serif]">
                    Teacher Training
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium font-['Work_Sans',sans-serif]">
                    Certifications & Mentorship
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-neutral-200/70 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-neutral-900 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-900 font-['Montserrat',sans-serif]">
                    NEP Compliant
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium font-['Work_Sans',sans-serif]">
                    Experiential Learning
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Button & Social Proof */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleScrollToModules}
                className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold rounded-2xl border border-neutral-200 transition-all text-sm flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Explore 18+ Lab Modules</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-xs sm:text-sm text-neutral-600 font-medium">
                ⭐ Trusted by <span className="font-bold text-neutral-900">250+ Institutions</span> across India
              </div>
            </div>
          </div>

          {/* Right Column: Hero Contact / Consultation Form */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-200/80 ring-1 ring-black/5 relative overflow-hidden">
              {/* Card Header */}
              <div className="mb-5">
                <div className="inline-block px-3 py-1 bg-[#FE9F99]/20 border border-[#FE9F99]/40 text-neutral-900 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
                  Free Consultation & Demo
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-['Montserrat',sans-serif] text-neutral-950 tracking-tight">
                  Design Your Innovation Lab
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 font-['Work_Sans',sans-serif] mt-1">
                  Get a personalized lab blueprint, machinery list & pricing for your institution.
                </p>
              </div>

              {/* Success Notification */}
              {isSuccess ? (
                <div className="py-8 px-4 text-center flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#C9F2B6]/40 border border-[#C9F2B6] flex items-center justify-center text-neutral-950 shadow-md">
                    <CheckCircle2 className="w-8 h-8 text-emerald-700" />
                  </div>
                  <h3 className="text-xl font-bold font-['Montserrat',sans-serif] text-neutral-900">
                    Consultation Booked!
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-xs font-['Work_Sans',sans-serif]">
                    Thank you! Our senior makerspace architect will get in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-2 px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                  {apiError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
                      {apiError}
                    </div>
                  )}

                  {/* 1. Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1 font-['Montserrat',sans-serif]">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Rajesh Sharma"
                        className={`w-full px-3.5 py-2.5 pl-9 text-sm rounded-xl bg-neutral-50 border transition-all outline-none font-['Work_Sans',sans-serif] ${
                          errors.fullName
                            ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                            : "border-neutral-200 focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-100"
                        }`}
                      />
                      <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* 2. Phone Number & Email (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1 font-['Montserrat',sans-serif]">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={`w-full px-3.5 py-2.5 pl-9 text-sm rounded-xl bg-neutral-50 border transition-all outline-none font-['Work_Sans',sans-serif] ${
                            errors.phone
                              ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                              : "border-neutral-200 focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-100"
                          }`}
                        />
                        <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
                      </div>
                      {errors.phone && (
                        <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1 font-['Montserrat',sans-serif]">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@school.edu"
                          className={`w-full px-3.5 py-2.5 pl-9 text-sm rounded-xl bg-neutral-50 border transition-all outline-none font-['Work_Sans',sans-serif] ${
                            errors.email
                              ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                              : "border-neutral-200 focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-100"
                          }`}
                        />
                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* 3. Institution (Dropdown) & City (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1 font-['Montserrat',sans-serif]">
                        Institution <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="institution"
                          value={formData.institution}
                          onChange={handleChange}
                          className={`w-full px-3.5 py-2.5 pl-9 text-sm rounded-xl bg-neutral-50 border transition-all outline-none font-['Work_Sans',sans-serif] appearance-none cursor-pointer ${
                            errors.institution
                              ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                              : "border-neutral-200 focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-100"
                          } ${!formData.institution ? "text-neutral-400" : "text-neutral-900"}`}
                        >
                          <option value="" disabled>
                            Select Type
                          </option>
                          <option value="School" className="text-neutral-900">School (K-12)</option>
                          <option value="College" className="text-neutral-900">College / University</option>
                        </select>
                        <Building2 className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                      {errors.institution && (
                        <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.institution}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1 font-['Montserrat',sans-serif]">
                        City <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="e.g. Mumbai, Bangalore"
                          className={`w-full px-3.5 py-2.5 pl-9 text-sm rounded-xl bg-neutral-50 border transition-all outline-none font-['Work_Sans',sans-serif] ${
                            errors.city
                              ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                              : "border-neutral-200 focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-100"
                          }`}
                        />
                        <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
                      </div>
                      {errors.city && (
                        <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.city}</p>
                      )}
                    </div>
                  </div>

                  {/* 4. Designation (Dropdown) */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1 font-['Montserrat',sans-serif]">
                      Designation <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 pl-9 text-sm rounded-xl bg-neutral-50 border transition-all outline-none font-['Work_Sans',sans-serif] appearance-none cursor-pointer ${
                          errors.designation
                            ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                            : "border-neutral-200 focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-100"
                        } ${!formData.designation ? "text-neutral-400" : "text-neutral-900"}`}
                      >
                        <option value="" disabled>
                          Select Designation
                        </option>
                        <option value="Educator" className="text-neutral-900">Educator</option>
                        <option value="Management" className="text-neutral-900">Management</option>
                        <option value="Principal" className="text-neutral-900">Principal / Director</option>
                        <option value="Trainer" className="text-neutral-900">Trainer / STEM Coordinator</option>
                        <option value="Other" className="text-neutral-900">Other</option>
                      </select>
                      <Briefcase className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                    {errors.designation && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.designation}</p>
                    )}
                  </div>

                  {/* 5. Message / Requirements */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1 font-['Montserrat',sans-serif]">
                      Message / Requirements <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Tell us about your campus, student strength, or preferred modules..."
                        className="w-full px-3.5 py-2.5 pl-9 text-sm rounded-xl bg-neutral-50 border border-neutral-200 focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-100 transition-all outline-none font-['Work_Sans',sans-serif] resize-none"
                      />
                      <MessageSquare className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-[#131313] hover:bg-neutral-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-101 text-sm flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Free Lab Blueprint & Quote</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-neutral-500 font-medium pt-1">
                    🔒 100% confidential. No spam, guaranteed.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
