import { useNav } from "../context"
import AppLayout from "../components/AppLayout"

const leaderboardData = [
  { rank: 1, name: "Dewi Kusuma", nim: "2201102021", points: 2850, hadir: 12, avatar: "DK", badge: "🥇" },
  { rank: 2, name: "Andi Prasetyo", nim: "2201102009", points: 2720, hadir: 11, avatar: "AP", badge: "🥈" },
  { rank: 3, name: "Budi Santoso", nim: "2201102034", points: 2600, hadir: 11, avatar: "BS", badge: "🥉" },
  { rank: 4, name: "Citra Lestari", nim: "2201102015", points: 2450, hadir: 10, avatar: "CL", badge: "🏅" },
  { rank: 5, name: "Eko Saputra", nim: "2201102028", points: 2300, hadir: 10, avatar: "ES", badge: "🏅" },
  { rank: 6, name: "Fitri Wahyuni", nim: "2201102007", points: 2150, hadir: 9, avatar: "FW", badge: "🏅" },
  { rank: 7, name: "Gilang Pratama", nim: "2201102041", points: 2050, hadir: 9, avatar: "GP", badge: "🏅" },
  { rank: 8, name: "Hana Sari", nim: "2201102003", points: 1950, hadir: 8, avatar: "HS", badge: "🏅" },
]

const podiumColors = ["#FFE033", "#C0C0C0", "#CD7F32"]

export default function LeaderboardPage() {
  const { navigate } = useNav()
  const top3 = leaderboardData.slice(0, 3)
  const rest = leaderboardData.slice(3)

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="p-6 rounded-2xl text-center"
          style={{ background: "#FFE033", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
        >
          <h2 className="text-4xl" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
            🏆 PAPAN PERINGKAT
          </h2>
          <p className="font-bold text-sm mt-1 text-[#0a0a0a]/70">
            Siapa yang paling rajin dan berprestasi di praktikum?
          </p>
        </div>

        {/* Podium */}
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
            <p className="text-xs font-black text-center max-w-[80px] leading-tight">{top3[1].name.split(" ")[0]}</p>
            <div
              className="w-20 flex items-center justify-center font-black text-lg"
              style={{ height: "60px", background: podiumColors[1], border: "3px solid #0a0a0a", borderRadius: "8px 8px 0 0", fontFamily: "'Bangers', cursive" }}
            >
              #2
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
            <p className="text-xs font-black text-center max-w-[90px] leading-tight">{top3[0].name.split(" ")[0]}</p>
            <div
              className="w-20 flex items-center justify-center font-black text-2xl"
              style={{ height: "90px", background: podiumColors[0], border: "3px solid #0a0a0a", borderRadius: "8px 8px 0 0", fontFamily: "'Bangers', cursive" }}
            >
              #1
            </div>
          </div>

          {/* 3rd place */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl">{top3[2].badge}</div>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center font-black text-base"
              style={{ background: podiumColors[2], border: "3px solid #0a0a0a", boxShadow: "3px 3px 0 #0a0a0a", color: "#fff" }}
            >
              {top3[2].avatar}
            </div>
            <p className="text-xs font-black text-center max-w-[80px] leading-tight">{top3[2].name.split(" ")[0]}</p>
            <div
              className="w-20 flex items-center justify-center font-black text-lg"
              style={{ height: "45px", background: podiumColors[2], border: "3px solid #0a0a0a", borderRadius: "8px 8px 0 0", fontFamily: "'Bangers', cursive", color: "#fff" }}
            >
              #3
            </div>
          </div>
        </div>

        {/* Full leaderboard */}
        <div className="comic-panel">
          <div className="comic-panel-header">🏅 PERINGKAT LENGKAP</div>
          <div className="divide-y divide-[#0a0a0a]/10">
            {leaderboardData.map((student) => {
              const isMe = student.nim === "2201102034"
              return (
                <div
                  key={student.rank}
                  className="flex items-center gap-4 px-4 py-3"
                  style={isMe ? { background: "#FEF9C3" } : {}}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0"
                    style={{
                      background: student.rank <= 3 ? podiumColors[student.rank - 1] : "#e5e7eb",
                      border: "2px solid #0a0a0a",
                      fontFamily: "'Bangers', cursive",
                      color: student.rank === 3 ? "#fff" : "#0a0a0a",
                    }}
                  >
                    {student.rank}
                  </div>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shrink-0"
                    style={{ background: "#18B5D8", border: "2px solid #0a0a0a", color: "#fff" }}
                  >
                    {student.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm flex items-center gap-2">
                      {student.name}
                      {isMe && (
                        <span
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{ background: "#FFE033", border: "1.5px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                        >
                          KAMU!
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-[#0a0a0a]/50 font-bold">{student.nim} · {student.hadir}/12 hadir</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black" style={{ fontFamily: "'Bangers', cursive", fontSize: "1.1rem" }}>
                      {student.points.toLocaleString()}
                    </div>
                    <div className="text-xs text-[#0a0a0a]/50 font-bold">poin</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <button className="comic-btn comic-btn-white" onClick={() => navigate("student-dashboard")}>
          ← Kembali ke Dashboard
        </button>
      </div>
    </AppLayout>
  )
}
