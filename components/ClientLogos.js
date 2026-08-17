export default function ClientLogos({ images = [] }) {
  // Fallback logo list if none passed via props
  const displayImages = images.length > 0 ? images.slice(0, 30) : [
    "Asset 101@2x.png",
    "Asset 102@2x.png",
    "Asset 103@2x.png",
    "Asset 105@2x.png",
    "Asset 106@2x.png",
    "Asset 107@2x.png",
    "Asset 108@2x.png",
    "Asset 109@2x.png",
    "Asset 110@2x.png",
    "Asset 111@2x.png",
    "Asset 112@2x.png",
    "Asset 113@2x.png",
    "Asset 114@2x.png",
    "Asset 115@2x.png",
    "Asset 116@2x.png",
  ];

  return (
    <section className="py-16 bg-[#FAFAFA] border-b border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-neutral-400 font-['Montserrat',sans-serif]">
          Trusted by 250+ Leading Schools & Educational Institutions Across India & Globally
        </p>
      </div>

      {/* Infinite Scrolling Logo Marquee */}
      <div className="relative w-full flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 items-center gap-12 py-4 animate-[marquee_35s_linear_infinite]">
          {displayImages.map((imgName, idx) => (
            <div
              key={`logo-1-${idx}`}
              className="w-36 h-16 sm:w-44 sm:h-20 bg-white rounded-2xl p-3 shadow-xs border border-neutral-200/60 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
            >
              <img
                src={`/images/client/${imgName}`}
                alt="Partner School Logo"
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Duplicate track for seamless infinite scroll */}
        <div className="flex shrink-0 items-center gap-12 py-4 animate-[marquee_35s_linear_infinite]" aria-hidden="true">
          {displayImages.map((imgName, idx) => (
            <div
              key={`logo-2-${idx}`}
              className="w-36 h-16 sm:w-44 sm:h-20 bg-white rounded-2xl p-3 shadow-xs border border-neutral-200/60 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
            >
              <img
                src={`/images/client/${imgName}`}
                alt="Partner School Logo"
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
