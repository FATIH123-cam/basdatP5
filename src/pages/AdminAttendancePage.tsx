import { useState } from "react"
import { useNav } from "../context"
import { adminStudents, meetings } from "../data/mockData"
import AppLayout from "../components/AppLayout"

export default function AdminAttendancePage() {
  const { navigate } = useNav()
  const [selectedMeeting, setSelectedMeeting] = useState(4)
  const [students, setStudents] = useState(adminStudents)
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = students.filter(
    s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nim.includes(searchQuery)
  )

  const setStatus = (id: number, status: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s))
  }

  const statusConfig: Record<string, { label: string; color: string; text: string }> = {
    "hadir": { label: "✅ HADIR", color: "#22C55E", text: "#fff" },
    "menunggu-verifikasi": { label: "⏳ PENDING", color: "#FFE033", text: "#0a0a0a" },
    "ditolak": { label: "❌ DITOLAK", color: "#E8212A", text: "#fff" },
    "belum-submit": { label: "⚠️ BELUM SUBMIT", color: "#F97316", text: "#fff" },
    "tidak-hadir": { label: "🚫 TIDAK HADIR", color: "#6b7280", text: "#fff" },
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="p-6 rounded-2xl flex items-start justify-between gap-4 flex-wrap"
          style={{ background: "#1B72D4", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
        >
          <div>
            <h2 className="text-3xl text-white" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
              📋 KELOLA ABSENSI
            </h2>
            <p className="font-bold text-white/70 text-sm mt-1">Monitor dan verifikasi kehadiran mahasiswa</p>
          </div>
          <button
            className="comic-btn comic-btn-primary text-sm"
            onClick={() => navigate("admin-photo-verify")}
          >
            📸 Verifikasi Foto
          </button>
        </div>

        {/* Meeting selector */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {meetings.slice(0, 6).map((m) => (
            <button
              key={m.id}
              className="shrink-0 comic-btn text-xs px-3 py-1.5"
              style={{
                background: selectedMeeting === m.id ? "#FFE033" : "#fffdf5",
                color: "#0a0a0a",
              }}
              onClick={() => setSelectedMeeting(m.id)}
            >
              Pert. {m.id}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Cari nama atau NIM..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 text-sm font-bold"
          style={{ border: "2.5px solid #0a0a0a", borderRadius: "12px" }}
        />

        {/* Summary badges */}
        <div className="flex gap-3 flex-wrap">
          {Object.entries(statusConfig).map(([key, val]) => {
            const count = students.filter(s => s.status === key).length
            if (count === 0) return null
            return (
              <span
                key={key}
                className="text-xs font-black px-3 py-1 rounded-lg"
                style={{ background: val.color, color: val.text, border: "2px solid #0a0a0a" }}
              >
                {val.label}: {count}
              </span>
            )
          })}
        </div>

        {/* Student list */}
        <div className="comic-panel">
          <div className="comic-panel-header">
            👥 DAFTAR MAHASISWA — PERTEMUAN {selectedMeeting}
          </div>
          <div className="divide-y divide-[#0a0a0a]/10">
            {filtered.map((s) => {
              const st = statusConfig[s.status] ?? { label: s.status, color: "#e5e7eb", text: "#6b7280" }
              return (
                <div key={s.id} className="flex items-center gap-4 px-4 py-4 flex-wrap">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0"
                    style={{ background: "#18B5D8", border: "2px solid #0a0a0a", color: "#fff" }}
                  >
                    {s.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm">{s.name}</p>
                    <p className="text-xs text-[#0a0a0a]/50 font-bold">{s.nim}</p>
                    {s.submitTime && <p className="text-xs text-[#0a0a0a]/40 font-bold">Submit: {s.submitTime}</p>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-xs font-black px-2 py-1 rounded"
                      style={{ background: st.color, color: st.text, border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                    >
                      {st.label}
                    </span>
                    {s.status === "menunggu-verifikasi" && (
                      <>
                        <button
                          className="comic-btn text-xs px-2 py-1"
                          style={{ background: "#22C55E", color: "#fff" }}
                          onClick={() => setStatus(s.id, "hadir")}
                        >
                          ✅
                        </button>
                        <button
                          className="comic-btn comic-btn-danger text-xs px-2 py-1"
                          onClick={() => setStatus(s.id, "ditolak")}
                        >
                          ❌
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <button className="comic-btn comic-btn-white" onClick={() => navigate("admin-dashboard")}>
          ← Kembali ke Dashboard
        </button>
      </div>
    </AppLayout>
  )
}
