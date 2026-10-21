import { useNav } from "../context"
import { useDatabase } from "../context/DatabaseContext"
import AppLayout from "../components/AppLayout"

const podiumColors = ["#FFE033", "#C0C0C0", "#CD7F32"]

export default function LeaderboardPage() {
  const { navigate } = useNav()
  const {
    praktikanList,
    currentUser,
    getStudentAttendanceSummary,
    getStudentKuisSummary,
    getStudentKeaktifanSummary,
  } = useDatabase()

  // Calculate scores and points for all 40 students
  const studentRankings = praktikanList.map((student) => {
    const att = getStudentAttendanceSummary(student.id)
    const kuis = getStudentKuisSummary(student.id)
    const keaktifan = getStudentKeaktifanSummary(student.id)

    // Formula: (Hadir * 150) + (Quiz Avg * 10) + (Keaktifan Points)
    const totalPoints = att.hadir * 150 + kuis.avgScore * 10 + keaktifan.totalPoin

    return {
      id: student.id,
      name: student.nama,
      nim: student.nim,
      avatar: student.avatar,
      points: totalPoints,
      hadir: att.hadir,
      kuisAvg: kuis.avgScore,
      isCurrentUser: student.id === currentUser.id,
    }
  })

  // Sort descending by points
  studentRankings.sort((a, b) => b.points - a.points)

  // Assign ranks
  const rankedData = studentRankings.map((s, idx) => ({
    ...s,
    rank: idx + 1,
    badge: idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "🏅",
  }))

  const top3 = rankedData.slice(0, 3)
  const rest = rankedData.slice(3)

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="p-6 rounded-2xl text-center"
          style={{ background: "#FFE033", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
        >
          <h2 className="text-4xl font-black" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
            🏆 PAPAN PERINGKAT PRAKTIKUM BASIS DATA
          </h2>
          <p className="font-bold text-sm mt-1 text-[#0a0a0a]/80">
            Peringkat terhitung dari keaktifan, kuis, dan presensi 40 praktikan
          </p>
        </div>

        {/* Podium for Top 3 */}
        {top3.length >= 3 && (
          <div className="flex items-end justify-center gap-4 py-6">
            {/* 2nd place */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl">{top3[1].badge}</div>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-black text-base"
                style={{ background: podiumColors[1], border: "3px solid #0a0a0a", boxShadow: "3px 3px 0 #0a0a0a" }}
              >
                {top3[1].avatar}
              </div>
              <p className="text-xs font-black text-center max-w-[90px] leading-tight truncate">
                {top3[1].name.split(" ")[0]}
              </p>
              <div
                className="w-24 flex flex-col items-center justify-center font-black"
                style={{
                  height: "70px",
                  background: podiumColors[1],
                  border: "3px solid #0a0a0a",
                  borderRadius: "8px 8px 0 0",
                  fontFamily: "'Bangers', cursive",
                }}
              >
                <span className="text-lg">#2</span>
                <span className="text-[11px] font-mono">{top3[1].points} pts</span>
              </div>
            </div>

            {/* 1st place */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl animate-comic-bounce inline-block">{top3[0].badge}</div>
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center font-black text-xl"
                style={{ background: podiumColors[0], border: "4px solid #0a0a0a", boxShadow: "4px 4px 0 #0a0a0a" }}
              >
                {top3[0].avatar}
              </div>
              <p className="text-xs font-black text-center max-w-[100px] leading-tight truncate">
                {top3[0].name.split(" ")[0]}
              </p>
              <div
                className="w-24 flex flex-col items-center justify-center font-black"
                style={{
                  height: "100px",
                  background: podiumColors[0],
                  border: "3px solid #0a0a0a",
                  borderRadius: "8px 8px 0 0",
                  fontFamily: "'Bangers', cursive",
                }}
              >
                <span className="text-2xl">#1</span>
                <span className="text-xs font-mono">{top3[0].points} pts</span>
              </div>
            </div>

            {/* 3rd place */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl">{top3[2].badge}</div>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-black text-base text-white"
                style={{ background: podiumColors[2], border: "3px solid #0a0a0a", boxShadow: "3px 3px 0 #0a0a0a" }}
              >
                {top3[2].avatar}
              </div>
              <p className="text-xs font-black text-center max-w-[90px] leading-tight truncate">
                {top3[2].name.split(" ")[0]}
              </p>
              <div
                className="w-24 flex flex-col items-center justify-center font-black text-white"
                style={{
                  height: "50px",
                  background: podiumColors[2],
                  border: "3px solid #0a0a0a",
                  borderRadius: "8px 8px 0 0",
                  fontFamily: "'Bangers', cursive",
                }}
              >
                <span className="text-lg">#3</span>
                <span className="text-[11px] font-mono">{top3[2].points} pts</span>
              </div>
            </div>
          </div>
        )}

        {/* Full leaderboard */}
        <div className="comic-panel">
          <div className="comic-panel-header flex items-center justify-between">
            <span>🏅 DAFTAR PERINGKAT LENGKAP (40 PRAKTIKAN)</span>
            <span className="text-xs font-bold text-[#FFE033]">
              Presensi Awal: 5 Hadir per Mahasiswa
            </span>
          </div>
          <div className="divide-y divide-[#0a0a0a]/10 max-h-[600px] overflow-y-auto">
            {rankedData.map((student) => {
              const isMe = student.isCurrentUser

              return (
                <div
                  key={student.id}
                  className={`flex items-center gap-4 px-4 py-3 flex-wrap ${
                    isMe ? "bg-[#FFE033]/25 font-black border-l-4 border-l-[#0a0a0a]" : ""
                  }`}
                >
                  <div
                    className="w-8 text-center font-black text-base"
                    style={{ fontFamily: "'Bangers', cursive" }}
                  >
                    #{student.rank}
                  </div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0"
                    style={{
                      background: isMe ? "#FFE033" : "#0a0a0a",
                      color: isMe ? "#0a0a0a" : "#fff",
                      border: "2px solid #0a0a0a",
                    }}
                  >
                    {student.avatar}
                  </div>
                  <div className="flex-1 min-w-[180px]">
                    <div className="flex items-center gap-2">
                      <p className="font-black text-sm text-[#0a0a0a]">{student.name}</p>
                      {isMe && (
                        <span className="text-[10px] bg-black text-[#FFE033] px-1.5 py-0.5 rounded font-black">
                          KAMU
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#0a0a0a]/50 font-bold font-mono">
                      {student.nim} · Kehadiran: {student.hadir}/14 · Rata-rata Kuis: {student.kuisAvg}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-sm font-black px-3 py-1 rounded"
                      style={{ background: "#FFE033", border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                    >
                      {student.points} PTS
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Back Button */}
        <button
          className="comic-btn comic-btn-white"
          onClick={() =>
            currentUser.role === "asprak"
              ? navigate("admin-dashboard")
              : navigate("student-dashboard")
          }
        >
          ← Kembali ke Dashboard
        </button>
      </div>
    </AppLayout>
  )
}
