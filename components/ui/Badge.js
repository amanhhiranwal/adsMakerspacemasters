import { Sparkles } from "lucide-react";

export default function Badge({
  children,
  icon: Icon = Sparkles,
  variant = "brand",
  className = "",
}) {
  const variantStyles = {
    brand: "bg-[#042741] text-white border-transparent shadow-xs",
    brandGradient: "bg-gradient-to-r from-[#042741] via-[#2b5473] to-[#4f7c9f] text-white border-transparent shadow-xs",
    brandLight: "bg-[#042741]/10 text-[#042741] border-[#042741]/20",
    dark: "bg-[#042741] text-white border-transparent",
    light: "bg-black/5 text-neutral-800 border-transparent",
    coral: "bg-[#FE9F99]/20 text-rose-950 border-[#FE9F99]/40",
    mint: "bg-[#C9F2B6]/30 text-emerald-950 border-[#C9F2B6]/50",
    blue: "bg-[#4f7c9f]/20 text-[#042741] border-[#4f7c9f]/40",
  };

  const selectedVariant = variantStyles[variant] || variantStyles.brand;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border font-['Montserrat',sans-serif] ${selectedVariant} ${className}`}
    >
      {Icon && <Icon className="w-3 h-3" />}
      <span>{children}</span>
    </div>
  );
}
