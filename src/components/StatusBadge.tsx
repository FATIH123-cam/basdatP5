interface Props {
  status: string
  size?: "sm" | "md"
}

interface ComicBadgeConfig {
  label: string
  emoji: string
  bg: string
  color: string
}

const configs: Record<string, ComicBadgeConfig> = {
  hadir: {
    label: "HADIR",
    emoji: "✅",
    bg: "#22C55E",
    color: "#ffffff",
  },
  "tidak-hadir": {
    label: "TIDAK HADIR",
    emoji: "❌",
    bg: "#E8212A",
    color: "#ffffff",
  },
  "menunggu-verifikasi": {
    label: "MENUNGGU",
    emoji: "⏳",
    bg: "#F97316",
    color: "#ffffff",
  },
  "belum-submit": {
    label: "BELUM SUBMIT",
    emoji: "📭",
    bg: "#FFE033",
    color: "#0a0a0a",
  },
  belum: {
    label: "BELUM",
    emoji: "🔘",
    bg: "#e2e8f0",
    color: "#0a0a0a",
  },
  ditolak: {
    label: "DITOLAK",
    emoji: "🚫",
    bg: "#E8212A",
    color: "#ffffff",
  },
  "kirim-ulang": {
    label: "KIRIM ULANG",
    emoji: "🔁",
    bg: "#F97316",
    color: "#ffffff",
  },
  terkirim: {
    label: "TERKIRIM",
    emoji: "📨",
    bg: "#1B72D4",
    color: "#ffffff",
  },
  Mudah: {
    label: "MUDAH",
    emoji: "😊",
    bg: "#22C55E",
    color: "#ffffff",
  },
  Sedang: {
    label: "SEDANG",
    emoji: "😐",
    bg: "#F97316",
    color: "#ffffff",
  },
  Sulit: {
    label: "SULIT",
    emoji: "😰",
    bg: "#E8212A",
    color: "#ffffff",
  },
}

export default function StatusBadge({ status, size = "sm" }: Props) {
  const cfg = configs[status] ?? {
    label: status.toUpperCase(),
    emoji: "🔘",
    bg: "#e2e8f0",
    color: "#0a0a0a",
  }

  const fontSize = size === "sm" ? "0.68rem" : "0.8rem"
  const padding = size === "sm" ? "2px 8px" : "4px 12px"

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        background: cfg.bg,
        color: cfg.color,
        border: "2px solid #0a0a0a",
        borderRadius: "6px",
        boxShadow: "2px 2px 0 #0a0a0a",
        fontFamily: "'Bangers', cursive",
        letterSpacing: "0.05em",
        fontSize,
        padding,
        whiteSpace: "nowrap",
        fontWeight: "normal",
      }}
    >
      <span>{cfg.emoji}</span>
      <span>{cfg.label}</span>
    </span>
  )
}
