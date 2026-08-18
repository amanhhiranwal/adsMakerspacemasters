import { useState } from "react";
import {
  X,
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
} from "lucide-react";
import FormField from "@/components/ui/FormField";

const DESIGNATION_OPTIONS = [
  { value: "Principal", label: "Principal / Director" },
  { value: "Management", label: "Management / Trustee" },
  { value: "Educator", label: "Educator / Teacher" },
  { value: "Trainer", label: "Trainer / STEM Head" },
  { value: "Other", label: "Other" },
];

export default function ContactModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

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
        setErrors((prev) => ({
          ...prev,
          phone: "",
        }));
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
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.institution.trim()) newErrors.institution = "School / Institution name is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.designation) newErrors.designation = "Select designation.";

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
        body: JSON.stringify({ ...formData, source: "Consultation Modal" }),
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
        setApiError(data.message || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Modal form submit error:", err);
      setApiError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 relative my-auto animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 pr-8 text-left">
          <h3 className="text-2xl font-bold font-['Montserrat',sans-serif] text-[#042741] tracking-tight">
            Schedule a Free Demo
          </h3>
          <p className="text-xs text-neutral-500 font-['Work_Sans',sans-serif] mt-1 leading-relaxed">
            Get a tailored 3D lab layout, equipment catalog & investment proposal.
          </p>
        </div>

        {/* Success Screen */}
        {isSuccess ? (
          <div className="py-10 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#C9F2B6] flex items-center justify-center text-[#042741] shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold font-['Montserrat',sans-serif] text-[#042741]">
              Request Received!
            </h4>
            <p className="text-xs text-neutral-600 max-w-xs font-['Work_Sans',sans-serif] leading-relaxed">
              Our senior innovation architect will connect with you within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="mt-2 px-6 py-2.5 bg-gradient-to-r from-[#042741] via-[#2b5473] to-[#4f7c9f] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-95 transition cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            {apiError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
                {apiError}
              </div>
            )}

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
                placeholder="e.g. Mumbai, Delhi"
                error={errors.city}
                icon={MapPin}
                required
              />
            </div>

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

            <FormField
              label="Message / Space Details"
              name="message"
              type="textarea"
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. Looking to set up a 1,200 sq. ft. STEM & Robotics lab for Grades 1-12..."
              icon={MessageSquare}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-[#042741] via-[#2b5473] to-[#4f7c9f] hover:opacity-95 text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 font-['Montserrat',sans-serif] mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#C9F2B6]" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Request Free Campus Demo</span>
                  <Send className="w-3.5 h-3.5 text-[#C9F2B6]" />
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-neutral-400 font-medium pt-1 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
              <span>100% confidential. No spam, guaranteed.</span>
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
