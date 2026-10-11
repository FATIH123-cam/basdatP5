import { useState } from "react"
import { useNav } from "../context"
import { currentStudent, meetings } from "../data/mockData"
import AppLayout from "../components/AppLayout"

const stats = [
  { label: "Pertemuan Hadir", value: "3", total: "12", color: "#22C55E", icon: "✅", tag: "HADIR!" },
  { label: "Tugas Dikumpul", value: "4", total: "6", color: "#18B5D8", icon: "📝", tag: "SUBMIT!" },
  { label: "Nilai Rata-rata", value: "87", total: "100", color: "#FFE033", icon: "⭐", tag: "KEREN!" },
  { label: "Posisi Ranking", value: "#3", total: "32", color: "#E8212A", icon: "🏆", tag: "TOP!" },
]

export default function StudentDashboard() {
  const { navigate } = useNav()
  const [hovered, setHovered] = useState<number | null>(null)

  const nextMeeting = meetings.find(m => m.status === "belum-submit" || m.status === "belum")
  const pendingMeeting = meetings.find(m => m.status === "belum-submit")

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Hero Welcome Banner */}
        <div
          className="relative overflow-hidden rounded-2xl p-6"
          style={{
            background: "#FFE033",
            border: "4px solid #0a0a0a",
            boxShadow: "6px 6px 0px #0a0a0a",
          }}
        >
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div
                  className="inline-block px-3 py-1 text-xs font-black mb-2"
                  style={{ background: "#0a0a0a", color: "#FFE033", borderRadius: "6px", fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
                >
                  🎓 SELAMAT DATANG KEMBALI!
                </div>
                <h2
                  className="text-3xl md:text-4xl text-[#0a0a0a]"
                  style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
                >
                  Halo, {currentStudent.name}! 👋
                </h2>
                <p className="text-sm font-bold text-[#0a0a0a]/80 mt-1">
                  {currentStudent.nim} · {currentStudent.kelas}
                </p>
              </div>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black shrink-0"
                style={{ background: "#0a0a0a", color: "#FFE033", border: "3px solid #0a0a0a" }}
              >
                {currentStudent.avatar}
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-3 mt-5">
              <button
                className="comic-btn comic-btn-primary text-sm px-4 py-2"
                onClick={() => navigate("student-attendance-select")}
              >
                📸 Absen Sekarang
              </button>
              <button
                className="comic-btn comic-btn-white text-sm px-4 py-2"
                onClick={() => navigate("student-attendance-history")}
              >
                📋 Riwayat Absensi
              </button>
              <button
                className="comic-btn text-sm px-4 py-2"
                style={{ background: "#0a0a0a", color: "#FFE033" }}
                onClick={() => navigate("student-leaderboard")}
              >
                🏆 Lihat Ranking
              </button>
            </div>
          </div>

          {/* Decorative */}
          <div
            className="absolute top-4 right-4 text-5xl opacity-20 select-none hidden md:block"
            style={{ fontFamily: "'Bangers', cursive", color: "#0a0a0a", transform: "rotate(10deg)" }}
          >
            POW!
          </div>
        </div>

        {/* Pending absensi alert */}
        {pendingMeeting && (
          <div
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{ background: "#FEF9C3", border: "3px solid #E8212A", boxShadow: "4px 4px 0 #E8212A" }}
          >
            <span className="text-2xl animate-comic-bounce inline-block">⚠️</span>
            <div className="flex-1">
              <p className="font-black text-sm text-[#0a0a0a]">Kamu belum submit absensi!</p>
              <p className="text-xs font-bold text-[#0a0a0a]/70">Pertemuan {pendingMeeting.id}: {pendingMeeting.title}</p>
            </div>
            <button
              className="comic-btn comic-btn-danger text-xs px-3 py-2 shrink-0"
              onClick={() => navigate("student-attendance-select")}
            >
              Absen Sekarang! 📸
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="comic-card p-4 cursor-default"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="inline-block px-2 py-0.5 text-xs font-black mb-2"
                style={{
                  background: s.color,
                  border: "2px solid #0a0a0a",
                  borderRadius: "5px",
                  fontFamily: "'Bangers', cursive",
                  color: s.color === "#FFE033" ? "#0a0a0a" : s.color === "#22C55E" ? "#fff" : "#fff",
                  letterSpacing: "0.05em",
                }}
              >
                {s.tag}
              </div>
              <div
                className="text-3xl font-black"
                style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em", color: "#0a0a0a" }}
              >
                {s.icon} {s.value}
              </div>
              <div className="text-xs font-bold text-[#0a0a0a]/60 mt-1">
                {s.label} <span className="font-black">/{s.total}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ERD Builder Promo */}
        <div
          className="flex items-center gap-4 p-4 rounded-xl cursor-pointer"
          style={{ background: "#7C3AED", border: "3px solid #0a0a0a", boxShadow: "5px 5px 0 #0a0a0a" }}
          onClick={() => navigate("student-erd")}
        >
          <span className="text-3xl">🗄️</span>
          <div className="flex-1">
            <p className="font-black text-white" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em", fontSize: "1.1rem" }}>ERD DATABASE DESIGNER</p>
            <p className="text-xs text-white/80 font-bold">Rancang skema database visualmu secara interaktif — drag, drop, connect!</p>
          </div>
          <span className="text-white font-black text-xl">→</span>
        </div>

        {/* Meeting List */}
        <div className="comic-panel">
          <div className="comic-panel-header flex items-center justify-between">
            <span>📅 JADWAL PERTEMUAN</span>
            <span className="text-sm">12 Pertemuan Total</span>
          </div>
          <div className="divide-y divide-[#0a0a0a]/10">
            {meetings.slice(0, 6).map((m) => {
              const statusConfig: Record<string, { label: string; color: string; textColor: string }> = {
                "hadir": { label: "✅ HADIR", color: "#22C55E", textColor: "#fff" },
                "menunggu-verifikasi": { label: "⏳ PENDING", color: "#FFE033", textColor: "#0a0a0a" },
                "belum-submit": { label: "⚠️ BELUM SUBMIT", color: "#F97316", textColor: "#fff" },
                "belum": { label: "📅 BELUM", color: "#e5e7eb", textColor: "#6b7280" },
              }
              const st = statusConfig[m.status] ?? statusConfig["belum"]
              return (
                <div key={m.id} className="flex items-center gap-4 px-4 py-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0"
                    style={{ background: "#FFE033", border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                  >
                    {m.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm truncate">{m.title}</p>
                    <p className="text-xs text-[#0a0a0a]/50 font-bold">{m.date} · {m.topic}</p>
                  </div>
                  <span
                    className="text-xs font-black px-2 py-1 rounded shrink-0"
                    style={{ background: st.color, color: st.textColor, border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                  >
                    {st.label}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="p-4 text-center">
            <button
              className="comic-btn comic-btn-primary text-sm"
              onClick={() => navigate("student-attendance-history")}
            >
              📋 Lihat Semua Pertemuan
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Materi", icon: "📖", page: "student-materials" as const, color: "#18B5D8" },
            { label: "LKP", icon: "📄", page: "student-lkp" as const, color: "#22C55E" },
            { label: "Kuis", icon: "🧠", page: "student-quiz" as const, color: "#7C3AED" },
            { label: "Profil", icon: "👤", page: "student-profile" as const, color: "#F97316" },
          ].map((item) => (
            <button
              key={item.page}
              className="comic-card p-4 flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => navigate(item.page)}
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="font-black text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
