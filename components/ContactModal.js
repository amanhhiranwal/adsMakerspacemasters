import { useState, useEffect, useRef } from "react";
import { X, Check } from "lucide-react";

export default function ContactModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
    institution: "",
    type: "",
    location: "",
    students: "",
    solution_interest: "",
    implementation_time: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentStep(1);
      setIsSuccess(false);
      setErrors({});
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest(".custom-dropdown")) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelect = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setOpenDropdown(null);
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.first_name.trim()) newErrors.first_name = "First name is required.";
      if (!formData.last_name.trim()) newErrors.last_name = "Last name is required.";
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required.";
      } else if (!/^[+]?[\d\s\-()]{7,20}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number.";
      }
      if (!formData.role.trim()) newErrors.role = "Role is required.";
    }

    if (step === 2) {
      if (!formData.institution.trim()) newErrors.institution = "Institution name is required.";
      if (!formData.type.trim()) newErrors.type = "Please select an institution type.";
      if (!formData.location.trim()) newErrors.location = "Location is required.";
      if (!formData.students.trim()) newErrors.students = "Number of students is required.";
    }

    if (step === 3) {
      if (!formData.solution_interest.trim()) newErrors.solution_interest = "Please select a solution of interest.";
      if (!formData.implementation_time.trim()) newErrors.implementation_time = "Please select a timeline.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    try {
      // Send enquiry payload
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok || data.success) {
        setIsSuccess(true);
      } else {
        alert(data.message || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      // In static mode or without backend API, show successful confirmation
      console.log("Submitted enquiry:", formData);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const typeLabels = {
    makerspace: "School",
    mastersx: "College",
    mastersplus: "University",
    community: "Incubators",
    other: "Other",
  };

  const solutionLabels = {
    "makerspace-masters": "Makerspace Masters",
    "makerspace-x": "Makerspace Masters X",
    "makerspace-masters-plus": "Makerspace Masters+",
    "community-initiative": "Community / Other",
  };

  const timelineLabels = {
    immediate: "Immediate (0-1 Month)",
    next_quarter: "Next Quarter (1-3 Months)",
    future: "Future Planning (3-6 Months)",
    exploration: "Just Exploring",
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl bg-white rounded-3xl md:rounded-[40px] shadow-2xl overflow-hidden my-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition text-neutral-600 hover:text-black"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
          {/* Left Column: Information Banner */}
          <div className="lg:col-span-4 bg-[#131313] text-white p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-[#C9F2B6]">
                Consultation
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat',sans-serif] leading-tight mb-4">
                Let's Build Your Space
              </h2>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-6 font-['Work_Sans',sans-serif]">
                Partner with us to create a world-class makerspace lab tailored to your curriculum, campus, and learners.
              </p>
              <ul className="space-y-3 text-neutral-300 text-sm font-['Work_Sans',sans-serif]">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FE9F99]"></span>
                  Custom 2D/3D Lab Architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C9F2B6]"></span>
                  NEP 2020 Aligned Curriculum
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ABBCFE]"></span>
                  Turnkey Equipment & Teacher Enablement
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-neutral-400">
              Need immediate assistance? Call us toll-free at <span className="text-white font-medium">1800 547 7600</span>
            </div>
          </div>

          {/* Right Column: Form Stepper */}
          <div className="lg:col-span-8 p-6 md:p-10 bg-[#FAFAFA] flex flex-col justify-between">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-12 px-4 my-auto">
                <div className="w-16 h-16 bg-[#C9F2B6] text-black rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-3xl font-bold font-['Montserrat',sans-serif] mb-3 text-neutral-900">
                  Thank You!
                </h3>
                <p className="text-neutral-600 max-w-md mb-8 font-['Work_Sans',sans-serif]">
                  Your request has been received. Our makerspace design specialist will reach out to you within 24 hours.
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-[#131313] hover:bg-neutral-800 text-white font-semibold rounded-xl transition"
                >
                  Back to Website
                </button>
              </div>
            ) : (
              <>
                {/* Stepper Progress */}
                <div className="flex items-center justify-between max-w-md mx-auto w-full mb-8 pt-2">
                  {[
                    { num: 1, label: "Personal Details", color: "bg-[#FE9F99]" },
                    { num: 2, label: "Institution Details", color: "bg-[#C9F2B6]" },
                    { num: 3, label: "Solution & Goals", color: "bg-[#ABBCFE]" },
                  ].map((s, idx) => (
                    <div key={s.num} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                            currentStep === s.num
                              ? `${s.color} text-black ring-4 ring-black/5 scale-105`
                              : currentStep > s.num
                              ? `${s.color} text-black`
                              : "bg-neutral-200 text-neutral-500"
                          }`}
                        >
                          {currentStep > s.num ? <Check className="w-5 h-5 stroke-[2.5]" /> : s.num}
                        </div>
                        <span
                          className={`text-xs mt-1 font-medium hidden sm:block ${
                            currentStep === s.num ? "text-black font-semibold" : "text-neutral-400"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                      {idx < 2 && (
                        <div
                          className={`flex-1 h-0.5 mx-3 transition-colors ${
                            currentStep > idx + 1 ? "bg-neutral-800" : "bg-neutral-200"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step Forms */}
                <form onSubmit={currentStep === 3 ? handleSubmit : handleNext} className="space-y-4">
                  {/* Step 1 */}
                  {currentStep === 1 && (
                    <div className="space-y-4 animate__animated animate__fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="John"
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                              errors.first_name ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          />
                          {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Doe"
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                              errors.last_name ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          />
                          {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@school.edu"
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                              errors.email ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                              errors.phone ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                          Designation / Role <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          placeholder="Principal / Trustee / STEM Coordinator"
                          className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                            errors.role ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                          }`}
                        />
                        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                      </div>
                    </div>
                  )}

                  {/* Step 2 */}
                  {currentStep === 2 && (
                    <div className="space-y-4 animate__animated animate__fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                            Institution Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="institution"
                            value={formData.institution}
                            onChange={handleChange}
                            placeholder="Greenfield International School"
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                              errors.institution ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          />
                          {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
                        </div>

                        {/* Institution Type Dropdown */}
                        <div className="relative custom-dropdown">
                          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                            Institution Type <span className="text-red-500">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === "type" ? null : "type");
                            }}
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl flex items-center justify-between text-left text-sm transition ${
                              errors.type ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          >
                            <span className={formData.type ? "text-neutral-900 font-medium" : "text-neutral-400"}>
                              {formData.type ? typeLabels[formData.type] || formData.type : "Select Type"}
                            </span>
                            <span className="text-xs text-neutral-500">▾</span>
                          </button>
                          {openDropdown === "type" && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
                              {Object.entries(typeLabels).map(([key, label]) => (
                                <div
                                  key={key}
                                  onClick={() => handleSelect("type", key)}
                                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 cursor-pointer font-medium"
                                >
                                  {label}
                                </div>
                              ))}
                            </div>
                          )}
                          {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                            City / Location <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Mumbai, Maharashtra"
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                              errors.location ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          />
                          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                            Number of Students <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="students"
                            value={formData.students}
                            onChange={handleChange}
                            placeholder="e.g. 500 or 1000+"
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                              errors.students ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          />
                          {errors.students && <p className="text-red-500 text-xs mt-1">{errors.students}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {currentStep === 3 && (
                    <div className="space-y-4 animate__animated animate__fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Solution Interest */}
                        <div className="relative custom-dropdown">
                          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                            Solution of Interest <span className="text-red-500">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === "solution" ? null : "solution");
                            }}
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl flex items-center justify-between text-left text-sm transition ${
                              errors.solution_interest ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          >
                            <span className={formData.solution_interest ? "text-neutral-900 font-medium" : "text-neutral-400"}>
                              {formData.solution_interest ? solutionLabels[formData.solution_interest] || formData.solution_interest : "Select Solution"}
                            </span>
                            <span className="text-xs text-neutral-500">▾</span>
                          </button>
                          {openDropdown === "solution" && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
                              {Object.entries(solutionLabels).map(([key, label]) => (
                                <div
                                  key={key}
                                  onClick={() => handleSelect("solution_interest", key)}
                                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 cursor-pointer font-medium"
                                >
                                  {label}
                                </div>
                              ))}
                            </div>
                          )}
                          {errors.solution_interest && <p className="text-red-500 text-xs mt-1">{errors.solution_interest}</p>}
                        </div>

                        {/* Implementation Timeline */}
                        <div className="relative custom-dropdown">
                          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                            Expected Timeline <span className="text-red-500">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === "timeline" ? null : "timeline");
                            }}
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl flex items-center justify-between text-left text-sm transition ${
                              errors.implementation_time ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          >
                            <span className={formData.implementation_time ? "text-neutral-900 font-medium" : "text-neutral-400"}>
                              {formData.implementation_time ? timelineLabels[formData.implementation_time] || formData.implementation_time : "Select Timeline"}
                            </span>
                            <span className="text-xs text-neutral-500">▾</span>
                          </button>
                          {openDropdown === "timeline" && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
                              {Object.entries(timelineLabels).map(([key, label]) => (
                                <div
                                  key={key}
                                  onClick={() => handleSelect("implementation_time", key)}
                                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 cursor-pointer font-medium"
                                >
                                  {label}
                                </div>
                              ))}
                            </div>
                          )}
                          {errors.implementation_time && <p className="text-red-500 text-xs mt-1">{errors.implementation_time}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                          Comments / Specific Requirements (Optional)
                        </label>
                        <textarea
                          name="comment"
                          rows={3}
                          value={formData.comment}
                          onChange={handleChange}
                          placeholder="Tell us about your campus space, targeted grades, or specific goals..."
                          className="w-full px-4 py-3 bg-neutral-100/80 border border-transparent focus:border-neutral-400 rounded-xl outline-none transition text-sm resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-6 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-200 text-neutral-800 text-sm font-semibold transition"
                      >
                        Back
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="submit"
                        className="px-8 py-2.5 rounded-xl bg-[#131313] hover:bg-neutral-800 text-white text-sm font-semibold transition"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-2.5 rounded-xl bg-[#131313] hover:bg-neutral-800 text-white text-sm font-semibold transition disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting..." : "Get In Touch"}
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
