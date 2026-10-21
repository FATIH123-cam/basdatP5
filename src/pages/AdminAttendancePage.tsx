import { useState } from "react"
import { useNav } from "../context"
import { useDatabase } from "../context/DatabaseContext"
import AppLayout from "../components/AppLayout"
import { Absensi } from "../data/databaseData"

export default function AdminAttendancePage() {
  const { navigate } = useNav()
  const {
    praktikanList,
    pertemuanList,
    absensiList,
    setStudentMeetingAttendance,
    incrementAttendance,
    decrementAttendance,
    getStudentAttendanceSummary,
  } = useDatabase()

  const [selectedMeeting, setSelectedMeeting] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "hadir" | "alpa">("all")

  const currentMeetingObj = pertemuanList.find((p) => p.id === selectedMeeting) || pertemuanList[0]

  const filteredStudents = praktikanList.filter((s) => {
    const matchQuery =
      s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nim.toLowerCase().includes(searchQuery.toLowerCase())

    const meetingRecord = absensiList.find(
      (a) => a.praktikan_id === s.id && a.pertemuan_id === selectedMeeting
    )
    const isHadir = meetingRecord?.status === "Hadir"

    if (filterType === "hadir") return matchQuery && isHadir
    if (filterType === "alpa") return matchQuery && !isHadir
    return matchQuery
  })

  const statusConfig: Record<Absensi["status"], { label: string; color: string; text: string; emoji: string }> = {
    Hadir: { label: "HADIR", color: "#22C55E", text: "#fff", emoji: "✅" },
    Izin: { label: "IZIN", color: "#3B82F6", text: "#fff", emoji: "ℹ️" },
    Sakit: { label: "SAKIT", color: "#FFE033", text: "#0a0a0a", emoji: "🤒" },
    Alpa: { label: "ALPA", color: "#E8212A", text: "#fff", emoji: "❌" },
  }

  // Count statuses for selected meeting
  const meetingAttendanceRecords = absensiList.filter((a) => a.pertemuan_id === selectedMeeting)
  const countHadir = meetingAttendanceRecords.filter((a) => a.status === "Hadir").length
  const countIzin = meetingAttendanceRecords.filter((a) => a.status === "Izin").length
  const countSakit = meetingAttendanceRecords.filter((a) => a.status === "Sakit").length
  const countAlpa = meetingAttendanceRecords.filter((a) => a.status === "Alpa").length

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="p-6 rounded-2xl flex items-start justify-between gap-4 flex-wrap"
          style={{ background: "#1B72D4", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
        >
          <div>
            <div
              className="inline-block px-2.5 py-0.5 text-xs font-black rounded mb-2 bg-[#FFE033] text-black border border-black"
              style={{ fontFamily: "'Bangers', cursive" }}
            >
              PANEL ASISTEN PRAKTIKUM
            </div>
            <h2 className="text-3xl text-white font-black" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
              📋 KELOLA PRESENSI PESERTA (40 MAHASISWA)
            </h2>
            <p className="font-bold text-white/80 text-sm mt-1">
              Setiap praktikan diinisialisasi 5 kehadiran. Asprak dapat menambah, mengurangi, atau mengubah status secara manual.
            </p>
          </div>
          <button
            className="comic-btn comic-btn-primary text-sm flex items-center gap-1.5"
            onClick={() => navigate("admin-photo-verify")}
          >
            <span>📸 Verifikasi Foto</span>
          </button>
        </div>

        {/* Meeting selector for all 14 meetings */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-700 uppercase tracking-wider">
              Pilih Pertemuan (1 s.d. 14):
            </span>
            <span className="text-xs font-bold text-purple-700">
              Pertemuan #{selectedMeeting}: {currentMeetingObj?.topik_pertemuan} ({currentMeetingObj?.date})
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {pertemuanList.map((m) => {
              const isSelected = selectedMeeting === m.id
              return (
                <button
                  key={m.id}
                  className={`shrink-0 comic-btn text-xs px-3 py-1.5 transition-all ${
                    isSelected ? "comic-btn-primary scale-105" : "comic-btn-white"
                  }`}
                  onClick={() => setSelectedMeeting(m.id)}
                >
                  Pert. {m.id}
                </button>
              )
            })}
          </div>
        </div>

        {/* Summary Badges for Selected Meeting */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            className="p-3 rounded-xl border-2 border-black bg-white flex items-center justify-between"
            style={{ boxShadow: "3px 3px 0 #22C55E" }}
          >
            <div>
              <p className="text-[11px] font-bold text-gray-500">Hadir Pert. {selectedMeeting}</p>
              <p className="text-2xl font-black text-green-700" style={{ fontFamily: "'Bangers', cursive" }}>
                {countHadir} / {praktikanList.length}
              </p>
            </div>
            <span className="text-2xl">✅</span>
          </div>

          <div
            className="p-3 rounded-xl border-2 border-black bg-white flex items-center justify-between"
            style={{ boxShadow: "3px 3px 0 #3B82F6" }}
          >
            <div>
              <p className="text-[11px] font-bold text-gray-500">Izin</p>
              <p className="text-2xl font-black text-blue-600" style={{ fontFamily: "'Bangers', cursive" }}>
                {countIzin}
              </p>
            </div>
            <span className="text-2xl">ℹ️</span>
          </div>

          <div
            className="p-3 rounded-xl border-2 border-black bg-white flex items-center justify-between"
            style={{ boxShadow: "3px 3px 0 #FFE033" }}
          >
            <div>
              <p className="text-[11px] font-bold text-gray-500">Sakit</p>
              <p className="text-2xl font-black text-yellow-600" style={{ fontFamily: "'Bangers', cursive" }}>
                {countSakit}
              </p>
            </div>
            <span className="text-2xl">🤒</span>
          </div>

          <div
            className="p-3 rounded-xl border-2 border-black bg-white flex items-center justify-between"
            style={{ boxShadow: "3px 3px 0 #E8212A" }}
          >
            <div>
              <p className="text-[11px] font-bold text-gray-500">Alpa / Belum</p>
              <p className="text-2xl font-black text-red-600" style={{ fontFamily: "'Bangers', cursive" }}>
                {countAlpa}
              </p>
            </div>
            <span className="text-2xl">❌</span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="🔍 Cari nama atau NIM mahasiswa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 text-sm font-bold rounded-xl border-3 border-black bg-white"
            style={{ border: "2.5px solid #0a0a0a" }}
          />

          <div className="flex gap-2">
            {[
              { id: "all", label: `Semua (${praktikanList.length})` },
              { id: "hadir", label: `Hadir (${countHadir})` },
              { id: "alpa", label: `Alpa (${countAlpa})` },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as typeof filterType)}
                className={`comic-btn text-xs px-3 py-2 ${
                  filterType === f.id ? "comic-btn-primary" : "comic-btn-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Student list */}
        <div className="comic-panel">
          <div className="comic-panel-header flex items-center justify-between flex-wrap gap-2">
            <span>
              👥 DAFTAR MAHASISWA — PERTEMUAN {selectedMeeting} ({currentMeetingObj?.topik_pertemuan})
            </span>
            <span className="text-xs font-mono font-bold bg-black text-[#FFE033] px-2 py-0.5 rounded">
              Menampilkan {filteredStudents.length} Mahasiswa
            </span>
          </div>

          <div className="divide-y divide-[#0a0a0a]/10 max-h-[600px] overflow-y-auto">
            {filteredStudents.map((s) => {
              const summary = getStudentAttendanceSummary(s.id)
              const meetingRecord = absensiList.find(
                (a) => a.praktikan_id === s.id && a.pertemuan_id === selectedMeeting
              )
              const currentStatus = meetingRecord?.status ?? "Alpa"
              const st = statusConfig[currentStatus]

              return (
                <div
                  key={s.id}
                  className="flex items-center gap-4 px-4 py-3.5 flex-wrap hover:bg-yellow-50/40 transition-colors"
                >
                  {/* Student Avatar */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-black text-sm shrink-0"
                    style={{ background: "#FFE033", border: "2.5px solid #0a0a0a", color: "#0a0a0a" }}
                  >
                    {s.profile_picture || s.avatar}
                  </div>

                  {/* Student Info */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <p className="font-black text-sm text-[#0a0a0a]">{s.nama}</p>
                      <span className="text-[10px] font-mono font-bold bg-gray-200 px-1.5 py-0.5 rounded">
                        #{s.id}
                      </span>
                    </div>
                    <p className="text-xs text-[#0a0a0a]/60 font-bold font-mono">{s.nim}</p>

                    {/* Overall Attendance Counter */}
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[11px] font-bold text-gray-700">
                        Total Hadir: <strong className="text-green-700">{summary.hadir}</strong> / {summary.totalPertemuan} ({summary.percentage}%)
                      </span>

                      {/* Quick Increment/Decrement Buttons for Overall Attendance */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => decrementAttendance(s.id)}
                          className="w-6 h-6 rounded bg-red-100 hover:bg-red-200 text-red-800 font-black text-xs border border-red-400 flex items-center justify-center active:scale-95"
                          title="Kurangi 1 Kehadiran Mahasiswa"
                        >
                          -
                        </button>
                        <button
                          onClick={() => incrementAttendance(s.id)}
                          className="w-6 h-6 rounded bg-green-100 hover:bg-green-200 text-green-800 font-black text-xs border border-green-400 flex items-center justify-center active:scale-95"
                          title="Tambah 1 Kehadiran Mahasiswa"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Meeting Status for this specific meeting */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <span
                      className="text-xs font-black px-2.5 py-1 rounded"
                      style={{
                        background: st.color,
                        color: st.text,
                        border: "2px solid #0a0a0a",
                        fontFamily: "'Bangers', cursive",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {st.emoji} {st.label}
                    </span>

                    {/* Status Toggle Buttons */}
                    <div className="flex gap-1">
                      {(["Hadir", "Izin", "Sakit", "Alpa"] as Absensi["status"][]).map((statusOption) => {
                        const isCurrent = currentStatus === statusOption
                        return (
                          <button
                            key={statusOption}
                            onClick={() =>
                              setStudentMeetingAttendance(s.id, selectedMeeting, statusOption)
                            }
                            className={`px-2 py-1 text-[11px] font-black rounded border transition-all ${
                              isCurrent
                                ? "bg-black text-white border-black scale-105"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                            title={`Ubah status menjadi ${statusOption}`}
                          >
                            {statusOption}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Back button */}
        <button className="comic-btn comic-btn-white" onClick={() => navigate("admin-dashboard")}>
          ← Kembali ke Dashboard Asprak
        </button>
      </div>
    </AppLayout>
  )
}
