import Badge from "./Badge";

export default function SectionHeader({
  badgeText,
  badgeIcon,
  badgeVariant = "brandLight",
  title,
  gradientTitle,
  subtitle,
  centered = true,
  className = "",
}) {
  return (
    <div
      className={`mb-14 ${
        centered ? "text-center max-w-3xl mx-auto" : "max-w-3xl text-left"
      } ${className}`}
    >
      {badgeText && (
        <div className="mb-4">
          <Badge icon={badgeIcon} variant={badgeVariant}>
            {badgeText}
          </Badge>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Montserrat',sans-serif] tracking-tight text-[#042741] leading-tight">
        {title}{" "}
        {gradientTitle && (
          <span className="text-gradient-brand">{gradientTitle}</span>
        )}
      </h2>

      {subtitle && (
        <p className="text-neutral-600 text-base sm:text-lg mt-3 font-['Work_Sans',sans-serif] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
