import { useState } from "react";
import { Cpu, Box, Wrench, Layers, Radio, Sparkles, Plane, Compass, Flame } from "lucide-react";

export default function ModulesSection({ onOpenModal }) {
  const [activeModule, setActiveModule] = useState(0);

  const modules = [
    {
      id: "robotics",
      title: "Robotics & AI",
      tag: "Intelligent Systems",
      icon: Cpu,
      desc: "Microcontrollers, computer vision, sensor fusion, and autonomous mobile robotics.",
      skills: ["Arduino & ESP32 Programming", "Kinematics & Actuators", "Autonomous Navigation"],
      color: "from-blue-500/10 to-indigo-500/10 border-blue-200",
    },
    {
      id: "3dprinting",
      title: "3D Printing & CAD",
      tag: "Rapid Fabrication",
      icon: Box,
      desc: "Parametric 3D design, slicing algorithms, and industrial FDM/SLA prototyping.",
      skills: ["Fusion 360 & Blender", "Filament & Resin Materials", "Iterative Engineering"],
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-200",
    },
    {
      id: "wood",
      title: "Woodworking & Carpentry",
      tag: "Hands-on Craft",
      icon: Wrench,
      desc: "Safe joinery techniques, lathe operations, and structural design using natural timber.",
      skills: ["Precision Measurement", "Power & Hand Tools", "Structural Assembly"],
      color: "from-amber-500/10 to-orange-500/10 border-amber-200",
    },
    {
      id: "clay",
      title: "Pottery & Ceramics",
      tag: "Tactile Art",
      icon: Layers,
      desc: "Wheel-throwing, ceramic sculpting, kiln firing physics, and surface glazing chemistry.",
      skills: ["Centering & Shaping", "Thermal Dynamics", "3D Spatial Reasoning"],
      color: "from-rose-500/10 to-pink-500/10 border-rose-200",
    },
    {
      id: "aviation",
      title: "Aerospace & Drones",
      tag: "Flight Technology",
      icon: Plane,
      desc: "Aerodynamic lift principles, drone assembly, flight controllers, and telemetry.",
      skills: ["Airfoil Simulation", "BLDC Motor Tuning", "FPV Drone Systems"],
      color: "from-sky-500/10 to-cyan-500/10 border-sky-200",
    },
    {
      id: "laser",
      title: "Laser Cutting & CNC",
      tag: "Digital Subtractive",
      icon: Flame,
      desc: "Vector engraving, precision laser optics, acrylic forming, and CNC routing.",
      skills: ["Vector Graphics (SVG/DXF)", "Kerf Compensation", "Multi-material Joinery"],
      color: "from-purple-500/10 to-violet-500/10 border-purple-200",
    },
  ];

  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else onOpenModal();
  };

  return (
    <section id="modules" className="py-24 bg-[#FAF9F6] text-neutral-900 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-600 mb-3">
              Comprehensive Lab Modules
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Montserrat',sans-serif] tracking-tight text-neutral-950">
              18+ Interconnected Learning Disciplines
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg mt-3 font-['Work_Sans',sans-serif]">
              Modular, scalable, and tailored to empower students from foundational curiosity to high-tech mastery.
            </p>
          </div>

          <button
            onClick={handleScrollToContact}
            className="px-6 py-3 bg-[#131313] hover:bg-neutral-800 text-white rounded-2xl font-semibold text-sm transition self-start md:self-auto shrink-0 shadow-md"
          >
            Download Lab Curriculum
          </button>
        </div>

        {/* Grid of Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            const isSelected = activeModule === idx;

            return (
              <div
                key={mod.id}
                onClick={() => setActiveModule(idx)}
                className={`cursor-pointer rounded-3xl p-8 transition-all duration-300 border bg-white flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                  isSelected ? "ring-2 ring-neutral-900 shadow-lg" : "border-neutral-200/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:scale-110 transition">
                      <Icon className="w-7 h-7 stroke-[1.75]" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-600">
                      {mod.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-['Montserrat',sans-serif] text-neutral-900 mb-2">
                    {mod.title}
                  </h3>

                  <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-['Work_Sans',sans-serif]">
                    {mod.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Key Outcomes
                  </div>
                  <ul className="space-y-1.5 text-xs font-medium text-neutral-700">
                    {mod.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900"></span>
                        {skill}
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
