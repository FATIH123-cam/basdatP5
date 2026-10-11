import { useNav } from "../context"
import { currentAdmin, meetings, adminStudents } from "../data/mockData"
import AppLayout from "../components/AppLayout"

export default function AdminDashboard() {
  const { navigate } = useNav()

  const pending = adminStudents.filter(s => s.status === "menunggu-verifikasi").length
  const hadir = adminStudents.filter(s => s.status === "hadir").length
  const totalStudents = adminStudents.length
  const belumSubmit = adminStudents.filter(s => s.status === "belum-submit").length

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome banner */}
        <div
          className="relative overflow-hidden p-6 rounded-2xl"
          style={{ background: "#0a0a0a", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #FFE033" }}
        >
          <div
            className="absolute top-4 right-4 text-5xl opacity-20 select-none"
            style={{ fontFamily: "'Bangers', cursive", color: "#FFE033", transform: "rotate(10deg)" }}
          >
            ADMIN!
          </div>
          <div className="flex items-center gap-4 relative z-10">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-black text-xl shrink-0"
              style={{ background: "#FFE033", border: "3px solid #FFE033" }}
            >
              {currentAdmin.avatar}
            </div>
            <div>
              <div
                className="inline-block px-2 py-0.5 text-xs font-black mb-1 rounded"
                style={{ background: "#FFE033", color: "#0a0a0a", fontFamily: "'Bangers', cursive" }}
              >
                ASISTEN PRAKTIKUM
              </div>
              <h2
                className="text-3xl text-[#FFE033]"
                style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
              >
                Halo, {currentAdmin.name}! 👋
              </h2>
              <p className="font-bold text-sm text-white/60">{currentAdmin.nim} · {currentAdmin.role}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-5 relative z-10">
            <button
              className="comic-btn comic-btn-primary text-sm px-4 py-2"
              onClick={() => navigate("admin-attendance")}
            >
              📋 Kelola Absensi
            </button>
            <button
              className="comic-btn text-sm px-4 py-2"
              style={{ background: "#18B5D8", color: "#fff", border: "3px solid #FFE033" }}
              onClick={() => navigate("admin-photo-verify")}
            >
              📸 Verifikasi Foto
              {pending > 0 && (
                <span
                  className="ml-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                  style={{ background: "#E8212A", color: "#fff" }}
                >
                  {pending}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Mahasiswa", value: totalStudents, icon: "👥", color: "#18B5D8", tag: "TOTAL!" },
            { label: "Sudah Hadir", value: hadir, icon: "✅", color: "#22C55E", tag: "HADIR!" },
            { label: "Menunggu Verifikasi", value: pending, icon: "⏳", color: "#FFE033", tag: "PENDING!" },
            { label: "Belum Submit", value: belumSubmit, icon: "⚠️", color: "#E8212A", tag: "ALERT!" },
          ].map((s, i) => (
            <div key={i} className="comic-card p-4">
              <div
                className="inline-block px-2 py-0.5 text-xs font-black mb-2 rounded"
                style={{
                  background: s.color,
                  border: "2px solid #0a0a0a",
                  fontFamily: "'Bangers', cursive",
                  color: s.color === "#FFE033" ? "#0a0a0a" : "#fff",
                }}
              >
                {s.tag}
              </div>
              <div
                className="text-3xl font-black"
                style={{ fontFamily: "'Bangers', cursive", color: "#0a0a0a" }}
              >
                {s.icon} {s.value}
              </div>
              <div className="text-xs font-bold text-[#0a0a0a]/60 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pending verification alert */}
        {pending > 0 && (
          <div
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{ background: "#FEF9C3", border: "3px solid #F97316", boxShadow: "4px 4px 0 #F97316" }}
          >
            <span className="text-2xl animate-comic-bounce inline-block">📸</span>
            <div className="flex-1">
              <p className="font-black text-sm">{pending} foto absensi menunggu verifikasimu!</p>
              <p className="text-xs font-bold text-[#0a0a0a]/60">Segera verifikasi agar mahasiswa mendapat konfirmasi kehadiran.</p>
            </div>
            <button
              className="comic-btn comic-btn-danger text-xs px-3 py-2 shrink-0"
              onClick={() => navigate("admin-photo-verify")}
            >
              Verifikasi →
            </button>
          </div>
        )}

        {/* Quick menu */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Absensi", icon: "📋", page: "admin-attendance" as const, color: "#1B72D4", desc: "Kelola & monitor absensi" },
            { label: "Verifikasi Foto", icon: "📸", page: "admin-photo-verify" as const, color: "#E8212A", desc: "Review photo strip mahasiswa" },
            { label: "Materi", icon: "📖", page: "admin-materials" as const, color: "#22C55E", desc: "Upload & kelola modul" },
            { label: "Kuis", icon: "🧠", page: "admin-quiz" as const, color: "#7C3AED", desc: "Buat & kelola soal kuis" },
            { label: "ERD Designer", icon: "🗄️", page: "admin-erd" as const, color: "#F97316", desc: "Rancang database schema" },
            { label: "Pengumuman", icon: "📢", page: "admin-announcements" as const, color: "#18B5D8", desc: "Kirim info ke mahasiswa" },
          ].map((item) => (
            <button
              key={item.page}
              className="comic-card p-4 text-left flex items-start gap-3"
              onClick={() => navigate(item.page)}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: item.color, border: "2.5px solid #0a0a0a" }}
              >
                {item.icon}
              </div>
              <div>
                <p className="font-black text-sm">{item.label}</p>
                <p className="text-xs text-[#0a0a0a]/60 font-bold">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Recent submissions */}
        <div className="comic-panel">
          <div className="comic-panel-header">📬 SUBMISSION TERBARU</div>
          <div className="divide-y divide-[#0a0a0a]/10">
            {adminStudents.filter(s => s.submitTime).slice(0, 5).map((s) => {
              const statusConfig: Record<string, { label: string; color: string; text: string }> = {
                "hadir": { label: "✅ HADIR", color: "#22C55E", text: "#fff" },
                "menunggu-verifikasi": { label: "⏳ PENDING", color: "#FFE033", text: "#0a0a0a" },
                "ditolak": { label: "❌ DITOLAK", color: "#E8212A", text: "#fff" },
              }
              const st = statusConfig[s.status] ?? { label: s.status, color: "#e5e7eb", text: "#6b7280" }
              return (
                <div key={s.id} className="flex items-center gap-4 px-4 py-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shrink-0"
                    style={{ background: "#18B5D8", border: "2px solid #0a0a0a", color: "#fff" }}
                  >
                    {s.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm truncate">{s.name}</p>
                    <p className="text-xs text-[#0a0a0a]/50 font-bold">{s.nim} · {s.submitTime}</p>
                  </div>
                  <span
                    className="text-xs font-black px-2 py-1 rounded shrink-0"
                    style={{ background: st.color, color: st.text, border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
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
              onClick={() => navigate("admin-attendance")}
            >
              📋 Lihat Semua
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
