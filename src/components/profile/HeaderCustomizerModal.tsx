import { useState } from "react"
import {
  HeaderTemplateConfig,
  PRESET_HEADER_TEMPLATES,
} from "../../data/profileHeaderTemplates"

interface Props {
  open: boolean
  onClose: () => void
  currentConfig: HeaderTemplateConfig
  onSave: (config: HeaderTemplateConfig) => void
}

type TabKey = "templates" | "upload" | "colors" | "decorations"

export default function HeaderCustomizerModal({
  open,
  onClose,
  currentConfig,
  onSave,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("templates")
  const [draft, setDraft] = useState<HeaderTemplateConfig>({ ...currentConfig })
  const [imagePreview, setImagePreview] = useState<string | null>(
    currentConfig.customImageUrl || null,
  )

  if (!open) return null

  const handleSelectTemplate = (tpl: HeaderTemplateConfig) => {
    setDraft({
      ...tpl,
      customImageUrl: draft.customImageUrl,
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      const url = ev.target?.result as string
      setImagePreview(url)
      setDraft((prev) => ({ ...prev, customImageUrl: url }))
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveUploadedImage = () => {
    setImagePreview(null)
    setDraft((prev) => ({ ...prev, customImageUrl: undefined }))
  }

  const handleSaveAndClose = () => {
    onSave(draft)
    onClose()
  }

  const colorPresets = [
    { label: "Kuning Komik", bg: "#FFE033", fg: "#0a0a0a" },
    { label: "Biru Database", bg: "#1B72D4", fg: "#ffffff" },
    { label: "Merah Hero", bg: "#E8212A", fg: "#ffffff" },
    { label: "Hijau Sukses", bg: "#16A34A", fg: "#ffffff" },
    { label: "Ungu Synth", bg: "#7C3AED", fg: "#ffffff" },
    { label: "Dark IDE", bg: "#0F172A", fg: "#ffffff" },
    { label: "Krem Scrapbook", bg: "#FEF3C7", fg: "#1C1917" },
    { label: "Abu Minimal", bg: "#F1F5F9", fg: "#0F172A" },
  ]

  const patternPresets: { id: HeaderTemplateConfig["pattern"]; label: string }[] = [
    { id: "halftone", label: "Halftone Dots (Komik)" },
    { id: "grid", label: "Blueprint Grid" },
    { id: "dots", label: "Dot Matrix" },
    { id: "circuit", label: "Circuit Board" },
    { id: "stripes", label: "Diagonal Stripes" },
    { id: "none", label: "Polos (Tanpa Pola)" },
  ]

  const emojiStickers = ["🦸", "💻", "🗄️", "🕹️", "🎨", "✨", "🎓", "🚀", "⚡", "🔥", "🏆", "📸"]

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full p-6 rounded-3xl bg-[#fffdf5] max-h-[92vh] flex flex-col"
        style={{
          border: "5px solid #0a0a0a",
          boxShadow: "10px 10px 0 #0a0a0a",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black/15">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <h3
              className="text-2xl font-black uppercase text-[#0a0a0a]"
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
            >
              CUSTOM HEADER PROFIL
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="comic-btn text-xs py-1.5 px-3 bg-red-500 text-white"
          >
            ✕ TUTUP
          </button>
        </div>

        {/* Live Mini Preview */}
        <div className="mt-4 p-4 rounded-2xl bg-white border-2 border-black">
          <p
            className="text-xs font-black uppercase text-slate-500 mb-2"
            style={{ fontFamily: "'Bangers', cursive" }}
          >
            LIVE PREVIEW BANNER:
          </p>
          <div
            className="rounded-xl p-4 flex items-center justify-between overflow-hidden relative"
            style={{
              background: draft.gradient || draft.background,
              color: draft.textColor,
              border: "2.5px solid #0a0a0a",
            }}
          >
            {draft.customImageUrl && (
              <img
                src={draft.customImageUrl}
                alt="Uploaded banner"
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
              />
            )}
            <div className="relative z-10">
              <span className="text-xs font-black uppercase px-2 py-0.5 rounded bg-black/60 text-[#FFE033] inline-block mb-1">
                {draft.category} · {draft.name}
              </span>
              <p
                className="text-xl font-black uppercase leading-tight"
                style={{ fontFamily: "'Bangers', cursive" }}
              >
                Budi Santoso (2201102034)
              </p>
              <p className="text-xs font-bold opacity-90 mt-0.5">
                {draft.tagline}
              </p>
            </div>

            <div
              className="relative z-10 px-2.5 py-1 rounded text-xs font-black uppercase hidden sm:block"
              style={{
                background: draft.accentColor,
                color: draft.accentColor === "#FFE033" ? "#0a0a0a" : "#fff",
                border: "1.5px solid #0a0a0a",
                fontFamily: "'Bangers', cursive",
              }}
            >
              {draft.badgeEmoji} {draft.stickerText}
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 mt-4 border-b-2 border-black/15 pb-2 overflow-x-auto">
          {[
            { id: "templates", label: "1. Template Preset", emoji: "⭐" },
            { id: "upload", label: "2. Upload Gambar", emoji: "📁" },
            { id: "colors", label: "3. Warna & Pola", emoji: "🌈" },
            { id: "decorations", label: "4. Stiker & Tagline", emoji: "⚡" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TabKey)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-black text-[#FFE033] border-2 border-black shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
            >
              <span>{tab.emoji}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* TAB 1: TEMPLATES */}
          {activeTab === "templates" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRESET_HEADER_TEMPLATES.map((tpl) => {
                const isSelected = draft.id === tpl.id
                return (
                  <div
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all duration-150 border-2 ${
                      isSelected
                        ? "ring-4 ring-emerald-500 scale-[1.02] shadow-md border-black"
                        : "border-black/30 hover:border-black"
                    }`}
                    style={{
                      background: tpl.gradient || tpl.background,
                      color: tpl.textColor,
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black uppercase px-2 py-0.5 rounded bg-black/60 text-[#FFE033]">
                        {tpl.category}
                      </span>
                      <span className="text-lg">{tpl.badgeEmoji}</span>
                    </div>
                    <h5
                      className="text-lg font-black uppercase"
                      style={{ fontFamily: "'Bangers', cursive" }}
                    >
                      {tpl.name}
                    </h5>
                    <p className="text-[11px] font-bold opacity-80 truncate">
                      {tpl.tagline}
                    </p>
                  </div>
                )
              })}
            </div>
          )}

          {/* TAB 2: UPLOAD */}
          {activeTab === "upload" && (
            <div className="space-y-4 p-2">
              <div
                className="p-6 rounded-2xl border-2 border-dashed border-black text-center bg-white"
              >
                <div className="text-4xl mb-2">📁🖼️</div>
                <h5
                  className="text-lg font-black uppercase text-[#0a0a0a]"
                  style={{ fontFamily: "'Bangers', cursive" }}
                >
                  UPLOAD FOTO ATAU BANNER KAMU
                </h5>
                <p className="text-xs font-bold text-slate-600 max-w-sm mx-auto mb-4">
                  Pilih file gambar dari komputermu (JPG/PNG) untuk dijadikan background banner header.
                </p>

                <label className="comic-btn comic-btn-primary text-xs py-2 px-5 cursor-pointer">
                  <span>Pilih File Gambar 📁</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {imagePreview && (
                <div className="p-3 bg-white rounded-xl border border-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={imagePreview}
                      alt="Thumbnail"
                      className="w-12 h-12 object-cover rounded-lg border border-black"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Gambar Kustom Terpasang
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Akan di-blend dengan tema warna pilihanmu.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveUploadedImage}
                    className="comic-btn text-xs py-1 px-3 bg-red-500 text-white"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: COLORS & PATTERNS */}
          {activeTab === "colors" && (
            <div className="space-y-5 p-2">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                  🎨 PILIH WARNA DASAR:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorPresets.map((c) => (
                    <button
                      key={c.bg}
                      type="button"
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          background: c.bg,
                          gradient: undefined,
                          textColor: c.fg,
                        }))
                      }
                      className="p-2.5 rounded-xl border-2 border-black text-xs font-bold flex items-center justify-center shadow-sm"
                      style={{ background: c.bg, color: c.fg }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                  ✨ POLA OVERLAY:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {patternPresets.map((pat) => (
                    <button
                      key={pat.id}
                      type="button"
                      onClick={() =>
                        setDraft((prev) => ({ ...prev, pattern: pat.id }))
                      }
                      className={`p-2.5 rounded-xl text-xs font-bold border-2 ${
                        draft.pattern === pat.id
                          ? "bg-black text-[#FFE033] border-black font-black"
                          : "bg-white text-slate-800 border-slate-300"
                      }`}
                    >
                      {pat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DECORATIONS & TAGLINE */}
          {activeTab === "decorations" && (
            <div className="space-y-4 p-2">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                  ⚡ CUSTOM TAGLINE / SLOGAN:
                </label>
                <input
                  type="text"
                  value={draft.tagline}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, tagline: e.target.value }))
                  }
                  placeholder="Tuliskan motto praktikummu..."
                  className="w-full px-4 py-2.5 text-sm font-bold border-2 border-black rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                  🏷️ TEKS STIKER:
                </label>
                <input
                  type="text"
                  value={draft.stickerText}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      stickerText: e.target.value,
                    }))
                  }
                  placeholder="Contoh: POW! BASDAT HERO"
                  className="w-full px-4 py-2.5 text-sm font-bold border-2 border-black rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                  ⭐ PILIH IKON STIKER:
                </label>
                <div className="flex flex-wrap gap-2">
                  {emojiStickers.map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() =>
                        setDraft((prev) => ({ ...prev, badgeEmoji: em }))
                      }
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border-2 ${
                        draft.badgeEmoji === em
                          ? "bg-[#FFE033] border-black scale-110 shadow-md"
                          : "bg-white border-slate-300 hover:border-black"
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="mt-4 pt-4 border-t-2 border-black flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="comic-btn comic-btn-white text-xs py-2.5 px-4"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleSaveAndClose}
            className="comic-btn comic-btn-primary text-sm py-2.5 px-6 animate-pulse"
          >
            💾 Simpan Header Profil
          </button>
        </div>
      </div>
    </div>
  )
}
