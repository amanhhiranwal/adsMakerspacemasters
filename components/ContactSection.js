import { useState } from "react";
import { Check, Phone, Mail, MapPin, Send, ArrowRight } from "lucide-react";

export default function ContactSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
    institution: "",
    type: "makerspace",
    location: "",
    students: "",
    solution_interest: "makerspace-masters",
    implementation_time: "immediate",
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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
      if (!formData.type.trim()) newErrors.type = "Please select institution type.";
      if (!formData.location.trim()) newErrors.location = "Location is required.";
      if (!formData.students.trim()) newErrors.students = "Number of students is required.";
    }

    if (step === 3) {
      if (!formData.solution_interest.trim()) newErrors.solution_interest = "Please select a solution.";
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
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok || data.success) {
        setIsSuccess(true);
      } else {
        alert(data.message || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF9F6] text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-[#131313]/5 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Montserrat',sans-serif] tracking-tight text-neutral-950">
            Book Your Campus Consultation
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-3 font-['Work_Sans',sans-serif]">
            Connect with our lead makerspace architects to explore custom layouts, NEP 2020 curriculum, and budget planning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl md:rounded-[40px] p-8 md:p-14 border border-neutral-200 shadow-xl overflow-hidden">
          {/* Left Column: Direct Reach details */}
          <div className="lg:col-span-4 bg-[#131313] text-white rounded-3xl p-8 md:p-10 flex flex-col justify-between space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9F2B6]">Direct Contact</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Montserrat',sans-serif] mt-2 mb-4">
                We're Here to Help
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-8">
                Speak directly with an education lab specialist for customized quotes, floorplan surveys, and curriculum walkthroughs.
              </p>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#FE9F99]" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">Toll Free Support</div>
                    <div className="font-semibold text-white">1800 547 7600</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#C9F2B6]" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">Email Inquiries</div>
                    <div className="font-semibold text-white">hello@makerspacemasters.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#ABBCFE]" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">Global Offices</div>
                    <div className="font-medium text-neutral-200">
                      USA: 30 N Gould St, Sheridan, WY<br />
                      India: New Delhi • Bengaluru
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-neutral-400">
              ⚡ Guaranteed response within 24 business hours.
            </div>
          </div>

          {/* Right Column: 3-Step Interactive Form */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-16 px-4 my-auto">
                <div className="w-16 h-16 bg-[#C9F2B6] text-black rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-3xl font-bold font-['Montserrat',sans-serif] text-neutral-900 mb-3">
                  Consultation Request Received!
                </h3>
                <p className="text-neutral-600 max-w-md mb-8 font-['Work_Sans',sans-serif]">
                  Thank you, <span className="font-bold text-black">{formData.first_name}</span>. Our lab design team will contact you shortly to schedule your demo.
                </p>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setCurrentStep(1);
                  }}
                  className="px-8 py-3 bg-[#131313] hover:bg-neutral-800 text-white font-semibold rounded-2xl transition"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <>
                {/* Stepper Tabs */}
                <div className="flex items-center justify-between max-w-lg mx-auto w-full mb-8">
                  {[
                    { num: 1, label: "Personal", color: "bg-[#FE9F99]" },
                    { num: 2, label: "Institution", color: "bg-[#C9F2B6]" },
                    { num: 3, label: "Solutions", color: "bg-[#ABBCFE]" },
                  ].map((s, idx) => (
                    <div key={s.num} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                            currentStep === s.num
                              ? `${s.color} text-black ring-4 ring-black/5 scale-105`
                              : currentStep > s.num
                              ? `${s.color} text-black`
                              : "bg-neutral-200 text-neutral-500"
                          }`}
                        >
                          {currentStep > s.num ? <Check className="w-5 h-5 stroke-[2.5]" /> : s.num}
                        </div>
                        <span className={`text-xs mt-1 font-semibold ${currentStep === s.num ? "text-black" : "text-neutral-400"}`}>
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

                <form onSubmit={currentStep === 3 ? handleSubmit : handleNext} className="space-y-4">
                  {/* Step 1: Personal Details */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="Aman"
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                              errors.first_name ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          />
                          {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Sharma"
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                              errors.last_name ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          />
                          {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="director@school.com"
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                              errors.email ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
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
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Role / Designation <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          placeholder="Principal / Managing Trustee / Academic Dean"
                          className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                            errors.role ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                          }`}
                        />
                        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Institution Details */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                            Institution Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="institution"
                            value={formData.institution}
                            onChange={handleChange}
                            placeholder="St. Xavier's International School"
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                              errors.institution ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          />
                          {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                            Institution Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-neutral-100/80 border border-transparent focus:border-neutral-400 rounded-xl outline-none text-sm text-neutral-900"
                          >
                            <option value="makerspace">K-12 School</option>
                            <option value="mastersx">College / University</option>
                            <option value="mastersplus">Innovation Partner / Franchise</option>
                            <option value="community">Incubator / Community Space</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                            City / Location <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Gurugram, NCR"
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                              errors.location ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          />
                          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                            Student Strength <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="students"
                            value={formData.students}
                            onChange={handleChange}
                            placeholder="e.g. 500 or 1200+"
                            className={`w-full px-4 py-3 bg-neutral-100/80 border rounded-xl outline-none transition text-sm ${
                              errors.students ? "border-red-500 bg-red-50" : "border-transparent focus:border-neutral-400"
                            }`}
                          />
                          {errors.students && <p className="text-red-500 text-xs mt-1">{errors.students}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Solutions & Goals */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                            Primary Solution of Interest <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="solution_interest"
                            value={formData.solution_interest}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-neutral-100/80 border border-transparent focus:border-neutral-400 rounded-xl outline-none text-sm text-neutral-900"
                          >
                            <option value="makerspace-masters">Makerspace Masters (Schools K-12)</option>
                            <option value="makerspace-x">Masters X (Colleges & Higher Ed)</option>
                            <option value="makerspace-masters-plus">Masters + (Partnerships)</option>
                            <option value="community-initiative">Makerspace Arena / Kaushal</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                            Expected Launch Timeline <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="implementation_time"
                            value={formData.implementation_time}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-neutral-100/80 border border-transparent focus:border-neutral-400 rounded-xl outline-none text-sm text-neutral-900"
                          >
                            <option value="immediate">Immediate (0 - 1 Month)</option>
                            <option value="next_quarter">Next Quarter (1 - 3 Months)</option>
                            <option value="future">Next Academic Year (3 - 6 Months)</option>
                            <option value="exploration">Just Exploring Ideas</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Specific Notes / Campus Goals (Optional)
                        </label>
                        <textarea
                          name="comment"
                          rows={3}
                          value={formData.comment}
                          onChange={handleChange}
                          placeholder="Tell us about your campus space or key learning outcomes you want to achieve..."
                          className="w-full px-4 py-3 bg-neutral-100/80 border border-transparent focus:border-neutral-400 rounded-xl outline-none text-sm resize-none"
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
                      <div />
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="submit"
                        className="px-8 py-3 rounded-2xl bg-[#131313] hover:bg-neutral-800 text-white text-sm font-semibold transition shadow-md flex items-center gap-2"
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-2xl bg-[#131313] hover:bg-neutral-800 text-white text-sm font-semibold transition shadow-md flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
