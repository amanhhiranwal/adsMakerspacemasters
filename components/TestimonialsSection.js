import { useState, useEffect } from "react";
import { Quote, Star } from "lucide-react";

export default function TestimonialsSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Leaders.", "Educators.", "Communities.", "Institutions."];

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: "Dr. Ananya Sharma",
      role: "Director of Academics",
      school: "Heritage Global School, Gurugram",
      quote:
        "The makerspace designed by Makerspace Masters transformed our campus culture. Students who were once passive listeners in science class are now building functional autonomous robots and designing sustainable prototypes.",
      rating: 5,
    },
    {
      name: "Rajesh Kulkarni",
      role: "Principal & Trustee",
      school: "Oakridge International Campus, Bangalore",
      quote:
        "The end-to-end enablement was seamless. From the heavy carpentry safety setups to the AI neural network kits and dedicated teacher masterclasses, our teachers felt completely empowered from day one.",
      rating: 5,
    },
    {
      name: "Meera Subramaniam",
      role: "Head of STEM & Innovation",
      school: "Indus Valley World School, Hyderabad",
      quote:
        "Our students competed in national robotics championships within 6 months of setting up the lab. The NEP 2020 curriculum alignment made integration into our daily timetable effortless.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white text-neutral-900 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-600 mb-3">
            Institutional Impact
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Montserrat',sans-serif] tracking-tight">
            Trusted by{" "}
            <span className="inline-block text-[#131313] underline decoration-[#FE9F99] underline-offset-8 transition-all duration-300">
              {words[wordIndex]}
            </span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-4 font-['Work_Sans',sans-serif]">
            Hear what visionary education leaders and innovation heads have to say about partnering with us.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#F8F9FA] rounded-3xl p-8 border border-neutral-200/80 shadow-xs flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-neutral-300 mb-3" />
                <p className="text-neutral-700 text-sm md:text-base leading-relaxed font-['Work_Sans',sans-serif] mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <div className="font-bold text-neutral-900 font-['Montserrat',sans-serif]">
                  {t.name}
                </div>
                <div className="text-xs text-neutral-500 font-['Work_Sans',sans-serif]">
                  {t.role} • <span className="text-neutral-700 font-medium">{t.school}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
