import { useState, useEffect } from "react";
import { Quote, Star, Sparkles } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/content";
import Badge from "@/components/ui/Badge";

export default function TestimonialsSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["School Leaders.", "Educators.", "Principals.", "Campuses."];

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-white text-[#042741] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4">
            {/* <Badge variant="brandLight" icon={Sparkles}>Institutional Impact</Badge> */}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Montserrat',sans-serif] tracking-tight text-[#042741]">
            Trusted by{" "}
            <span className="inline-block text-gradient-brand transition-all duration-300">
              {words[wordIndex]}
            </span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-3 font-['Work_Sans',sans-serif]">
            Hear what visionary education leaders and innovation heads have to say about partnering with us.
          </p>
        </div>

        {/* Testimonials Apple Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={idx}
              className={`bg-[#FAFAFA] rounded-[2rem] p-8 md:p-9 border border-neutral-200/80 shadow-xs flex flex-col justify-between hover:shadow-xl transition-all duration-400 hover:-translate-y-1 ${t.borderGlow}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${t.accentBg} font-['Montserrat',sans-serif]`}>
                    Verified Partner
                  </span>
                </div>

                <Quote className="w-7 h-7 text-[#2b5473]/30 mb-3" />
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-['Work_Sans',sans-serif] mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#042741]/10">
                <div className="font-bold text-[#042741] text-base font-['Montserrat',sans-serif]">
                  {t.name}
                </div>
                <div className="text-xs text-neutral-500 font-['Work_Sans',sans-serif] mt-0.5">
                  {t.role} • <span className="text-[#042741] font-semibold">{t.school}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
