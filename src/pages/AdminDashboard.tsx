import { useNav } from "../context"
import { useDatabase } from "../context/DatabaseContext"
import AppLayout from "../components/AppLayout"

export default function AdminDashboard() {
  const { navigate } = useNav()
  const {
    currentUser,
    praktikanList,
    pertemuanList,
    materiList,
    lkpList,
    absensiList,
  } = useDatabase()

  const totalStudents = praktikanList.length
  const totalMeetings = pertemuanList.length
  const openMaterials = materiList.filter((m) => m.is_open && m.file_url).length
  const openLKP = lkpList.filter((l) => l.is_open && l.file_url).length
  const totalHadir = absensiList.filter((a) => a.status === "Hadir").length

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome banner */}
        <div
          className="relative overflow-hidden p-6 rounded-2xl"
          style={{ background: "#0a0a0a", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #FFE033" }}
        >
          <div
            className="absolute top-4 right-4 text-5xl opacity-20 select-none pointer-events-none"
            style={{ fontFamily: "'Bangers', cursive", color: "#FFE033", transform: "rotate(10deg)" }}
          >
            ASPRAK!
          </div>
          <div className="flex items-center gap-4 relative z-10 flex-wrap">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl shrink-0"
              style={{ background: "#FFE033", border: "3px solid #FFE033", color: "#0a0a0a" }}
            >
              {currentUser.profile_picture || currentUser.avatar || "AS"}
            </div>
            <div>
              <div
                className="inline-block px-2 py-0.5 text-xs font-black mb-1 rounded"
                style={{ background: "#FFE033", color: "#0a0a0a", fontFamily: "'Bangers', cursive" }}
              >
                ASISTEN PRAKTIKUM BASIS DATA
              </div>
              <h2
                className="text-3xl text-[#FFE033] font-black"
                style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
              >
                Halo, {currentUser.nama}! 👋
              </h2>
              <p className="font-bold text-sm text-white/70">
                NIM: {currentUser.nim} · {currentUser.email}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-5 relative z-10">
            <button
              className="comic-btn comic-btn-primary text-sm px-4 py-2"
              onClick={() => navigate("admin-attendance")}
            >
              📋 Kelola Absensi Mahasiswa
            </button>
            <button
              className="comic-btn text-sm px-4 py-2"
              style={{ background: "#18B5D8", color: "#fff", border: "3px solid #FFE033" }}
              onClick={() => navigate("admin-materials")}
            >
              📖 Kelola Link & Akses Materi
            </button>
            <button
              className="comic-btn text-sm px-4 py-2"
              style={{ background: "#22C55E", color: "#fff", border: "3px solid #FFE033" }}
              onClick={() => navigate("admin-lkp")}
            >
              📄 Kelola Link & Akses LKP
            </button>
            <button
              className="comic-btn text-sm px-4 py-2"
              style={{ background: "#7C3AED", color: "#fff", border: "3px solid #FFE033" }}
              onClick={() => navigate("admin-photo-verify")}
            >
              📸 Verifikasi Foto Presensi
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Mahasiswa", value: totalStudents, icon: "👥", color: "#18B5D8", tag: "40 PRAKTIKAN" },
            { label: "Jadwal Pertemuan", value: totalMeetings, icon: "📅", color: "#22C55E", tag: "14 SESI CSV" },
            { label: "Materi Terbuka", value: `${openMaterials} / 14`, icon: "📖", color: "#FFE033", tag: "KONTEN" },
            { label: "LKP Terbuka", value: `${openLKP} / 14`, icon: "📄", color: "#E8212A", tag: "LEMBAR KERJA" },
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

        {/* Quick menu navigation cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Kelola Absensi", icon: "📋", page: "admin-attendance" as const, color: "#1B72D4", desc: "Tambah/kurang absen & ganti status" },
            { label: "Link & Akses Materi", icon: "📖", page: "admin-materials" as const, color: "#22C55E", desc: "Atur link materi & buka/tutup akses" },
            { label: "Link & Akses LKP", icon: "📄", page: "admin-lkp" as const, color: "#E8212A", desc: "Atur link lembar kerja praktikum" },
            { label: "Verifikasi Foto", icon: "📸", page: "admin-photo-verify" as const, color: "#FFE033", desc: "Review photo strip presensi" },
            { label: "ERD Designer", icon: "🗄️", page: "admin-erd" as const, color: "#F97316", desc: "Rancang visual database schema" },
            { label: "Pengumuman", icon: "📢", page: "admin-announcements" as const, color: "#18B5D8", desc: "Kirim info ke mahasiswa" },
          ].map((item) => (
            <button
              key={item.page}
              className="comic-card p-4 text-left flex items-start gap-3 hover:scale-[1.02] transition-transform"
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

        {/* Sample Student Overview */}
        <div className="comic-panel">
          <div className="comic-panel-header flex items-center justify-between">
            <span>👥 OVERVIEW PRAKTIKAN (CONTOH 5 DARI 40 MAHASISWA)</span>
            <button
              onClick={() => navigate("admin-attendance")}
              className="text-xs font-bold text-[#FFE033] underline"
            >
              Lihat Semua 40 Mahasiswa →
            </button>
          </div>
          <div className="divide-y divide-[#0a0a0a]/10">
            {praktikanList.slice(0, 5).map((s) => (
              <div key={s.id} className="flex items-center gap-4 px-4 py-3 flex-wrap">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shrink-0"
                  style={{ background: "#FFE033", border: "2px solid #0a0a0a", color: "#0a0a0a" }}
                >
                  {s.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm truncate">{s.nama}</p>
                  <p className="text-xs text-[#0a0a0a]/50 font-bold font-mono">{s.nim} · {s.kelas}</p>
                </div>
                <div className="text-xs font-black px-2.5 py-1 rounded bg-green-100 text-green-800 border border-green-300">
                  ✅ Inisialisasi: 5 Hadir
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 text-center">
            <button
              className="comic-btn comic-btn-primary text-sm"
              onClick={() => navigate("admin-attendance")}
            >
              📋 Buka Halaman Kelola Absensi Lengkap
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
