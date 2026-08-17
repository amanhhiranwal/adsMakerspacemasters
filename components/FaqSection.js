import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection({ onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItems, setOpenItems] = useState({ "gen-0": true });

  const categories = [
    { id: "general", label: "General & Setup" },
    { id: "curriculum", label: "Curriculum & NEP 2020" },
    { id: "safety", label: "Safety & Equipment" },
    { id: "training", label: "Teacher Enablement" },
  ];

  const faqs = {
    general: [
      {
        id: "gen-0",
        q: "What is the minimum space required to set up a Makerspace in our school?",
        a: "A standard comprehensive makerspace can be efficiently configured in spaces ranging from 600 sq.ft. (compact studio) to 2,000+ sq.ft. (full innovation hub). Our architectural team provides custom 2D/3D layout plans to optimize your available floor plan.",
      },
      {
        id: "gen-1",
        q: "How long does the turnkey setup process take from agreement to launch?",
        a: "Typically 3 to 5 weeks. This includes architectural planning, custom acoustic/electrical flooring & furniture installation, machinery and tool delivery, teacher bootcamps, and inauguration readiness.",
      },
      {
        id: "gen-2",
        q: "Do you support existing computer labs or Atal Tinkering Labs (ATL)?",
        a: "Yes! We specialize in upgrading and expanding existing ATLs and STEM labs into multi-disciplinary fabrication centers with advanced tools like laser cutters, pottery wheels, and AI edge computing.",
      },
    ],
    curriculum: [
      {
        id: "curr-0",
        q: "How is the Makerspace curriculum aligned with NEP 2020 and CBSE/ICSE/IB?",
        a: "Our experiential curriculum is graded from Grade 1 to 12 and mapped directly to NEP 2020 skill standards, CBSE skill subjects, ICSE vocational modules, and IB Design Technology inquiry criteria.",
      },
      {
        id: "curr-1",
        q: "Are student project kits and assessment portals included?",
        a: "Yes. Every student receives structured hands-on project materials, and schools get access to our digital LMS with project guides, video tutorials, rubrics, and digital student portfolios.",
      },
    ],
    safety: [
      {
        id: "safe-0",
        q: "How do you ensure student safety with power tools and machinery?",
        a: "Every lab includes industrial-grade emergency stop switches, child-safe micro-lathes and saws, safety goggles, fire suppression systems, ventilation hoods, and mandatory safety protocol certifications.",
      },
      {
        id: "safe-1",
        q: "What warranties and maintenance support are provided for machines?",
        a: "All equipment comes with a minimum 1 to 3-year replacement warranty, annual maintenance contracts (AMC), and dedicated local technician support for zero downtime.",
      },
    ],
    training: [
      {
        id: "train-0",
        q: "Do school teachers need prior technical or engineering backgrounds?",
        a: "Not at all. We conduct intensive multi-tier teacher enablement programs that equip educators of science, math, art, or computer science to confidently lead makerspace sessions.",
      },
      {
        id: "train-1",
        q: "Is ongoing mentor support provided during the academic year?",
        a: "Yes, our master mentors provide bi-weekly lesson assistance, competition preparation guidance, and regular refresher workshops throughout the school calendar.",
      },
    ],
  };

  const toggleItem = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else onOpenModal();
  };

  return (
    <section id="faq" className="py-24 bg-[#FAFAFA] text-neutral-900 border-b border-neutral-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-600 mb-3">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Montserrat',sans-serif] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-3 font-['Work_Sans',sans-serif]">
            Everything you need to know about partnering with Makerspace Masters.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#131313] text-white shadow-md"
                  : "bg-white text-neutral-600 hover:bg-neutral-200/70 border border-neutral-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Questions */}
        <div className="space-y-4">
          {(faqs[activeCategory] || []).map((faq) => {
            const isOpen = !!openItems[faq.id];

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-5 text-left font-bold font-['Montserrat',sans-serif] text-neutral-900 flex items-center justify-between gap-4 text-base sm:text-lg hover:text-neutral-600 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-black" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-600 leading-relaxed font-['Work_Sans',sans-serif] border-t border-neutral-50 animate__animated animate__fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-neutral-200 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left">
            <h4 className="text-xl font-bold font-['Montserrat',sans-serif] text-neutral-900">
              Have a specific question about your school?
            </h4>
            <p className="text-sm text-neutral-500 font-['Work_Sans',sans-serif] mt-1">
              Speak with our senior makerspace architect today.
            </p>
          </div>
          <button
            onClick={handleScrollToContact}
            className="px-6 py-3 bg-[#131313] hover:bg-neutral-800 text-white rounded-xl font-semibold text-sm transition shrink-0 shadow-md cursor-pointer"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
