interface Props {
  label: string
  value: string | number
  sub?: string
  icon: React.ReactNode
  accent?: string
  onClick?: () => void
  emoji?: string
}

// Comic accent color maps
const accentMap: Record<string, { bg: string; fg: string }> = {
  "bg-indigo-50 text-indigo-600":  { bg: "#1B72D4", fg: "#fffdf5" },
  "bg-emerald-50 text-emerald-600": { bg: "#22C55E", fg: "#fffdf5" },
  "bg-violet-50 text-violet-600":  { bg: "#7C3AED", fg: "#fffdf5" },
  "bg-amber-50 text-amber-600":    { bg: "#F97316", fg: "#fffdf5" },
  "bg-rose-50 text-rose-600":      { bg: "#E8212A", fg: "#fffdf5" },
}

export default function StatCard({
  label,
  value,
  sub,
  icon,
  accent = "bg-indigo-50 text-indigo-600",
  onClick,
}: Props) {
  const colors = accentMap[accent] ?? { bg: "#1B72D4", fg: "#fffdf5" }

  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-4 p-5 rounded-xl comic-card ${
        onClick ? "cursor-pointer" : ""
      }`}
      style={{
        background: "#fffdf5",
        border: "3px solid #0a0a0a",
        boxShadow: "4px 4px 0 #0a0a0a",
        transition: "transform 0.1s, box-shadow 0.1s",
      }}
      onMouseEnter={onClick ? (e) => {
        e.currentTarget.style.transform = "translate(-2px,-2px)"
        e.currentTarget.style.boxShadow = "6px 6px 0 #0a0a0a"
      } : undefined}
      onMouseLeave={onClick ? (e) => {
        e.currentTarget.style.transform = ""
        e.currentTarget.style.boxShadow = "4px 4px 0 #0a0a0a"
      } : undefined}
    >
      {/* Icon Block */}
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: colors.bg,
          border: "2.5px solid #0a0a0a",
          boxShadow: "2px 2px 0 #0a0a0a",
          color: colors.fg,
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p
          className="text-xs font-black uppercase tracking-widest"
          style={{ color: "#555" }}
        >
          {label}
        </p>
        <p
          className="text-2xl leading-tight mt-0.5"
          style={{
            fontFamily: "'Bangers', cursive",
            letterSpacing: "0.05em",
            color: "#0a0a0a",
          }}
        >
          {value}
        </p>
        {sub && (
          <p className="text-xs font-bold mt-0.5" style={{ color: "#777" }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  )
}
