import { useNav } from "../context"
import { meetings } from "../data/mockData"
import AppLayout from "../components/AppLayout"

export default function AttendanceHistoryPage() {
  const { navigate } = useNav()

  const statusConfig: Record<string, { label: string; color: string; textColor: string; emoji: string }> = {
    "hadir": { label: "HADIR", color: "#22C55E", textColor: "#fff", emoji: "✅" },
    "menunggu-verifikasi": { label: "PENDING", color: "#FFE033", textColor: "#0a0a0a", emoji: "⏳" },
    "belum-submit": { label: "BELUM SUBMIT", color: "#F97316", textColor: "#fff", emoji: "⚠️" },
    "belum": { label: "BELUM", color: "#e5e7eb", textColor: "#6b7280", emoji: "📅" },
  }

  const hadir = meetings.filter(m => m.status === "hadir").length
  const pending = meetings.filter(m => m.status === "menunggu-verifikasi").length
  const belumSubmit = meetings.filter(m => m.status === "belum-submit").length

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#FFE033", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
        >
          <h2 className="text-3xl" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
            📋 RIWAYAT ABSENSI
          </h2>
          <p className="font-bold text-sm mt-1">Rekap kehadiran kamu selama praktikum</p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Hadir", value: hadir, color: "#22C55E", icon: "✅" },
            { label: "Menunggu Verifikasi", value: pending, color: "#FFE033", icon: "⏳" },
            { label: "Belum Submit", value: belumSubmit, color: "#F97316", icon: "⚠️" },
          ].map((s, i) => (
            <div
              key={i}
              className="comic-card p-4 text-center"
            >
              <div className="text-3xl mb-1">{s.icon}</div>
              <div
                className="text-3xl font-black"
                style={{ fontFamily: "'Bangers', cursive", color: "#0a0a0a" }}
              >
                {s.value}
              </div>
              <div className="text-xs font-bold text-[#0a0a0a]/60">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Meeting list */}
        <div className="comic-panel">
          <div className="comic-panel-header">📅 SEMUA PERTEMUAN</div>
          <div className="divide-y divide-[#0a0a0a]/10">
            {meetings.map((m) => {
              const st = statusConfig[m.status] ?? statusConfig["belum"]
              return (
                <div key={m.id} className="flex items-center gap-4 px-4 py-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-base shrink-0"
                    style={{ background: "#FFE033", border: "2.5px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                  >
                    {m.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm truncate">{m.title}</p>
                    <p className="text-xs text-[#0a0a0a]/50 font-bold">{m.date}</p>
                    <p className="text-xs text-[#0a0a0a]/40 font-bold truncate">{m.topic}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                      className="text-xs font-black px-2 py-1 rounded"
                      style={{
                        background: st.color,
                        color: st.textColor,
                        border: "2px solid #0a0a0a",
                        fontFamily: "'Bangers', cursive",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {st.emoji} {st.label}
                    </span>
                    {m.photoSubmitted && (
                      <span className="text-xs font-bold text-[#22C55E]">📸 Foto terkirim</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="comic-btn comic-btn-primary flex-1"
            onClick={() => navigate("student-attendance-select")}
          >
            📸 Absen Sekarang
          </button>
          <button
            className="comic-btn comic-btn-white flex-1"
            onClick={() => navigate("student-dashboard")}
          >
            🏠 Kembali ke Dashboard
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
