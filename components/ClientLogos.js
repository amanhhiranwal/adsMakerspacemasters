export default function ClientLogos({ images = [] }) {
  // Fallback logo list
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

  const boardTags = [
    { label: "CBSE", color: "bg-[#FE9F99]/20 text-rose-950 border-[#FE9F99]/50" },
    { label: "ICSE", color: "bg-[#C9F2B6]/40 text-emerald-950 border-[#C9F2B6]/60" },
    { label: "IB World Schools", color: "bg-[#ABBCFE]/35 text-indigo-950 border-[#ABBCFE]/60" },
    { label: "Cambridge International", color: "bg-amber-100 text-amber-950 border-amber-300" },
    { label: "Technical Universities", color: "bg-purple-100 text-purple-950 border-purple-300" },
  ];

  return (
    <section className="py-16 bg-[#FAFAFA] overflow-hidden relative">
      
      {/* Top Trust Header & Colorful Boards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/5 text-neutral-800 text-xs font-bold uppercase tracking-wider font-['Montserrat',sans-serif] mb-4">
          <span>Trusted by 250+ Premier Campuses Across India</span>
        </div>

        {/* Colorful Educational Affiliation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
          {boardTags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-3.5 py-1 rounded-full text-xs font-bold border transition-transform duration-200 hover:scale-105 font-['Montserrat',sans-serif] shadow-2xs ${tag.color}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* Borderless, Shadowless, Full-Color Smooth Infinite Logo Track */}
      <div className="relative w-full flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex shrink-0 items-center gap-10 sm:gap-14 py-3 animate-[marquee_30s_linear_infinite]">
          {displayImages.map((imgName, idx) => (
            <div
              key={`logo-1-${idx}`}
              className="h-16 w-32 sm:h-20 sm:w-40 flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              <img
                src={`/images/client/${imgName}`}
                alt="Partner Institution Logo"
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Duplicate track for seamless infinite scroll */}
        <div className="flex shrink-0 items-center gap-10 sm:gap-14 py-3 animate-[marquee_30s_linear_infinite]" aria-hidden="true">
          {displayImages.map((imgName, idx) => (
            <div
              key={`logo-2-${idx}`}
              className="h-16 w-32 sm:h-20 sm:w-40 flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              <img
                src={`/images/client/${imgName}`}
                alt="Partner Institution Logo"
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
