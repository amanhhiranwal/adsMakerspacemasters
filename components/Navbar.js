import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS, ROTATING_WORDS } from "@/data/content";

export default function Navbar({ onOpenModal }) {
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
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

  const currentHighlight = ROTATING_WORDS[rotatingIndex];

  return (
    <>
      {/* Top Ambient Ticker in Base #042741 */}
      <div className="bg-[#042741] text-neutral-200 py-2 px-4 text-center text-xs font-medium flex items-center justify-center gap-2 border-b border-[#2b5473]/30 relative z-50">
        <span className="hidden sm:inline text-neutral-300">Transforming K-12 & Higher Ed into Innovation Hubs for</span>
        <span className="sm:hidden text-neutral-300">Labs built for</span>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-all duration-500 ${currentHighlight.color}`}
        >
          {currentHighlight.text}
        </span>
      </div>

      {/* Main Apple-Inspired Floating Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/85 backdrop-blur-2xl border-b border-[#042741]/10 shadow-sm py-3"
            : "bg-white/70 backdrop-blur-xl py-4 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <img
              src="/images/common/mainLogo.svg"
              alt="Makerspace Masters"
              className="h-9 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
            />
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-neutral-700 uppercase tracking-wider font-['Montserrat',sans-serif]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#042741] transition-colors duration-200 cursor-pointer relative py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button with Brand Gradient */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenModal}
              className="px-5 py-2.5 bg-gradient-to-r from-[#042741] via-[#2b5473] to-[#4f7c9f] hover:opacity-95 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:scale-102 flex items-center gap-2 cursor-pointer font-['Montserrat',sans-serif]"
            >
              <span>Book Demo</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9F2B6]" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenModal}
              className="px-3.5 py-1.5 bg-gradient-to-r from-[#042741] to-[#2b5473] text-white rounded-full text-xs font-bold font-['Montserrat',sans-serif]"
            >
              Demo
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-[#042741] hover:bg-neutral-100 transition"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[88px] z-30 bg-white/95 backdrop-blur-2xl lg:hidden p-6 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4 text-base font-semibold text-[#042741] font-['Montserrat',sans-serif]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-3 border-b border-neutral-100 hover:text-[#2b5473] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </a>
            ))}

            <div className="pt-4">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenModal();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-[#042741] via-[#2b5473] to-[#4f7c9f] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Book Campus Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#C9F2B6]" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
