import { useState, useEffect, useRef } from "react";

export default function StatsSection() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [counts, setCounts] = useState({ educators: 0, students: 0, institutions: 0 });
  const sectionRef = useRef(null);

  const headlines = [
    {
      title: "Design Creates Impact",
      subtitle: "Where Imagination Meets Real Impact",
      description:
        "State-of-the-art makerspaces that turn curious minds into confident innovators, preparing students for careers that don't yet exist.",
    },
    {
      title: "Innovation Gets Unleashed",
      subtitle: "Innovation Labs That Change Everything",
      description:
        "Beyond STEM education - create environments where students collaborate globally, solve real problems, and discover their power to change the world.",
    },
    {
      title: "Learning Through Making",
      subtitle: "Shaping Schools That Shape Tomorrow",
      description:
        "Premium innovation ecosystems where students don't just learn—they create, collaborate, and launch ideas that transform their communities and beyond.",
    },
    {
      title: "Learning Revolutionized Through Making",
      subtitle: "Where Potential Becomes Unstoppable Impact",
      description:
        "Cutting-edge makerspaces that bridge education and entrepreneurship, developing resilient, creative thinkers ready for a VUCA world.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 4500);
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

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative w-full py-24 bg-[#FDFDFD] text-neutral-900 overflow-hidden border-b border-neutral-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Metric Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
          <div className="p-8 rounded-3xl bg-[#FE9F99]/15 border border-[#FE9F99]/30 transition-transform duration-300 hover:-translate-y-1">
            <h2 className="text-5xl lg:text-6xl font-black font-['Montserrat',sans-serif] text-neutral-900 tracking-tight">
              {counts.educators}+
            </h2>
            <p className="text-sm md:text-base font-semibold text-neutral-600 mt-2 font-['Work_Sans',sans-serif]">
              Educators Trained
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#C9F2B6]/20 border border-[#C9F2B6]/40 transition-transform duration-300 hover:-translate-y-1">
            <h2 className="text-5xl lg:text-6xl font-black font-['Montserrat',sans-serif] text-neutral-900 tracking-tight">
              {counts.students.toLocaleString()}+
            </h2>
            <p className="text-sm md:text-base font-semibold text-neutral-600 mt-2 font-['Work_Sans',sans-serif]">
              Students Impacted
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#ABBCFE]/20 border border-[#ABBCFE]/40 transition-transform duration-300 hover:-translate-y-1">
            <h2 className="text-5xl lg:text-6xl font-black font-['Montserrat',sans-serif] text-neutral-900 tracking-tight">
              {counts.institutions}+
            </h2>
            <p className="text-sm md:text-base font-semibold text-neutral-600 mt-2 font-['Work_Sans',sans-serif]">
              Institutions Onboarded
            </p>
          </div>
        </div>

        {/* Dynamic Rotating Headline */}
        <div className="text-center max-w-3xl mx-auto min-h-[180px] flex flex-col items-center justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Montserrat',sans-serif] text-neutral-950 mb-2 transition-all duration-500">
            {headlines[headlineIndex].title}
          </h2>
          <p className="text-lg md:text-xl font-semibold text-neutral-500 font-['Montserrat',sans-serif] mb-4">
            {headlines[headlineIndex].subtitle}
          </p>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl font-['Work_Sans',sans-serif]">
            {headlines[headlineIndex].description}
          </p>
        </div>
      </div>
    </section>
  );
}
