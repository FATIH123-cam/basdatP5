import { useState } from "react"
import { useNav } from "../context"
import { meetings, announcements } from "../data/mockData"
import AppLayout from "../components/AppLayout"

type ContentTab = "meetings" | "lkp" | "materials" | "quiz" | "announcements" | "settings"

export default function AdminContentPage() {
  const { page, navigate } = useNav()
  const [activeTab, setActiveTab] = useState<ContentTab>(
    page === "admin-meetings" ? "meetings" :
    page === "admin-lkp" ? "lkp" :
    page === "admin-materials" ? "materials" :
    page === "admin-quiz" ? "quiz" :
    page === "admin-announcements" ? "announcements" :
    "settings"
  )

  const tabs: { key: ContentTab; label: string; icon: string }[] = [
    { key: "meetings", label: "Pertemuan", icon: "📅" },
    { key: "lkp", label: "LKP", icon: "📄" },
    { key: "materials", label: "Materi", icon: "📖" },
    { key: "quiz", label: "Kuis", icon: "🧠" },
    { key: "announcements", label: "Pengumuman", icon: "📢" },
    { key: "settings", label: "Pengaturan", icon: "⚙️" },
  ]

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#7C3AED", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
        >
          <h2 className="text-3xl text-white" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
            ⚙️ MANAJEMEN KONTEN
          </h2>
          <p className="font-bold text-white/70 text-sm mt-1">Kelola materi, kuis, LKP, dan pengumuman</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`comic-btn text-sm px-4 py-2 ${activeTab === t.key ? "comic-btn-primary" : "comic-btn-white"}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Content areas */}
        {activeTab === "meetings" && (
          <div className="comic-panel">
            <div className="comic-panel-header flex items-center justify-between">
              <span>📅 DAFTAR PERTEMUAN</span>
              <button className="comic-btn comic-btn-primary text-xs px-3 py-1">+ Tambah</button>
            </div>
            <div className="divide-y divide-[#0a0a0a]/10">
              {meetings.map((m) => (
                <div key={m.id} className="flex items-center gap-4 px-4 py-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-black shrink-0"
                    style={{ background: "#FFE033", border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                  >
                    {m.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm">{m.title}</p>
                    <p className="text-xs text-[#0a0a0a]/50 font-bold">{m.date} · {m.topic}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="comic-btn comic-btn-white text-xs px-2 py-1">✏️</button>
                    <button className="comic-btn comic-btn-danger text-xs px-2 py-1">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "announcements" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button className="comic-btn comic-btn-primary text-sm">+ Buat Pengumuman</button>
            </div>
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="comic-card p-5"
                style={ann.important ? { borderColor: "#E8212A", boxShadow: "4px 4px 0 #E8212A" } : {}}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {ann.important && (
                        <span
                          className="text-xs font-black px-2 py-0.5 rounded"
                          style={{ background: "#E8212A", color: "#fff", border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                        >
                          ❗ PENTING
                        </span>
                      )}
                    </div>
                    <h4 className="font-black text-sm">{ann.title}</h4>
                    <p className="text-xs text-[#0a0a0a]/60 font-bold mt-1">{ann.body}</p>
                    <p className="text-xs text-[#0a0a0a]/40 font-bold mt-2">
                      {ann.author} · {ann.date}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="comic-btn comic-btn-white text-xs px-2 py-1">✏️</button>
                    <button className="comic-btn comic-btn-danger text-xs px-2 py-1">🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {(activeTab === "lkp" || activeTab === "materials" || activeTab === "quiz" || activeTab === "settings") && (
          <div
            className="p-12 rounded-2xl text-center"
            style={{ border: "3px dashed #0a0a0a", background: "#fffdf5" }}
          >
            <div className="text-5xl mb-4">🚧</div>
            <h3 className="font-black text-xl" style={{ fontFamily: "'Bangers', cursive" }}>
              FITUR INI SEDANG DIKEMBANGKAN
            </h3>
            <p className="text-sm font-bold text-[#0a0a0a]/60 mt-2">Coming soon!</p>
          </div>
        )}

        <button className="comic-btn comic-btn-white" onClick={() => navigate("admin-dashboard")}>
          ← Kembali ke Dashboard
        </button>
      </div>
    </AppLayout>
  )
}
