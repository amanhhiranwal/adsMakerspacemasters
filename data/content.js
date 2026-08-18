import {
  Cpu,
  Box,
  Wrench,
  Layers,
  Plane,
  Flame,
  School,
  GraduationCap,
  Network,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Overview", href: "#hero" },
  { label: "Impact", href: "#stats" },
  { label: "Divisions", href: "#solutions" },
  { label: "Lab Modules", href: "#modules" },
  { label: "Stories", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export const ROTATING_WORDS = [
  { text: "Creators", color: "text-white bg-[#042741] border-[#2b5473]" },
  { text: "Innovators", color: "text-[#042741] bg-[#C9F2B6]/40 border-[#C9F2B6]/70" },
  { text: "Future Leaders", color: "text-white bg-gradient-to-r from-[#042741] via-[#2b5473] to-[#4f7c9f] border-transparent" },
];

export const STATS_HEADLINES = [
  {
    title: "Design Creates Impact",
    subtitle: "Where Imagination Meets Real Fabrication",
    description:
      "Turnkey innovation ecosystems that empower learners to ideate, prototype, and build tangible solutions for tomorrow's challenges.",
    badge: "Vision 2026",
    badgeColor: "bg-[#042741]/10 text-[#042741] border-[#042741]/20",
  },
  {
    title: "Innovation Unleashed",
    subtitle: "Labs That Transform Campus Culture",
    description:
      "Beyond standard theory — creating immersive environments where students design autonomous systems, craft wood, and engineer drones.",
    badge: "Real Impact",
    badgeColor: "bg-[#C9F2B6]/30 text-emerald-950 border-[#C9F2B6]/50",
  },
  {
    title: "Learning Through Making",
    subtitle: "Shaping Schools That Shape Tomorrow",
    description:
      "Empowering educators with world-class curriculum, high-precision tools, and continuous masterclass enablement.",
    badge: "NEP 2020",
    badgeColor: "bg-[#4f7c9f]/20 text-[#042741] border-[#4f7c9f]/40",
  },
];

export const DIVISIONS_DATA = [
  {
    id: 1,
    title: "Makerspace Masters",
    subtitle: "For Schools (K-12)",
    icon: School,
    themeColor: "bg-[#FE9F99]",
    themeColorLight: "from-[#FE9F99]/15 to-transparent",
    badgeColor: "bg-[#FE9F99]/20 text-rose-950 border-[#FE9F99]/40",
    accentBg: "bg-[#042741]/10",
    textColor: "text-[#042741]",
    image: "/images/index/schools-tab.png",
    tagline: "Inspiring Young Minds Through Hands-On Creation",
    description:
      "Comprehensive K-12 STEM, Robotics, 3D Printing, AI, Pottery, and Woodworking labs fully aligned with NEP 2020 experiential learning standards.",
    highlights: [
      "Age-tailored curriculum mapped from Grade 1 to 12",
      "Turnkey setup: custom safety furniture, machinery, tools & storage",
      "Continuous teacher training, certifications & masterclasses",
      "Student assessment portal & project portfolio tracking",
    ],
    linkText: "Explore School Solutions",
  },
  {
    id: 2,
    title: "Masters X",
    subtitle: "For Colleges & Universities",
    icon: GraduationCap,
    themeColor: "bg-[#C9F2B6]",
    themeColorLight: "from-[#C9F2B6]/20 to-transparent",
    badgeColor: "bg-[#C9F2B6]/30 text-emerald-950 border-[#C9F2B6]/50",
    accentBg: "bg-[#042741]/10",
    textColor: "text-[#042741]",
    image: "/images/index/mastersx.png",
    tagline: "Advanced Innovation & Incubation Ecosystems",
    description:
      "Industrial-grade fabrication, IoT, Composite Prototyping, and AI incubation labs designed for engineering colleges, universities, and research hubs.",
    highlights: [
      "Industry 4.0, CNC machining & Mechatronics infrastructure",
      "Patent filing, prototype testing & corporate incubation support",
      "Capstone project frameworks & live industry problem statements",
      "Faculty enablement & global hackathon mentorship",
    ],
    linkText: "Explore Higher Ed Solutions",
  },
  {
    id: 3,
    title: "Masters +",
    subtitle: "For Partners & Franchisees",
    icon: Network,
    themeColor: "bg-[#ABBCFE]",
    themeColorLight: "from-[#ABBCFE]/20 to-transparent",
    badgeColor: "bg-[#ABBCFE]/30 text-indigo-950 border-[#ABBCFE]/50",
    accentBg: "bg-[#042741]/10",
    textColor: "text-[#042741]",
    image: "/images/index/masters-plus.png",
    tagline: "Turnkey Makerspace Scaling & Community Hubs",
    description:
      "Scale high-margin innovation centers and community labs with proven operating blueprints, vetted equipment pipelines, and centralized LMS.",
    highlights: [
      "Complete business model, space architecture & ROI framework",
      "Centralized hardware procurement & warranty support",
      "Proprietary learning management system (LMS)",
      "End-to-end operational enablement & national brand backing",
    ],
    linkText: "Partner With Us",
  },
];

export const MODULES_DATA = [
  {
    id: "robotics",
    title: "Robotics & AI",
    tag: "Intelligent Systems",
    icon: Cpu,
    desc: "Microcontrollers, computer vision, sensor fusion, and autonomous mobile robotics.",
    skills: ["Arduino & ESP32 Programming", "Kinematics & Actuators", "Autonomous Navigation"],
    gradient: "from-[#042741]/10 via-white to-white",
    borderColor: "border-[#2b5473]/30 hover:border-[#042741]",
    badgeColor: "bg-[#042741]/10 text-[#042741]",
    iconBg: "bg-[#042741]/10 text-[#042741]",
    dotColor: "bg-[#042741]",
  },
  {
    id: "3dprinting",
    title: "3D Printing & CAD",
    tag: "Rapid Fabrication",
    icon: Box,
    desc: "Parametric 3D design, slicing algorithms, and industrial FDM/SLA prototyping.",
    skills: ["Fusion 360 & Blender", "Filament & Resin Materials", "Iterative Engineering"],
    gradient: "from-emerald-500/15 via-white to-white",
    borderColor: "border-emerald-200/80 hover:border-emerald-400",
    badgeColor: "bg-emerald-100 text-emerald-900",
    iconBg: "bg-emerald-50 text-emerald-600",
    dotColor: "bg-emerald-600",
  },
  {
    id: "wood",
    title: "Woodworking & Carpentry",
    tag: "Hands-on Craft",
    icon: Wrench,
    desc: "Safe joinery techniques, lathe operations, and structural design using natural timber.",
    skills: ["Precision Measurement", "Power & Hand Tools", "Structural Assembly"],
    gradient: "from-amber-500/15 via-white to-white",
    borderColor: "border-amber-200/80 hover:border-amber-400",
    badgeColor: "bg-amber-100 text-amber-900",
    iconBg: "bg-amber-50 text-amber-600",
    dotColor: "bg-amber-600",
  },
  {
    id: "clay",
    title: "Pottery & Ceramics",
    tag: "Tactile Art",
    icon: Layers,
    desc: "Wheel-throwing, ceramic sculpting, kiln firing physics, and surface glazing chemistry.",
    skills: ["Centering & Shaping", "Thermal Dynamics", "3D Spatial Reasoning"],
    gradient: "from-rose-500/15 via-white to-white",
    borderColor: "border-rose-200/80 hover:border-rose-400",
    badgeColor: "bg-rose-100 text-rose-900",
    iconBg: "bg-rose-50 text-rose-600",
    dotColor: "bg-rose-600",
  },
  {
    id: "aviation",
    title: "Aerospace & Drones",
    tag: "Flight Technology",
    icon: Plane,
    desc: "Aerodynamic lift principles, drone assembly, flight controllers, and telemetry.",
    skills: ["Airfoil Simulation", "BLDC Motor Tuning", "FPV Drone Systems"],
    gradient: "from-[#4f7c9f]/20 via-white to-white",
    borderColor: "border-[#4f7c9f]/40 hover:border-[#2b5473]",
    badgeColor: "bg-[#4f7c9f]/20 text-[#042741]",
    iconBg: "bg-[#4f7c9f]/15 text-[#042741]",
    dotColor: "bg-[#2b5473]",
  },
  {
    id: "laser",
    title: "Laser Cutting & CNC",
    tag: "Digital Subtractive",
    icon: Flame,
    desc: "Vector engraving, precision laser optics, acrylic forming, and CNC routing.",
    skills: ["Vector Graphics (SVG/DXF)", "Kerf Compensation", "Multi-material Joinery"],
    gradient: "from-purple-500/15 via-white to-white",
    borderColor: "border-purple-200/80 hover:border-purple-400",
    badgeColor: "bg-purple-100 text-purple-900",
    iconBg: "bg-purple-50 text-purple-600",
    dotColor: "bg-purple-600",
  },
];

export const TESTIMONIALS_DATA = [
  {
    name: "Dr. Ananya Sharma",
    role: "Director of Academics",
    school: "Heritage Global School, Gurugram",
    quote:
      "The makerspace transformed our campus culture. Students who were once passive in science class are now building functional autonomous robots and designing sustainable engineering prototypes.",
    rating: 5,
    borderGlow: "hover:border-[#2b5473]/50",
    accentBg: "bg-[#042741]/10 text-[#042741]",
  },
  {
    name: "Rajesh Kulkarni",
    role: "Principal & Trustee",
    school: "Oakridge International Campus, Bangalore",
    quote:
      "The end-to-end enablement was flawless. From heavy carpentry safety setups to AI neural network kits and dedicated teacher masterclasses, our teachers felt completely confident from day one.",
    rating: 5,
    borderGlow: "hover:border-[#C9F2B6]/70",
    accentBg: "bg-[#C9F2B6]/30 text-emerald-950",
  },
  {
    name: "Meera Subramaniam",
    role: "Head of STEM & Innovation",
    school: "Indus Valley World School, Hyderabad",
    quote:
      "Our students competed in national robotics championships within 6 months of setting up the lab. The NEP 2020 curriculum alignment made integration into our daily timetable effortless.",
    rating: 5,
    borderGlow: "hover:border-[#4f7c9f]/60",
    accentBg: "bg-[#4f7c9f]/20 text-[#042741]",
  },
];

export const FAQS_DATA = [
  {
    category: "space",
    q: "What minimum campus space is required for a Makerspace Innovation Lab?",
    a: "Our modular setups adapt to any room size from 500 sq. ft. (starter innovation room) to 2,500+ sq. ft. (multi-zone fabrication and robotics hub). We provide a customized 3D layout plan matching your specific room dimensions.",
  },
  {
    category: "curriculum",
    q: "How is the curriculum mapped to NEP 2020 and board standards (CBSE/ICSE/IB)?",
    a: "Our experiential learning modules are graded from Grade 1 to 12. They directly integrate with NEP 2020 skill standards, CBSE skill subjects, ICSE vocational curriculum, and IB Design Technology inquiry guidelines.",
  },
  {
    category: "training",
    q: "Do our existing school teachers get trained and certified?",
    a: "Yes! Our master trainers conduct intensive 3-day on-campus bootcamps followed by monthly virtual masterclasses, lesson plans, and year-round technical mentorship through our dedicated LMS.",
  },
  {
    category: "investment",
    q: "What is included in the turnkey setup package?",
    a: "The turnkey package includes custom modular safety furniture, heavy & precision machinery (3D printers, laser cutters, power tools, electronics kits), full student toolkits, Grade 1-12 curriculum, safety gear, LMS licenses, and teacher certifications.",
  },
  {
    category: "space",
    q: "What safety protocols and child-safe machinery do you provide?",
    a: "Student safety is our top priority. We install child-safe smart power switches, HEPA air filtration for 3D printers and laser cutters, ergonomic safety guards, eye protection, and clear zone demarcations.",
  },
  {
    category: "investment",
    q: "How fast can an innovation lab be fully installed and operational?",
    a: "From design approval to final installation and teacher enablement, standard lab deployment takes 2 to 4 weeks, causing zero disruption to ongoing school operations.",
  },
];
