import { useState, useEffect, useRef } from "react";
import { TrendingUp, Award, Building, Sparkles } from "lucide-react";
import { STATS_HEADLINES } from "@/data/content";

export default function StatsSection() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [counts, setCounts] = useState({ educators: 0, students: 0, institutions: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % STATS_HEADLINES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const targets = { educators: 200, students: 50000, institutions: 250 };
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        educators: Math.floor(targets.educators * progress),
        students: Math.floor(targets.students * progress),
        institutions: Math.floor(targets.institutions * progress),
      });

      if (step >= steps) {
        setCounts(targets);
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const activeHeadline = STATS_HEADLINES[headlineIndex];

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative w-full py-14 sm:py-16 bg-white text-[#042741] overflow-hidden"
    >
      {/* Brand Palette Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-[#042741]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-[#4f7c9f]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Apple Bento Metric Cards with Brand Trim */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-12">
          
          {/* Card 1: Educators */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-white to-[#042741]/10 border border-[#042741]/20 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#042741] bg-[#042741]/10 px-2.5 py-0.5 rounded-full font-['Montserrat',sans-serif]">
                Certified Educators
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#042741]/10 flex items-center justify-center text-[#042741] group-hover:scale-105 transition">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold font-['Montserrat',sans-serif] text-[#042741] tracking-tight">
                {counts.educators}+
              </h2>
              <p className="text-xs font-medium text-neutral-600 mt-1 font-['Work_Sans',sans-serif]">
                Trained & certified teachers delivering hands-on STEM.
              </p>
            </div>
          </div>

          {/* Card 2: Students */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-white to-[#2b5473]/15 border border-[#2b5473]/30 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-950 bg-[#C9F2B6]/40 px-2.5 py-0.5 rounded-full font-['Montserrat',sans-serif]">
                Young Learners
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#C9F2B6]/30 flex items-center justify-center text-emerald-950 group-hover:scale-105 transition">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold font-['Montserrat',sans-serif] text-[#042741] tracking-tight">
                {counts.students.toLocaleString()}+
              </h2>
              <p className="text-xs font-medium text-neutral-600 mt-1 font-['Work_Sans',sans-serif]">
                Students actively creating & prototyping nationwide.
              </p>
            </div>
          </div>

          {/* Card 3: Institutions */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-white to-[#4f7c9f]/20 border border-[#4f7c9f]/35 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#042741] bg-[#4f7c9f]/25 px-2.5 py-0.5 rounded-full font-['Montserrat',sans-serif]">
                Partner Campuses
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#4f7c9f]/20 flex items-center justify-center text-[#042741] group-hover:scale-105 transition">
                <Building className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold font-['Montserrat',sans-serif] text-[#042741] tracking-tight">
                {counts.institutions}+
              </h2>
              <p className="text-xs font-medium text-neutral-600 mt-1 font-['Work_Sans',sans-serif]">
                Leading schools & colleges onboarded.
              </p>
            </div>
          </div>

        </div>

        {/* Compact Rotating Statement Section with Brand Gradient */}
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border mb-3 font-['Montserrat',sans-serif] transition-all duration-500 ${activeHeadline.badgeColor}`}>
            <Sparkles className="w-3 h-3" />
            <span>{activeHeadline.badge}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Montserrat',sans-serif] text-[#042741] tracking-tight leading-tight mb-2 transition-all duration-500">
            {activeHeadline.title}
          </h3>

          <p className="text-base sm:text-lg font-semibold text-[#2b5473] font-['Montserrat',sans-serif] mb-3">
            {activeHeadline.subtitle}
          </p>

          <p className="text-sm text-neutral-600 leading-relaxed font-['Work_Sans',sans-serif] max-w-xl mx-auto">
            {activeHeadline.description}
          </p>
        </div>

      </div>
    </section>
  );
}
