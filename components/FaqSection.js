import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { FAQS_DATA } from "@/data/content";
import Badge from "@/components/ui/Badge";

const FAQ_CATEGORIES = [
  {
    id: "all",
    label: "All Questions",
    activeClass: "bg-gradient-to-r from-[#042741] via-[#2b5473] to-[#4f7c9f] text-white shadow-md",
  },
  {
    id: "space",
    label: "Space & Setup",
    activeClass: "bg-gradient-to-r from-[#042741] to-[#2b5473] text-white shadow-md shadow-[#042741]/20",
  },
  {
    id: "curriculum",
    label: "Curriculum & NEP",
    activeClass: "bg-gradient-to-r from-[#2b5473] to-[#4f7c9f] text-white shadow-md shadow-[#2b5473]/30",
  },
  {
    id: "training",
    label: "Teacher Training",
    activeClass: "bg-gradient-to-r from-[#4f7c9f] to-[#73a1c6] text-white shadow-md shadow-[#4f7c9f]/30",
  },
  {
    id: "investment",
    label: "Investment & ROI",
    activeClass: "bg-gradient-to-r from-[#042741] via-[#2b5473] to-[#4f7c9f] text-white shadow-md shadow-[#042741]/30",
  },
];

const CATEGORY_GRADIENTS = {
  space: {
    cardActive: "bg-gradient-to-br from-white via-white to-[#042741]/10 border-[#042741]/40 shadow-lg shadow-[#042741]/5",
    badge: "bg-gradient-to-r from-[#042741]/15 to-[#042741]/5 text-[#042741] border-[#042741]/30",
    iconActive: "bg-gradient-to-br from-[#042741] to-[#2b5473] text-white",
  },
  curriculum: {
    cardActive: "bg-gradient-to-br from-white via-white to-[#2b5473]/15 border-[#2b5473]/40 shadow-lg shadow-[#2b5473]/5",
    badge: "bg-gradient-to-r from-[#2b5473]/20 to-[#2b5473]/10 text-[#042741] border-[#2b5473]/30",
    iconActive: "bg-gradient-to-br from-[#2b5473] to-[#4f7c9f] text-white",
  },
  training: {
    cardActive: "bg-gradient-to-br from-white via-white to-[#4f7c9f]/15 border-[#4f7c9f]/40 shadow-lg shadow-[#4f7c9f]/5",
    badge: "bg-gradient-to-r from-[#4f7c9f]/20 to-[#4f7c9f]/10 text-[#042741] border-[#4f7c9f]/30",
    iconActive: "bg-gradient-to-br from-[#4f7c9f] to-[#73a1c6] text-white",
  },
  investment: {
    cardActive: "bg-gradient-to-br from-white via-white to-[#042741]/15 border-[#042741]/40 shadow-lg shadow-[#042741]/5",
    badge: "bg-gradient-to-r from-[#042741]/20 to-[#4f7c9f]/20 text-[#042741] border-[#042741]/30",
    iconActive: "bg-gradient-to-br from-[#042741] via-[#2b5473] to-[#4f7c9f] text-white",
  },
};

export default function FaqSection({ onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs =
    activeCategory === "all"
      ? FAQS_DATA
      : FAQS_DATA.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-[#FAFAFA] via-white to-[#FAFAFA] text-[#042741] relative overflow-hidden">
      
      {/* Radiant ambient brand gradient glow blobs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-gradient-to-br from-[#042741]/15 to-[#2b5473]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-gradient-to-bl from-[#4f7c9f]/20 via-[#2b5473]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Brand Gradient */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="mb-4">
            {/* <Badge variant="brandLight" icon={HelpCircle}>Got Questions?</Badge> */}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Montserrat',sans-serif] tracking-tight text-[#042741] leading-tight">
            Frequently Asked <br className="hidden sm:inline" />
            <span className="text-gradient-brand">Questions & Answers</span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-3 font-['Work_Sans',sans-serif] leading-relaxed">
            Everything school leaders, trustees, and educators need to know about setting up a high-impact makerspace.
          </p>
        </div>

        {/* Brand Gradient Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer font-['Montserrat',sans-serif] border ${
                  isActive
                    ? `${cat.activeClass} border-transparent scale-105`
                    : "bg-white text-neutral-600 hover:text-[#042741] border-neutral-200/80 hover:bg-neutral-50 shadow-2xs"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordion FAQ Items with Brand Gradient Glow */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const style = CATEGORY_GRADIENTS[faq.category] || CATEGORY_GRADIENTS.space;

            return (
              <div
                key={idx}
                className={`rounded-[1.75rem] border transition-all duration-400 overflow-hidden ${
                  isOpen
                    ? `${style.cardActive}`
                    : "bg-white border-neutral-200/80 hover:border-neutral-300 shadow-xs hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1.5 pr-2">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${style.badge} font-['Montserrat',sans-serif]`}>
                      {faq.category === "space"
                        ? "Space & Setup"
                        : faq.category === "curriculum"
                        ? "Curriculum & NEP"
                        : faq.category === "training"
                        ? "Teacher Enablement"
                        : "Investment & ROI"}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#042741] font-['Montserrat',sans-serif] leading-snug">
                      {faq.q}
                    </h3>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs ${
                      isOpen
                        ? `rotate-180 ${style.iconActive}`
                        : "bg-neutral-100 text-[#042741] hover:bg-neutral-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-0 text-sm sm:text-base text-neutral-700 leading-relaxed font-['Work_Sans',sans-serif] border-t border-black/[0.04] mt-1 pt-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Luminous Brand Gradient Consultation Callout Card */}
        <div className="mt-14 p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-white via-white to-[#4f7c9f]/15 border border-[#4f7c9f]/30 shadow-xl shadow-[#042741]/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#042741]/10 via-[#2b5473]/15 to-[#4f7c9f]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#042741]/10 text-[#042741] text-[10px] font-bold uppercase tracking-wider mb-2 font-['Montserrat',sans-serif]">
              <Sparkles className="w-3 h-3 text-[#2b5473]" />
              <span>Direct Space Consulting</span>
            </div>
            <h4 className="text-xl font-extrabold font-['Montserrat',sans-serif] text-[#042741]">
              Have customized campus requirements?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 font-['Work_Sans',sans-serif] mt-1 max-w-md">
              Speak directly with our senior makerspace architects for floorplan surveys and turnkey quotes.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={onOpenModal}
              className="px-6 py-3.5 bg-gradient-to-r from-[#042741] via-[#2b5473] to-[#4f7c9f] hover:opacity-95 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-xl hover:scale-105 flex items-center gap-2 cursor-pointer font-['Montserrat',sans-serif]"
            >
              <span>Schedule Free Demo</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9F2B6]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
