export interface HeaderTemplateConfig {
  id: string
  name: string
  category: string
  background: string
  gradient?: string
  pattern: "halftone" | "grid" | "dots" | "circuit" | "stripes" | "none"
  textColor: string
  accentColor: string
  borderColor: string
  tagline: string
  badgeEmoji: string
  stickerText: string
  customImageUrl?: string
}

export const PRESET_HEADER_TEMPLATES: HeaderTemplateConfig[] = [
  {
    id: "comic-yellow",
    name: "Comic Superhero",
    category: "Comic",
    background: "#FFE033",
    pattern: "halftone",
    textColor: "#0a0a0a",
    accentColor: "#E8212A",
    borderColor: "#0a0a0a",
    tagline: "⚡ Siap Menguasai Basis Data & Rebut Ranking #1! 💥",
    badgeEmoji: "🦸",
    stickerText: "POW! BASDAT HERO",
  },
  {
    id: "programmer-dark",
    name: "Dark Code IDE",
    category: "Programmer",
    background: "#0F172A",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
    pattern: "circuit",
    textColor: "#ffffff",
    accentColor: "#22C55E",
    borderColor: "#38BDF8",
    tagline: "SELECT * FROM knowledge WHERE understood = TRUE;",
    badgeEmoji: "💻",
    stickerText: "DEV // SQL_MASTER",
  },
  {
    id: "database-blue",
    name: "Database Architect",
    category: "Database",
    background: "#1B72D4",
    gradient: "linear-gradient(135deg, #1B72D4 0%, #0D9488 100%)",
    pattern: "grid",
    textColor: "#ffffff",
    accentColor: "#FFE033",
    borderColor: "#0a0a0a",
    tagline: "🗄️ Normalisasi 3NF Tanpa Kompromi!",
    badgeEmoji: "🗄️",
    stickerText: "SCHEMA WIZARD",
  },
  {
    id: "retro-wave",
    name: "Retro Synthwave",
    category: "Retro",
    background: "#4C1D95",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #be185d 50%, #ea580c 100%)",
    pattern: "grid",
    textColor: "#ffffff",
    accentColor: "#F43F5E",
    borderColor: "#F472B6",
    tagline: "🌴 80s Cyber Vibes & Query Aesthetics",
    badgeEmoji: "🕹️",
    stickerText: "NEON SYNTH 84",
  },
  {
    id: "scrapbook-warm",
    name: "Scrapbook Craft",
    category: "Scrapbook",
    background: "#FEF3C7",
    pattern: "dots",
    textColor: "#1C1917",
    accentColor: "#D97706",
    borderColor: "#0a0a0a",
    tagline: "✂️ Catatan praktikum penuh stiker & semangat!",
    badgeEmoji: "🎨",
    stickerText: "STICKER BOOK",
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    category: "Minimal",
    background: "#F8FAFC",
    pattern: "none",
    textColor: "#0F172A",
    accentColor: "#6366F1",
    borderColor: "#E2E8F0",
    tagline: "Fokus, presisi, dan konsisten di setiap pertemuan.",
    badgeEmoji: "✨",
    stickerText: "CLEAN FOCUS",
  },
  {
    id: "praktikum-lab",
    name: "Praktikum Lab UI",
    category: "Praktikum",
    background: "#1E293B",
    gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    pattern: "stripes",
    textColor: "#ffffff",
    accentColor: "#FFE033",
    borderColor: "#0a0a0a",
    tagline: "🏛️ Laboratorium Komputer Terpadu — P5",
    badgeEmoji: "🎓",
    stickerText: "LAB SQUAD P5",
  },
  {
    id: "abstract-mesh",
    name: "Abstract Gradient",
    category: "Abstract",
    background: "#7C3AED",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #3b82f6 100%)",
    pattern: "dots",
    textColor: "#ffffff",
    accentColor: "#FFE033",
    borderColor: "#0a0a0a",
    tagline: "🌌 Kreativitas tanpa batas di dunia database.",
    badgeEmoji: "🚀",
    stickerText: "FUTURE VISION",
  },
]

const STORAGE_KEY = "praktikan_profile_header_config_v2"

export function getProfileHeaderConfig(): HeaderTemplateConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.error("Failed to load profile header config", e)
  }
  return PRESET_HEADER_TEMPLATES[0]
}

export function saveProfileHeaderConfig(config: HeaderTemplateConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch (e) {
    console.error("Failed to save profile header config", e)
  }
}
