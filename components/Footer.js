import { ArrowRight, Phone, Mail, MapPin, Sparkles } from "lucide-react";

export default function Footer({ onOpenModal }) {
  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#042741] text-neutral-300 font-['Work_Sans',sans-serif] relative overflow-hidden">
      
      {/* Radiant brand ambient glow aura in footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-72 bg-gradient-to-b from-[#2b5473]/30 via-[#4f7c9f]/20 to-transparent blur-3xl pointer-events-none" />

      {/* Top CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10 border-b border-white/10">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-[#042741] via-[#2b5473] to-[#4f7c9f] p-8 sm:p-12 lg:p-16 border border-white/20 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          
          {/* Subtle atmospheric gradient accents */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#C9F2B6]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-bold uppercase tracking-wider mb-4 font-['Montserrat',sans-serif] backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-[#C9F2B6]" />
              <span>Transform Your Campus</span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-['Montserrat',sans-serif] tracking-tight leading-tight">
              Ready to Build Your School's Innovation Lab?
            </h3>
            <p className="text-white/80 text-sm sm:text-base mt-3 leading-relaxed">
              Book a free campus consultation to receive customized 3D lab layouts, turnkey machinery catalogs, and NEP 2020 curriculum roadmaps.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={onOpenModal}
              className="px-8 py-4 bg-white hover:bg-neutral-100 text-[#042741] rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 flex items-center gap-2 cursor-pointer font-['Montserrat',sans-serif]"
            >
              <span>Schedule Campus Demo</span>
              <ArrowRight className="w-4 h-4 text-[#042741]" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <img
              src="/images/common/mainLogo.svg"
              alt="Makerspace Masters"
              className="h-10 w-auto object-contain brightness-0 invert"
            />
            <p className="text-sm text-neutral-300 max-w-sm leading-relaxed">
              Turnkey innovation labs, proprietary experiential curriculum, and continuous teacher enablement for schools and universities across India and globally.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-neutral-300 font-semibold font-['Montserrat',sans-serif]">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">NEP 2020</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">STEM & Robotics</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">Grade 1-12</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white font-['Montserrat',sans-serif] mb-2">
              Navigation
            </div>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <a href="#hero" onClick={(e) => handleScrollToSection(e, "hero")} className="hover:text-white transition">
                  Overview & Demo
                </a>
              </li>
              <li>
                <a href="#stats" onClick={(e) => handleScrollToSection(e, "stats")} className="hover:text-white transition">
                  Impact & Metrics
                </a>
              </li>
              <li>
                <a href="#solutions" onClick={(e) => handleScrollToSection(e, "solutions")} className="hover:text-white transition">
                  Divisions (Schools & Higher Ed)
                </a>
              </li>
              <li>
                <a href="#modules" onClick={(e) => handleScrollToSection(e, "modules")} className="hover:text-white transition">
                  18+ Lab Modules
                </a>
              </li>
              <li>
                <a href="#testimonials" onClick={(e) => handleScrollToSection(e, "testimonials")} className="hover:text-white transition">
                  Principal Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleScrollToSection(e, "faq")} className="hover:text-white transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white font-['Montserrat',sans-serif] mb-2">
              Global Support
            </div>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C9F2B6] shrink-0 mt-0.5" />
                <span>1800 547 7600 (Toll Free)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C9F2B6] shrink-0 mt-0.5" />
                <span>hello@makerspacemasters.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ABBCFE] shrink-0 mt-0.5" />
                <span>Sheridan, WY, USA • New Delhi, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Admin Link */}
        <div className="mt-12 pt-8 border-t border-white/10 text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Makerspace Masters India Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="/admin" className="text-neutral-300 hover:text-white transition">
              Admin Portal
            </a>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400">Privacy & Terms</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
