import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function MissionSection({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      title: "Makerspace Masters",
      subtitle: "For Schools",
      themeColor: "bg-[#FE9F99]",
      badgeColor: "bg-[#FE9F99]/20 text-neutral-900 border-[#FE9F99]/40",
      image: "/images/index/schools-tab.png",
      tagline: "Inspiring Young Minds Through Hands-On Creation",
      description:
        "Comprehensive K-12 STEM, Robotics, 3D Printing, AI, Pottery, and Woodworking labs fully aligned with NEP 2020 experiential learning standards.",
      highlights: [
        "Age-tailored curriculum (Grade 1 to 12)",
        "Turnkey lab setup: furniture, machinery, tools & storage",
        "Continuous teacher training & masterclass certifications",
        "Student assessment portal & project portfolios",
      ],
      linkText: "Explore School Labs",
    },
    {
      id: 2,
      title: "Masters X",
      subtitle: "For Colleges & Institutions",
      themeColor: "bg-[#C9F2B6]",
      badgeColor: "bg-[#C9F2B6]/30 text-neutral-900 border-[#C9F2B6]/50",
      image: "/images/index/mastersx.png",
      tagline: "Advanced Innovation & Incubation Ecosystems",
      description:
        "Industrial-grade fabrication, IoT, Composite Prototyping, and AI incubation labs designed for engineering colleges, universities, and research hubs.",
      highlights: [
        "Industry 4.0 & Mechatronics infrastructure",
        "Patent filing, prototype testing & incubation support",
        "Corporate capstone projects & live problem statements",
        "Faculty enablement & global hackathon mentoring",
      ],
      linkText: "Explore Higher Ed Labs",
    },
    {
      id: 3,
      title: "Masters +",
      subtitle: "For Partners & Franchisees",
      themeColor: "bg-[#ABBCFE]",
      badgeColor: "bg-[#ABBCFE]/30 text-neutral-900 border-[#ABBCFE]/50",
      image: "/images/index/masters-plus.png",
      tagline: "Turnkey Makerspace Expansion & Community Labs",
      description:
        "Scale high-margin innovation centers and community labs with proven operating blueprints, vetted equipment pipelines, and LMS integration.",
      highlights: [
        "Complete business model & ROI framework",
        "Centralized hardware procurement & warranty support",
        "Proprietary learning management system (LMS)",
        "End-to-end operational enablement & branding",
      ],
      linkText: "Partner With Us",
    },
  ];

  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else onOpenModal();
  };

  return (
    <section id="solutions" className="py-24 bg-white text-neutral-900 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-600 mb-3">
            Our Divisions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Montserrat',sans-serif] tracking-tight mb-4">
            One Mission. Three Ways to Build It.
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg font-['Work_Sans',sans-serif]">
            Each division serves a distinct educational purpose, but they all lead to real-world innovation.
          </p>
        </div>

        {/* Division Tab Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-6 rounded-3xl text-left transition-all duration-300 border flex items-center justify-between group cursor-pointer ${
                activeTab === tab.id
                  ? `${tab.themeColor} text-neutral-950 border-transparent shadow-lg scale-102`
                  : "bg-neutral-50 hover:bg-neutral-100/80 text-neutral-800 border-neutral-200"
              }`}
            >
              <div>
                <h3 className="text-xl font-bold font-['Montserrat',sans-serif]">
                  {tab.title}
                </h3>
                <p className="text-sm font-medium text-neutral-600 font-['Work_Sans',sans-serif] mt-0.5">
                  {tab.subtitle}
                </p>
              </div>
              <span className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${
                activeTab === tab.id ? "bg-black text-white" : "bg-neutral-200 text-neutral-700 group-hover:translate-x-1 group-hover:-translate-y-1"
              }`}>
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="bg-[#F8F9FA] rounded-[36px] p-8 md:p-12 border border-neutral-200/80 shadow-sm transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${current.badgeColor}`}>
                {current.subtitle}
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Montserrat',sans-serif] text-neutral-900 leading-tight">
                {current.tagline}
              </h3>

              <p className="text-neutral-600 text-base md:text-lg leading-relaxed font-['Work_Sans',sans-serif]">
                {current.description}
              </p>

              {/* Highlights */}
              <div className="space-y-3 pt-2">
                {current.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-neutral-700 font-medium text-sm md:text-base font-['Work_Sans',sans-serif]">
                    <CheckCircle2 className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <button
                  onClick={handleScrollToContact}
                  className="px-8 py-3.5 bg-[#131313] hover:bg-neutral-800 text-white rounded-2xl font-semibold text-sm transition-all shadow-md hover:shadow-xl flex items-center gap-2"
                >
                  {current.linkText}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Image Graphic */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-white">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
