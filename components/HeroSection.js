import { useState } from "react";
import {
  ArrowRight,
  Send,
  Loader2,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import FormField from "@/components/ui/FormField";
import Badge from "@/components/ui/Badge";

const DESIGNATION_OPTIONS = [
  { value: "Principal", label: "Principal / Director" },
  { value: "Management", label: "Management / Trustee" },
  { value: "Educator", label: "Educator / Teacher" },
  { value: "Trainer", label: "Trainer / STEM Head" },
  { value: "Other", label: "Other" },
];

const BENTO_HIGHLIGHTS = [
  {
    icon: "✦",
    title: "Turnkey Setup",
    desc: "Tools, machines & layout",
    bg: "bg-[#042741]/10 text-[#042741]",
  },
  {
    icon: "✦",
    title: "Grade 1-12 STEM",
    desc: "NEP 2020 curriculum",
    bg: "bg-[#C9F2B6]/30 text-emerald-900",
  },
  {
    icon: "✦",
    title: "Teacher Training",
    desc: "LMS & certifications",
    bg: "bg-[#4f7c9f]/20 text-[#042741]",
  },
  {
    icon: "✦",
    title: "18+ Disciplines",
    desc: "Robotics to Ceramics",
    bg: "bg-amber-100 text-amber-900",
  },
];

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
    // Phone: allow only digits and maximum 10 digits
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        phone: numericValue,
      }));

      if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }

      if (apiError) setApiError("");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (apiError) setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Please enter your full name.";

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.institution.trim())
      newErrors.institution = "Please enter your school / institution name.";
    if (!formData.city.trim()) newErrors.city = "Please enter your city.";
    if (!formData.designation)
      newErrors.designation = "Please select your designation.";

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
      className="relative w-full overflow-hidden min-h-[700px] lg:min-h-[90vh] flex items-center justify-center py-12 md:py-20 bg-[#FAF9F6]"
    >
      {/* Background WebP Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/makerspace/master.webp"
          alt="Makerspace Masters Innovation Labs"
          className="w-full h-full object-cover object-center brightness-105 contrast-[1.02]"
          loading="eager"
        />

        {/* Ambient Brand Palette Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#042741]/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-[#2b5473]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#4f7c9f]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/25 lg:bg-gradient-to-r lg:from-white/15 lg:via-transparent lg:to-transparent" />
      </div>

      {/* Hero Content & Form Split Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Keynote Headline & Value Proposition (Translucent Glass) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left bg-white/35 backdrop-blur-md p-7 sm:p-9 lg:p-11 rounded-[2.5rem] border border-white/60 shadow-xl shadow-[#042741]/5 hover:bg-white/45 transition-all duration-300">
            {/* Badge */}
            <div className="mb-5">
              {/* <Badge variant="brandGradient">Next-Gen Innovation Labs</Badge> */}
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-extrabold font-['Montserrat',sans-serif] text-[#042741] tracking-tight leading-[1.12] mb-4 drop-shadow-xs">
              Not Just a Lab. <br />
              <span className="text-[#042741]">A Launchpad for</span>{" "}
              <span className="text-gradient-brand">Creators.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-800 font-medium max-w-2xl leading-relaxed mb-8 font-['Work_Sans',sans-serif]">
              Complete turnkey makerspace ecosystem for schools and
              universities. Empower students with hands-on Robotics, 3D
              Fabrication, AI, Woodworking, and Pottery. NEP 2020 aligned with
              certified teacher enablement.
            </p>

            {/* Bento Mini Cards */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xl mb-8">
              {BENTO_HIGHLIGHTS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-2xs flex items-center gap-3"
                >
                  <div
                    className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center font-bold text-sm shrink-0`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#042741] font-['Montserrat',sans-serif]">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-neutral-600 font-['Work_Sans',sans-serif]">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleScrollToModules}
                className="px-6 py-3.5 bg-gradient-to-r from-[#042741] via-[#2b5473] to-[#4f7c9f] hover:opacity-95 text-white font-bold rounded-2xl transition-all duration-300 text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:scale-102 font-['Montserrat',sans-serif]"
              >
                <span>Explore 21+ Lab Modules</span>
                <ArrowRight className="w-4 h-4 text-[#C9F2B6]" />
              </button>
              <div className="text-xs font-semibold text-[#042741] bg-white/75 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/80 shadow-2xs font-['Montserrat',sans-serif]">
                ⭐ 250+ Schools Across India
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form (Translucent Glass) */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-7 sm:p-8 shadow-2xl border border-white/60 relative hover:bg-white/50 transition-all duration-300">
              {/* Form Header */}
              <div className="mb-5">
                <div className="mb-2">
                  {/* <Badge variant="brandLight" icon={Sparkles}>Free Campus Consultation</Badge> */}
                </div>
                <h2 className="text-2xl font-extrabold font-['Montserrat',sans-serif] text-[#042741] tracking-tight">
                  Design Your Innovation Lab
                </h2>
                <p className="text-xs text-neutral-600 font-medium font-['Work_Sans',sans-serif] mt-1">
                  Get a personalized 3D layout, equipment catalog & investment
                  proposal.
                </p>
              </div>

              {/* Success Notification */}
              {isSuccess ? (
                <div className="py-10 px-4 text-center flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#C9F2B6] flex items-center justify-center text-[#042741] shadow-md">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold font-['Montserrat',sans-serif] text-[#042741]">
                    Consultation Requested!
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-xs font-['Work_Sans',sans-serif] leading-relaxed">
                    Thank you. Our senior innovation architect will connect with
                    you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-2 px-6 py-2.5 bg-[#042741] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#2b5473] transition cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-left">
                  {apiError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
                      {apiError}
                    </div>
                  )}

                  {/* 1. Full Name */}
                  <FormField
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    error={errors.fullName}
                    icon={User}
                    required
                  />

                  {/* 2. Phone & Email (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      error={errors.phone}
                      icon={Phone}
                      required
                      maxLength={10}
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                    />
                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@school.edu"
                      error={errors.email}
                      icon={Mail}
                      required
                    />
                  </div>

                  {/* 3. Institution (Text Input) & City (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField
                      label="School / Institution"
                      name="institution"
                      type="text"
                      value={formData.institution}
                      onChange={handleChange}
                      placeholder="e.g. Heritage International School"
                      error={errors.institution}
                      icon={Building2}
                      required
                    />
                    <FormField
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai, New Delhi"
                      error={errors.city}
                      icon={MapPin}
                      required
                    />
                  </div>

                  {/* 4. Designation */}
                  <FormField
                    label="Designation"
                    name="designation"
                    type="select"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Select Designation"
                    options={DESIGNATION_OPTIONS}
                    error={errors.designation}
                    icon={Briefcase}
                    required
                  />

                  {/* 5. Message */}
                  <FormField
                    label="Message / Space Details"
                    name="message"
                    type="textarea"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="e.g. Looking to set up a 1,200 sq. ft. STEM & Robotics lab for Grades 1-12..."
                    icon={MessageSquare}
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-[#042741] via-[#2b5473] to-[#4f7c9f] hover:opacity-95 text-white font-bold rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.01] text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 font-['Montserrat',sans-serif] mt-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#C9F2B6]" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Free Lab Blueprint & Proposal</span>
                        <Send className="w-3.5 h-3.5 text-[#C9F2B6]" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-neutral-500 font-medium pt-1 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                    <span>100% confidential. No spam, guaranteed.</span>
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