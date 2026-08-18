import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { DIVISIONS_DATA } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";

export default function MissionSection({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState(1);

  const current = DIVISIONS_DATA.find((t) => t.id === activeTab) || DIVISIONS_DATA[0];

  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else onOpenModal();
  };

  return (
    <section id="solutions" className="py-24 bg-[#FAFAFA] text-[#042741] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          title="One Mission."
          gradientTitle="Three Tailored Ways to Build It."
          subtitle="Purpose-built frameworks designed specifically for primary schools, high schools, engineering colleges, and innovation partners."
        />

        {/* Division Tab Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {DIVISIONS_DATA.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-6 rounded-[2rem] text-left transition-all duration-300 border flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? `${tab.themeColor} text-[#042741] border-transparent shadow-lg shadow-black/5 scale-[1.02]`
                    : "bg-white hover:bg-neutral-100/80 text-neutral-800 border-neutral-200/70"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 ${
                    isSelected ? "bg-[#042741] text-white" : "bg-[#042741]/10 text-[#042741]"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-['Montserrat',sans-serif]">
                      {tab.title}
                    </h3>
                    <p className="text-xs font-medium text-neutral-600 font-['Work_Sans',sans-serif]">
                      {tab.subtitle}
                    </p>
                  </div>
                </div>

                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isSelected ? "bg-[#042741] text-white" : "bg-neutral-100 text-neutral-400 group-hover:text-neutral-900"
                }`}>
                  →
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Bento Content Display */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-14 border border-neutral-200/80 shadow-xl relative overflow-hidden">
          
          {/* Subtle gradient corner glow */}
          <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${current.themeColorLight} rounded-full blur-3xl pointer-events-none`} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wider font-['Montserrat',sans-serif] ${current.badgeColor}`}>
                {current.subtitle}
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Montserrat',sans-serif] text-[#042741] leading-tight">
                {current.tagline}
              </h3>

              <p className="text-neutral-600 text-base md:text-lg leading-relaxed font-['Work_Sans',sans-serif]">
                {current.description}
              </p>

              {/* Highlights */}
              <div className="space-y-3 pt-2">
                {current.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-neutral-800 font-medium text-sm md:text-base font-['Work_Sans',sans-serif]">
                    <div className={`w-5 h-5 rounded-full ${current.accentBg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <span className={`text-xs font-bold ${current.textColor}`}>✓</span>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button with Brand Gradient */}
              <div className="pt-4">
                <button
                  onClick={handleScrollToContact}
                  className="px-7 py-3.5 bg-gradient-to-r from-[#042741] via-[#2b5473] to-[#4f7c9f] hover:opacity-95 text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-2 cursor-pointer font-['Montserrat',sans-serif]"
                >
                  <span>{current.linkText}</span>
                  <ArrowRight className="w-4 h-4 text-[#C9F2B6]" />
                </button>
              </div>
            </div>

            {/* Right Photo Bento Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-neutral-100 group">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
