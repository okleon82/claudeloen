export default function SectionCard({
  index,
  label,
  dark = false,
  className = "",
  children,
}: {
  index: string;
  label: string;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`flex flex-col rounded-2xl border p-6 ${
        dark ? "border-black bg-[#0d0d0d] text-white" : "border-black/10 bg-white text-[#0b0b0b]"
      } ${className}`}
    >
      <div className={`mb-4 flex items-center gap-2 text-xs font-medium ${dark ? "text-white/60" : "text-[#898781]"}`}>
        <span>{index}</span>
        <span>{label}</span>
      </div>
      {children}
    </section>
  );
}
