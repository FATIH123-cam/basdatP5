import { useNav } from "../context"
import { useDatabase } from "../context/DatabaseContext"
import AppLayout from "../components/AppLayout"

export default function AttendanceHistoryPage() {
  const { navigate } = useNav()
  const { currentUser, getStudentAttendanceSummary, getStudentAbsensiList } = useDatabase()

  const summary = getStudentAttendanceSummary(currentUser.id)
  const absensiRecords = getStudentAbsensiList(currentUser.id)

  const statusConfig: Record<string, { label: string; color: string; textColor: string; emoji: string }> = {
    Hadir: { label: "HADIR", color: "#22C55E", textColor: "#fff", emoji: "✅" },
    Izin: { label: "IZIN", color: "#3B82F6", textColor: "#fff", emoji: "ℹ️" },
    Sakit: { label: "SAKIT", color: "#FFE033", textColor: "#0a0a0a", emoji: "🤒" },
    Alpa: { label: "ALPA", color: "#E8212A", textColor: "#fff", emoji: "❌" },
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#FFE033", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-black" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
                📋 RIWAYAT ABSENSI PRAKTIKAN
              </h2>
              <p className="font-bold text-sm mt-1 text-[#0a0a0a]/80">
                Nama: <strong>{currentUser.nama}</strong> ({currentUser.nim}) · Kelas: {currentUser.kelas}
              </p>
            </div>
            <div
              className="px-3 py-1.5 rounded-xl bg-black text-[#FFE033] text-sm font-black border-2 border-white"
              style={{ fontFamily: "'Bangers', cursive" }}
            >
              KEHADIRAN: {summary.hadir} / {summary.totalPertemuan} ({summary.percentage}%)
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Hadir", value: summary.hadir, color: "#22C55E", icon: "✅" },
            { label: "Total Izin", value: summary.izin, color: "#3B82F6", icon: "ℹ️" },
            { label: "Total Sakit", value: summary.sakit, color: "#FFE033", icon: "🤒" },
            { label: "Belum Absen / Alpa", value: summary.alpa, color: "#E8212A", icon: "❌" },
          ].map((s, i) => (
            <div key={i} className="comic-card p-4 text-center">
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
          <div className="comic-panel-header flex items-center justify-between">
            <span>📅 DAFTAR 14 PERTEMUAN (DATA DARI DATABASE)</span>
            <span className="text-xs font-bold text-[#FFE033]">
              Terhitung secara real-time
            </span>
          </div>
          <div className="divide-y divide-[#0a0a0a]/10 max-h-[500px] overflow-y-auto">
            {absensiRecords.map((record) => {
              const st = statusConfig[record.status] ?? statusConfig["Alpa"]
              const isHadir = record.status === "Hadir"

              return (
                <div key={record.id} className="flex items-center gap-4 px-4 py-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-base shrink-0"
                    style={{
                      background: isHadir ? "#22C55E" : "#FFE033",
                      color: isHadir ? "#fff" : "#0a0a0a",
                      border: "2.5px solid #0a0a0a",
                      fontFamily: "'Bangers', cursive",
                    }}
                  >
                    {record.pertemuan_id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm truncate">{record.pertemuan.title}</p>
                    <p className="text-xs text-[#0a0a0a]/50 font-bold">
                      Jadwal: {record.pertemuan.date} · Topik: {record.pertemuan.topik_pertemuan}
                    </p>
                    <p className="text-[11px] text-[#0a0a0a]/40 font-bold truncate">
                      {record.waktu_absen !== "-" ? `Presensi tercatat: ${record.waktu_absen}` : "Presensi belum tercatat"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span
                      className="text-xs font-black px-2.5 py-1 rounded"
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
                    {isHadir && (
                      <span className="text-[11px] font-bold text-[#22C55E]">📸 Presensi Terverifikasi</span>
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
            📸 Absen Sekarang (Photobooth)
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
