import { useNav } from "../context"

const pageTitles: Record<string, { label: string; emoji: string }> = {
  "landing": { label: "Beranda", emoji: "🏠" },
  "asprak": { label: "Asisten Praktikum", emoji: "👥" },
  "materials": { label: "Materi & Rangkuman", emoji: "⭐" },
  "quiz": { label: "Latihan Soal", emoji: "🧠" },
  "fotobooth": { label: "Mini Fotobooth", emoji: "📸" },
}

interface Props {
  onMenuClick: () => void
}

export default function Topbar({ onMenuClick }: Props) {
  const { page } = useNav()
  const pageInfo = pageTitles[page] ?? { label: "Praktikum Basdat", emoji: "📚" }

  return (
    <header
      className="fixed top-0 right-0 left-0 lg:left-64 z-30 h-16 flex items-center px-4 lg:px-6 gap-4"
      style={{
        background: "#FFE033",
        borderBottom: "3.5px solid #0a0a0a",
        boxShadow: "0 3px 0 #0a0a0a",
      }}
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg font-black text-xl"
        style={{ background: "#0a0a0a", color: "#FFE033", border: "2px solid #0a0a0a" }}
      >
        ☰
      </button>

      {/* Page title */}
      <h1
        className="flex-1 flex items-center gap-2"
        style={{ fontFamily: "'Bangers', cursive", fontSize: "1.35rem", letterSpacing: "0.05em", color: "#0a0a0a" }}
      >
        <span>{pageInfo.emoji}</span>
        <span>{pageInfo.label.toUpperCase()}</span>
      </h1>
    </header>
  )
}
