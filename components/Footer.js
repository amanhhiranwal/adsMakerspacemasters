import { ArrowRight, Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Footer({ onOpenModal }) {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else onOpenModal();
  };

  return (
    <footer className="bg-[#131313] text-white pt-20 pb-12 border-t border-neutral-800 font-['Work_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Big CTA Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 p-10 md:p-14 mb-20 text-center flex flex-col items-center justify-center overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#FE9F99]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#C9F2B6]/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Montserrat',sans-serif] text-white mb-4 relative z-10">
            Ready to Build Your Space?
          </h2>
          <p className="text-neutral-300 max-w-2xl text-base md:text-lg mb-8 relative z-10 leading-relaxed">
            Let's design a future-ready innovation lab tailored to your school's vision, learners, and campus space.
          </p>
          <button
            onClick={handleScrollToContact}
            className="px-8 py-4 bg-white hover:bg-neutral-100 text-neutral-950 font-bold rounded-2xl transition-all shadow-lg hover:shadow-2xl hover:scale-105 flex items-center gap-3 relative z-10 text-base cursor-pointer"
          >
            Let's Build Your Space
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="inline-block cursor-pointer"
            >
              <img
                src="/images/common/mainLogo.svg"
                alt="Makerspace Masters"
                className="h-10 w-auto invert brightness-0 invert-100"
              />
            </a>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Makerspace Masters is a global innovation lab design and enablement organization empowering schools, colleges, and communities through experiential learning and real-world making.
            </p>
            <div className="flex items-center gap-4 text-neutral-400 text-sm">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C9F2B6]" />
                <span>India • USA • Singapore</span>
              </div>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h4 className="font-bold text-base font-['Montserrat',sans-serif] text-white mb-4">
              Divisions & Labs
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <a
                  href="#solutions"
                  onClick={(e) => handleNavClick(e, "#solutions")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Makerspace Masters (Schools)
                </a>
              </li>
              <li>
                <a
                  href="#solutions"
                  onClick={(e) => handleNavClick(e, "#solutions")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Masters X (Higher Ed)
                </a>
              </li>
              <li>
                <a
                  href="#solutions"
                  onClick={(e) => handleNavClick(e, "#solutions")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Masters + (Partnerships)
                </a>
              </li>
              <li>
                <a
                  href="#modules"
                  onClick={(e) => handleNavClick(e, "#modules")}
                  className="hover:text-white transition cursor-pointer"
                >
                  18+ Lab Modules
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="font-bold text-base font-['Montserrat',sans-serif] text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <a
                  href="#stats"
                  onClick={(e) => handleNavClick(e, "#stats")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Our Impact
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => handleNavClick(e, "#testimonials")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleNavClick(e, "#faq")}
                  className="hover:text-white transition cursor-pointer"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Book Campus Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Locations */}
          <div>
            <h4 className="font-bold text-base font-['Montserrat',sans-serif] text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#FE9F99] shrink-0 mt-1" />
                <span>1800 547 7600 (Toll Free)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C9F2B6] shrink-0 mt-1" />
                <span>hello@makerspacemasters.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ABBCFE] shrink-0 mt-1" />
                <span>Sheridan, WY, USA • New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-neutral-800 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Makerspace Masters India Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">Single Page Ad Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
