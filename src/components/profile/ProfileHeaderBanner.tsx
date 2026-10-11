import { HeaderTemplateConfig } from "../../data/profileHeaderTemplates"
import { currentStudent } from "../../data/mockData"

interface Props {
  config: HeaderTemplateConfig
  onOpenEdit: () => void
}

export default function ProfileHeaderBanner({ config, onOpenEdit }: Props) {
  // Pattern styles
  const getPatternBg = () => {
    switch (config.pattern) {
      case "halftone":
        return "radial-gradient(circle, rgba(0,0,0,0.15) 1.5px, transparent 1.5px)"
      case "grid":
        return "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)"
      case "dots":
        return "radial-gradient(circle, rgba(255,255,255,0.2) 2px, transparent 2px)"
      case "circuit":
        return "radial-gradient(circle, rgba(56,189,248,0.2) 1.5px, transparent 1.5px)"
      case "stripes":
        return "repeating-linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 10px, transparent 10px, transparent 20px)"
      default:
        return "none"
    }
  }

  return (
    <div
      className="relative rounded-3xl overflow-hidden mb-8 transition-all"
      style={{
        background: config.gradient || config.background,
        border: "4px solid #0a0a0a",
        boxShadow: "8px 8px 0 #0a0a0a",
        color: config.textColor,
      }}
    >
      {/* Background Custom Image if uploaded */}
      {config.customImageUrl && (
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <img
            src={config.customImageUrl}
            alt="Custom Header"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Background pattern overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: getPatternBg(),
          backgroundSize:
            config.pattern === "grid"
              ? "24px 24px"
              : config.pattern === "halftone"
                ? "14px 14px"
                : "18px 18px",
        }}
      />

      {/* Decorative Top-Right Corner Sticker */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <div
          className="px-3 py-1 rounded-lg text-xs font-black uppercase transform rotate-2 hidden sm:flex items-center gap-1.5 shadow"
          style={{
            background: config.accentColor,
            color: config.accentColor === "#FFE033" ? "#0a0a0a" : "#ffffff",
            border: "2px solid #0a0a0a",
            boxShadow: "2px 2px 0 #0a0a0a",
            fontFamily: "'Bangers', cursive",
            letterSpacing: "0.05em",
          }}
        >
          <span>{config.badgeEmoji}</span>
          <span>{config.stickerText}</span>
        </div>

        {/* Edit Header Button */}
        <button
          type="button"
          onClick={onOpenEdit}
          className="comic-btn text-xs py-2 px-4 shadow-md bg-white text-black active:scale-95"
          style={{
            border: "2.5px solid #0a0a0a",
            boxShadow: "3px 3px 0 #0a0a0a",
          }}
        >
          🎨 Edit Header
        </button>
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar badge with outline */}
        <div className="relative">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-black shadow-lg"
            style={{
              background: "#FFE033",
              color: "#0a0a0a",
              border: "3.5px solid #0a0a0a",
              boxShadow: "4px 4px 0 #0a0a0a",
              fontFamily: "'Bangers', cursive",
            }}
          >
            {currentStudent.avatar}
          </div>
          <div
            className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-xs font-black"
            style={{
              background: "#22C55E",
              color: "white",
              border: "2px solid #0a0a0a",
              boxShadow: "2px 2px 0 #0a0a0a",
              fontFamily: "'Bangers', cursive",
            }}
          >
            ONLINE
          </div>
        </div>

        {/* Student Info */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded text-xs font-black uppercase"
              style={{
                background: "rgba(0,0,0,0.6)",
                color: "#FFE033",
                border: "1.5px solid rgba(255,255,255,0.3)",
                fontFamily: "'Bangers', cursive",
              }}
            >
              🎓 MAHASISWA PRAKTIKUM
            </span>
            <span
              className="px-2.5 py-0.5 rounded text-xs font-bold"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: config.textColor,
              }}
            >
              {currentStudent.kelas}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-black leading-tight tracking-tight uppercase"
            style={{
              fontFamily: "'Bangers', cursive",
              textShadow:
                config.textColor === "#ffffff"
                  ? "2px 2px 0 #0a0a0a"
                  : "none",
            }}
          >
            {currentStudent.name}
          </h2>

          <p className="text-sm font-bold opacity-90">
            NIM: {currentStudent.nim} · {currentStudent.email}
          </p>

          <p
            className="text-xs sm:text-sm font-bold pt-1 inline-block"
            style={{
              color: config.accentColor === config.background ? "#FFE033" : config.accentColor,
            }}
          >
            {config.tagline}
          </p>
        </div>
      </div>
    </div>
  )
}
