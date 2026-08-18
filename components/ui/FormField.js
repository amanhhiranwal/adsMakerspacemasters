export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
  required = false,
  icon: Icon,
  options = [],
  rows = 2,
  className = "",
}) {
  const isSelect = type === "select";
  const isTextarea = type === "textarea";

  const baseInputClasses = `w-full px-3.5 py-2.5 pl-9 text-sm rounded-xl bg-white/75 backdrop-blur-xs border transition-all outline-none font-['Work_Sans',sans-serif] ${
    error
      ? "border-rose-400 focus:border-rose-500 bg-rose-50/50"
      : "border-[#042741]/15 focus:border-[#042741] focus:bg-white focus:ring-2 focus:ring-[#042741]/10"
  }`;

  return (
    <div className={className}>
      {label && (
        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#042741] mb-1 font-['Montserrat',sans-serif]">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative">
        {isSelect ? (
          <>
            <select
              name={name}
              value={value}
              onChange={onChange}
              className={`${baseInputClasses} appearance-none cursor-pointer ${
                !value ? "text-neutral-400" : "text-[#042741] font-medium"
              }`}
            >
              <option value="" disabled>
                {placeholder || "Select an option"}
              </option>
              {options.map((opt) => (
                <option key={opt.value || opt} value={opt.value || opt} className="text-[#042741]">
                  {opt.label || opt}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#042741]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </>
        ) : isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            className={`${baseInputClasses} resize-none`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={baseInputClasses}
          />
        )}

        {Icon && (
          <Icon className="w-4 h-4 text-[#2b5473] absolute left-3 top-3 pointer-events-none" />
        )}
      </div>

      {error && (
        <p className="text-[10px] text-rose-500 font-medium mt-1 animate-in fade-in duration-200">
          {error}
        </p>
      )}
    </div>
  );
}
