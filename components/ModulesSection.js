import { useState } from "react";
import { Sparkles } from "lucide-react";
import { MODULES_DATA } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ModulesSection() {
  const [activeModule, setActiveModule] = useState(0);

  return (
    <section id="modules" className="py-24 bg-white text-[#042741] relative overflow-hidden">
      
      {/* Background ambient lighting with brand tones */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#4f7c9f]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#042741]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          // badgeText="Comprehensive Disciplines"
          badgeIcon={Sparkles}
          badgeVariant="brandLight"
          title="18+ Interconnected"
          gradientTitle="Learning Disciplines"
          subtitle="Modular, scalable, and tailored to empower students from foundational curiosity to high-tech mastery."
          centered={false}
        />

        {/* Apple Bento Grid of Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES_DATA.map((mod, idx) => {
            const Icon = mod.icon;
            const isSelected = activeModule === idx;

            return (
              <div
                key={mod.id}
                onClick={() => setActiveModule(idx)}
                className={`cursor-pointer rounded-[2rem] p-8 transition-all duration-400 border bg-gradient-to-br ${mod.gradient} flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 ${
                  isSelected ? "ring-2 ring-[#042741] shadow-xl" : `${mod.borderColor} shadow-xs`
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${mod.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs`}>
                      <Icon className="w-7 h-7 stroke-[1.75]" />
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${mod.badgeColor} font-['Montserrat',sans-serif]`}>
                      {mod.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-['Montserrat',sans-serif] text-[#042741] mb-2">
                    {mod.title}
                  </h3>

                  <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-['Work_Sans',sans-serif]">
                    {mod.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-[#042741]/10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#2b5473] mb-2.5 font-['Montserrat',sans-serif]">
                    Key Learning Outcomes
                  </div>
                  <ul className="space-y-2 text-xs font-medium text-neutral-700 font-['Work_Sans',sans-serif]">
                    {mod.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${mod.dotColor}`} />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
