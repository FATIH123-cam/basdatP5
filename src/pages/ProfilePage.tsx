import { useState } from "react"
import { useNav } from "../context"
import { currentStudent } from "../data/mockData"
import AppLayout from "../components/AppLayout"

const headerThemes = [
  { id: "yellow", name: "Komik Kuning", bg: "#FFE033", text: "#0a0a0a", accent: "#E8212A" },
  { id: "dark", name: "Gelap Elegan", bg: "#0a0a0a", text: "#FFE033", accent: "#18B5D8" },
  { id: "blue", name: "Biru Langit", bg: "#1B72D4", text: "#fff", accent: "#FFE033" },
  { id: "green", name: "Hijau Segar", bg: "#22C55E", text: "#fff", accent: "#FFE033" },
  { id: "red", name: "Merah Api", bg: "#E8212A", text: "#fff", accent: "#FFE033" },
  { id: "purple", name: "Ungu Galaksi", bg: "#7C3AED", text: "#fff", accent: "#FFE033" },
  { id: "cyan", name: "Cyan Neon", bg: "#18B5D8", text: "#0a0a0a", accent: "#E8212A" },
  { id: "orange", name: "Oranye Kreatif", bg: "#F97316", text: "#fff", accent: "#0a0a0a" },
]

export default function ProfilePage() {
  const { navigate } = useNav()
  const [selectedTheme, setSelectedTheme] = useState(headerThemes[0])
  const [showThemePicker, setShowThemePicker] = useState(false)
  const [bio, setBio] = useState("Mahasiswa Teknik Informatika yang suka ngulik database! 🗄️")
  const [editing, setEditing] = useState(false)

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Custom Header Banner */}
        <div
          className="relative p-6 rounded-2xl overflow-hidden"
          style={{
            background: selectedTheme.bg,
            border: "4px solid #0a0a0a",
            boxShadow: "6px 6px 0 #0a0a0a",
          }}
        >
          {/* Decorative */}
          <div
            className="absolute top-4 right-4 text-5xl opacity-20 select-none"
            style={{ fontFamily: "'Bangers', cursive", color: selectedTheme.text, transform: "rotate(10deg)" }}
          >
            POW!
          </div>

          <div className="flex items-center gap-5 relative z-10">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black shrink-0"
              style={{
                background: selectedTheme.accent,
                border: "4px solid #0a0a0a",
                color: selectedTheme.bg === "#FFE033" ? "#0a0a0a" : "#0a0a0a",
              }}
            >
              {currentStudent.avatar}
            </div>
            <div>
              <div
                className="inline-block px-2 py-0.5 text-xs font-black mb-1 rounded"
                style={{
                  background: selectedTheme.accent,
                  color: "#0a0a0a",
                  border: "2px solid #0a0a0a",
                  fontFamily: "'Bangers', cursive",
                }}
              >
                PROFIL PRAKTIKAN
              </div>
              <h2
                className="text-2xl md:text-3xl"
                style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em", color: selectedTheme.text }}
              >
                {currentStudent.name}
              </h2>
              <p className="font-bold text-sm" style={{ color: selectedTheme.text + "cc" }}>
                {currentStudent.nim} · {currentStudent.kelas}
              </p>
            </div>
          </div>

          <button
            className="mt-4 comic-btn text-xs px-3 py-1.5 relative z-10"
            style={{ background: selectedTheme.accent, color: "#0a0a0a" }}
            onClick={() => setShowThemePicker(!showThemePicker)}
          >
            🎨 Ganti Tema Header
          </button>
        </div>

        {/* Theme Picker */}
        {showThemePicker && (
          <div
            className="p-5 rounded-2xl animate-comic-pop"
            style={{ border: "4px solid #0a0a0a", background: "#fffdf5", boxShadow: "5px 5px 0 #0a0a0a" }}
          >
            <h3 className="font-black mb-4" style={{ fontFamily: "'Bangers', cursive", fontSize: "1.2rem" }}>
              🎨 PILIH TEMA
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {headerThemes.map((t) => (
                <button
                  key={t.id}
                  className="p-3 rounded-xl flex flex-col items-center gap-2"
                  style={{
                    background: t.bg,
                    border: selectedTheme.id === t.id ? "4px solid #22C55E" : "3px solid #0a0a0a",
                    boxShadow: selectedTheme.id === t.id ? "3px 3px 0 #22C55E" : "2px 2px 0 #0a0a0a",
                  }}
                  onClick={() => { setSelectedTheme(t); setShowThemePicker(false) }}
                >
                  <span style={{ color: t.text, fontFamily: "'Bangers', cursive", fontSize: "0.7rem", fontWeight: 900 }}>
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Profile Info */}
        <div className="comic-panel">
          <div className="comic-panel-header">👤 INFORMASI PROFIL</div>
          <div className="p-5 space-y-4">
            {[
              { label: "Nama Lengkap", value: currentStudent.name, icon: "📛" },
              { label: "NIM", value: currentStudent.nim, icon: "🪪" },
              { label: "Email", value: currentStudent.email, icon: "📧" },
              { label: "Kelas", value: currentStudent.kelas, icon: "🏫" },
              { label: "Jurusan", value: currentStudent.jurusan, icon: "🎓" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="text-xs font-bold text-[#0a0a0a]/50">{item.label}</p>
                  <p className="font-black text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="comic-panel">
          <div className="comic-panel-header flex items-center justify-between">
            <span>✏️ BIO</span>
            <button
              className="text-sm font-black text-[#FFE033]"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "✅ Simpan" : "✏️ Edit"}
            </button>
          </div>
          <div className="p-5">
            {editing ? (
              <textarea
                className="w-full p-3 text-sm font-bold rounded-xl resize-none"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{ border: "2.5px solid #0a0a0a" }}
              />
            ) : (
              <p className="font-bold text-sm">{bio}</p>
            )}
          </div>
        </div>

        <button className="comic-btn comic-btn-white" onClick={() => navigate("student-dashboard")}>
          ← Kembali ke Dashboard
        </button>
      </div>
    </AppLayout>
  )
}
