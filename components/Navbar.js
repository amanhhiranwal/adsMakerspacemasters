import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar({ onOpenModal }) {
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const rotatingWords = ["learners", "builders", "innovators"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#hero" },
    { label: "Impact", href: "#stats" },
    { label: "Divisions", href: "#solutions" },
    { label: "Lab Modules", href: "#modules" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQs", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

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

  return (
    <>
      {/* Top Banner Ticker */}
      <div className="bg-[#131313] text-white py-2 px-4 text-center text-xs md:text-sm font-medium flex items-center justify-center gap-1.5 overflow-hidden z-50 relative">
        <span>Designing future-ready innovation labs for</span>
        <span className="inline-block min-w-[75px] text-left font-bold text-[#C9F2B6] transition-all duration-300">
          {rotatingWords[rotatingIndex]}
        </span>
      </div>

      {/* Main Single Page Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100 py-3" : "bg-white/80 backdrop-blur-md py-4"
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
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
            />
          </a>

          {/* Desktop In-Page Anchor Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-neutral-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-black transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenModal}
              className="px-6 py-2.5 bg-[#131313] hover:bg-neutral-800 text-white rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:scale-102 flex items-center gap-2"
            >
              Book Your Demo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenModal}
              className="px-4 py-2 bg-[#131313] text-white rounded-full text-xs font-semibold"
            >
              Book Demo
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-neutral-800 hover:bg-neutral-100 transition"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Single Page Drawer Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-24 z-30 bg-white/95 backdrop-blur-xl lg:hidden p-6 overflow-y-auto">
          <nav className="flex flex-col gap-5 text-lg font-semibold text-neutral-800">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2 border-b border-neutral-100 hover:text-black"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-6">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenModal();
                }}
                className="w-full py-3.5 bg-[#131313] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                Book Your Demo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
