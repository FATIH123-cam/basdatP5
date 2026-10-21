import { useState } from "react"
import { useNav } from "../context"
import { useDatabase } from "../context/DatabaseContext"
import AppLayout from "../components/AppLayout"

const headerThemes = [
  { id: "yellow", name: "Komik Kuning", bg: "#FFE033", text: "#0a0a0a", accent: "#E8212A" },
  { id: "dark", name: "Gelap Elegan", bg: "#0a0a0a", text: "#FFE033", accent: "#18B5D8" },
  { id: "blue", name: "Biru Langit", bg: "#1B72D4", text: "#fff", accent: "#FFE033" },
  { id: "green", name: "Hijau Segar", bg: "#22C55E", text: "#fff", accent: "#FFE033" },
  { id: "red", name: "Merah Api", bg: "#E8212A", text: "#fff", accent: "#FFE033" },
  { id: "purple", name: "Ungu Galaksi", bg: "#7C3AED", text: "#fff", accent: "#FFE033" },
  { id: "cyan", name: "Cyan Neon", bg: "#18B5D8", text: "#0a0a0a", accent: "#E8212A" },
  { id: "orange", name: "Oranye Kreatif", bg: "#F97316", text: "#fff", accent: "#0a0a0a" },
]

const avatarOptions = [
  "🎓", "💻", "🚀", "⚡", "🦁", "🦊", "🐱", "🐼", "🌟", "🔥", "🎯", "🤖"
]

export default function ProfilePage() {
  const { navigate } = useNav()
  const {
    currentUser,
    praktikanList,
    asprakList,
    switchUserById,
    updatePraktikanProfile,
    getStudentAttendanceSummary,
    getStudentAbsensiList,
    getStudentKuisSummary,
    getStudentKeaktifanSummary,
    kuisHasilList,
    keaktifanList,
  } = useDatabase()

  const [selectedTheme, setSelectedTheme] = useState(headerThemes[0])
  const [showThemePicker, setShowThemePicker] = useState(false)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [showUserSwitcher, setShowUserSwitcher] = useState(false)
  const [activeTab, setActiveTab] = useState<"profile" | "database_erd" | "attendance">("profile")
  const [bio, setBio] = useState(currentUser.bio || "Mahasiswa Teknik Informatika yang antusias belajar Basis Data! 🗄️")
  const [editingBio, setEditingBio] = useState(false)
  const [customAvatar, setCustomAvatar] = useState(currentUser.profile_picture || "")

  // Calculated dynamic stats for current student
  const attSummary = getStudentAttendanceSummary(currentUser.id)
  const studentAbsensi = getStudentAbsensiList(currentUser.id)
  const kuisSummary = getStudentKuisSummary(currentUser.id)
  const keaktifanSummary = getStudentKeaktifanSummary(currentUser.id)
  const studentKuisHasil = kuisHasilList.filter((k) => k.praktikan_id === currentUser.id)
  const studentKeaktifan = keaktifanList.filter((k) => k.praktikan_id === currentUser.id)

  const handleSaveBio = () => {
    updatePraktikanProfile(currentUser.id, { bio })
    setEditingBio(false)
  }

  const handleSelectAvatarEmoji = (emoji: string) => {
    updatePraktikanProfile(currentUser.id, { profile_picture: emoji, avatar: emoji })
    setCustomAvatar(emoji)
    setShowAvatarPicker(false)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Quick User Switcher Banner (Helpful for demo/grading) */}
        <div
          className="p-3 rounded-xl flex items-center justify-between gap-3 flex-wrap text-xs font-bold"
          style={{ background: "#FEF9C3", border: "2.5px solid #0a0a0a" }}
        >
          <div className="flex items-center gap-2">
            <span>👤</span>
            <span>
              Login sebagai: <strong>{currentUser.nama}</strong> ({currentUser.nim}) —{" "}
              <span className="capitalize font-black text-purple-700">{currentUser.role}</span>
            </span>
          </div>
          <button
            onClick={() => setShowUserSwitcher(!showUserSwitcher)}
            className="comic-btn text-xs px-2.5 py-1"
            style={{ background: "#FFE033", color: "#0a0a0a" }}
          >
            🔄 Ganti Akun Praktikan ({showUserSwitcher ? "Tutup" : "Pilih"})
          </button>
        </div>

        {/* User Switcher Dropdown */}
        {showUserSwitcher && (
          <div
            className="p-4 rounded-xl border-3 border-black bg-white space-y-3 animate-comic-pop"
            style={{ border: "3px solid #0a0a0a", boxShadow: "4px 4px 0 #0a0a0a" }}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-black text-sm" style={{ fontFamily: "'Bangers', cursive" }}>
                PILIH DATA PRAKTIKAN ATAU ASPRAK (SESUAI ERD & CSV)
              </h4>
              <button
                onClick={() => setShowUserSwitcher(false)}
                className="text-xs font-bold text-gray-500 hover:text-black"
              >
                ✕ Tutup
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1">
              {[...asprakList, ...praktikanList].map((user) => (
                <button
                  key={user.id}
                  onClick={() => {
                    switchUserById(user.id)
                    setShowUserSwitcher(false)
                  }}
                  className={`p-2 rounded-lg text-left text-xs border transition-all ${
                    user.id === currentUser.id
                      ? "bg-[#FFE033] border-black font-black"
                      : "bg-gray-50 border-gray-200 hover:bg-yellow-50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span>{user.role === "asprak" ? "🛡️" : "🎓"}</span>
                    <span className="truncate">{user.nama}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono mt-0.5">{user.nim}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Header Banner */}
        <div
          className="relative p-6 rounded-2xl overflow-hidden transition-colors"
          style={{
            background: currentUser.header_picture ? "#1e293b" : selectedTheme.bg,
            border: "4px solid #0a0a0a",
            boxShadow: "6px 6px 0 #0a0a0a",
          }}
        >
          {/* Decorative Comic Sound Effect */}
          <div
            className="absolute top-4 right-4 text-5xl opacity-20 select-none pointer-events-none"
            style={{ fontFamily: "'Bangers', cursive", color: selectedTheme.text, transform: "rotate(10deg)" }}
          >
            POW!
          </div>

          <div className="flex items-center gap-5 relative z-10 flex-wrap">
            {/* Avatar / Profile Picture */}
            <div className="relative group">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black shrink-0 overflow-hidden"
                style={{
                  background: selectedTheme.accent,
                  border: "4px solid #0a0a0a",
                  color: "#0a0a0a",
                }}
              >
                {currentUser.profile_picture || customAvatar || currentUser.avatar}
              </div>
              <button
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs border-2 border-black shadow"
                title="Ganti Foto Profil"
              >
                📷
              </button>
            </div>

            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className="px-2 py-0.5 text-xs font-black rounded"
                  style={{
                    background: selectedTheme.accent,
                    color: "#0a0a0a",
                    border: "2px solid #0a0a0a",
                    fontFamily: "'Bangers', cursive",
                  }}
                >
                  {currentUser.role === "asprak" ? "ASISTEN PRAKTIKUM" : "PROFIL PRAKTIKAN"}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/20 text-white">
                  ID: #{currentUser.id}
                </span>
              </div>
              <h2
                className="text-2xl md:text-3xl font-black"
                style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em", color: selectedTheme.text }}
              >
                {currentUser.nama}
              </h2>
              <p className="font-bold text-sm" style={{ color: selectedTheme.text + "cc" }}>
                {currentUser.nim} · {currentUser.kelas}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-4 relative z-10 flex-wrap">
            <button
              className="comic-btn text-xs px-3 py-1.5"
              style={{ background: selectedTheme.accent, color: "#0a0a0a" }}
              onClick={() => setShowThemePicker(!showThemePicker)}
            >
              🎨 Ganti Tema Banner
            </button>
            <button
              className="comic-btn text-xs px-3 py-1.5 bg-white text-black"
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            >
              🖼️ Ganti Avatar Profil
            </button>
          </div>
        </div>

        {/* Avatar Picker Modal */}
        {showAvatarPicker && (
          <div
            className="p-5 rounded-2xl animate-comic-pop"
            style={{ border: "4px solid #0a0a0a", background: "#fffdf5", boxShadow: "5px 5px 0 #0a0a0a" }}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-black text-sm" style={{ fontFamily: "'Bangers', cursive" }}>
                🖼️ PILIH AVATAR PROFIL (TABLE: praktikan.profile_picture)
              </h3>
              <button onClick={() => setShowAvatarPicker(false)} className="text-xs font-bold">
                ✕ Tutup
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {avatarOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleSelectAvatarEmoji(emoji)}
                  className="w-12 h-12 text-2xl rounded-xl border-2 border-black flex items-center justify-center bg-white hover:bg-yellow-200 transition-all hover:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Theme Picker */}
        {showThemePicker && (
          <div
            className="p-5 rounded-2xl animate-comic-pop"
            style={{ border: "4px solid #0a0a0a", background: "#fffdf5", boxShadow: "5px 5px 0 #0a0a0a" }}
          >
            <h3 className="font-black mb-4" style={{ fontFamily: "'Bangers', cursive", fontSize: "1.2rem" }}>
              🎨 PILIH TEMA BANNER HEADER (TABLE: praktikan.header_picture)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {headerThemes.map((t) => (
                <button
                  key={t.id}
                  className="p-3 rounded-xl flex flex-col items-center gap-2"
                  style={{
                    background: t.bg,
                    border: selectedTheme.id === t.id ? "4px solid #22C55E" : "3px solid #0a0a0a",
                    boxShadow: selectedTheme.id === t.id ? "3px 3px 0 #22C55E" : "2px 2px 0 #0a0a0a",
                  }}
                  onClick={() => {
                    setSelectedTheme(t)
                    setShowThemePicker(false)
                  }}
                >
                  <span style={{ color: t.text, fontFamily: "'Bangers', cursive", fontSize: "0.8rem", fontWeight: 900 }}>
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Real Dynamic Calculated Attendance & Stats Cards (Calculated from Absensi and Kuis tables) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="comic-card p-4">
            <div
              className="inline-block px-2 py-0.5 text-xs font-black mb-2 rounded"
              style={{ background: "#22C55E", color: "#fff", border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
            >
              KEHADIRAN TERHITUNG
            </div>
            <div className="text-3xl font-black" style={{ fontFamily: "'Bangers', cursive" }}>
              ✅ {attSummary.hadir} <span className="text-base text-gray-500 font-sans">/ {attSummary.totalPertemuan}</span>
            </div>
            <p className="text-xs font-bold text-gray-600 mt-1">
              Tingkat kehadiran: <strong className="text-green-700">{attSummary.percentage}%</strong>
            </p>
          </div>

          <div className="comic-card p-4">
            <div
              className="inline-block px-2 py-0.5 text-xs font-black mb-2 rounded"
              style={{ background: "#18B5D8", color: "#fff", border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
            >
              KUIS SELESAI
            </div>
            <div className="text-3xl font-black" style={{ fontFamily: "'Bangers', cursive" }}>
              🧠 {kuisSummary.totalKuis} <span className="text-base text-gray-500 font-sans">/ 14</span>
            </div>
            <p className="text-xs font-bold text-gray-600 mt-1">
              Rata-rata skor: <strong className="text-cyan-700">{kuisSummary.avgScore} pts</strong>
            </p>
          </div>

          <div className="comic-card p-4">
            <div
              className="inline-block px-2 py-0.5 text-xs font-black mb-2 rounded"
              style={{ background: "#FFE033", color: "#0a0a0a", border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
            >
              KEAKTIFAN KELAS
            </div>
            <div className="text-3xl font-black" style={{ fontFamily: "'Bangers', cursive" }}>
              ⭐ {keaktifanSummary.totalPoin} <span className="text-base text-gray-500 font-sans">pts</span>
            </div>
            <p className="text-xs font-bold text-gray-600 mt-1">
              {keaktifanSummary.totalBertanya} tanya · {keaktifanSummary.totalMenjawab} jawab
            </p>
          </div>

          <div className="comic-card p-4">
            <div
              className="inline-block px-2 py-0.5 text-xs font-black mb-2 rounded"
              style={{ background: "#7C3AED", color: "#fff", border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
            >
              STATUS MAHASISWA
            </div>
            <div className="text-2xl font-black mt-1" style={{ fontFamily: "'Bangers', cursive" }}>
              🟢 AKTIF
            </div>
            <p className="text-xs font-bold text-gray-600 mt-1">
              NIM: <strong className="font-mono text-purple-700">{currentUser.nim}</strong>
            </p>
          </div>
        </div>

        {/* Navigation Tabs between Profile, ER Database View, and Attendance Checklist */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab("profile")}
            className={`comic-btn text-sm px-4 py-2 ${activeTab === "profile" ? "comic-btn-primary" : "comic-btn-white"}`}
          >
            👤 Informasi Profil
          </button>
          <button
            onClick={() => setActiveTab("database_erd")}
            className={`comic-btn text-sm px-4 py-2 ${activeTab === "database_erd" ? "comic-btn-primary" : "comic-btn-white"}`}
          >
            🗄️ Relational Database (ERD Data Inspector)
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`comic-btn text-sm px-4 py-2 ${activeTab === "attendance" ? "comic-btn-primary" : "comic-btn-white"}`}
          >
            📋 Rincian Kehadiran 14 Pertemuan
          </button>
        </div>

        {/* Tab 1: Profile Info */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="comic-panel">
              <div className="comic-panel-header">👤 INFORMASI PRAKTIKAN (RELATIONAL DATA)</div>
              <div className="p-5 space-y-4">
                {[
                  { label: "Nama Lengkap", value: currentUser.nama, icon: "📛" },
                  { label: "NIM (Nomor Induk Mahasiswa)", value: currentUser.nim, icon: "🪪" },
                  { label: "Email Kampus", value: currentUser.email, icon: "📧" },
                  { label: "Kelas & Angkatan", value: currentUser.kelas, icon: "🏫" },
                  { label: "Role Sistem", value: currentUser.role === "asprak" ? "Asisten Praktikum" : "Praktikan Mahasiswa", icon: "🎓" },
                  { label: "Inisial / Avatar", value: currentUser.profile_picture || currentUser.avatar, icon: "🎨" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-[#0a0a0a]/50">{item.label}</p>
                      <p className="font-black text-sm text-[#0a0a0a]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="comic-panel">
              <div className="comic-panel-header flex items-center justify-between">
                <span>✏️ BIO PRAKTIKAN</span>
                <button
                  className="text-sm font-black text-[#FFE033]"
                  onClick={() => {
                    if (editingBio) handleSaveBio()
                    else setEditingBio(true)
                  }}
                >
                  {editingBio ? "✅ Simpan" : "✏️ Edit"}
                </button>
              </div>
              <div className="p-5">
                {editingBio ? (
                  <textarea
                    className="w-full p-3 text-sm font-bold rounded-xl resize-none"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    style={{ border: "2.5px solid #0a0a0a" }}
                  />
                ) : (
                  <p className="font-bold text-sm">{currentUser.bio || bio}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: ER Relational Database Inspector */}
        {activeTab === "database_erd" && (
          <div className="space-y-6">
            <div
              className="p-5 rounded-2xl"
              style={{ background: "#7C3AED", border: "4px solid #0a0a0a", boxShadow: "5px 5px 0 #0a0a0a" }}
            >
              <h3 className="text-2xl text-white font-black" style={{ fontFamily: "'Bangers', cursive" }}>
                🗄️ STRUKTUR DATABASE SESUAI SCHEMA ERD
              </h3>
              <p className="text-white/80 text-xs font-bold mt-1">
                Data profil ini terhubung langsung ke entitas skema database: praktikan, pertemuan, absensi, kuis_hasil, dan keaktifan.
              </p>
            </div>

            {/* Table praktikan Row */}
            <div className="comic-panel">
              <div className="comic-panel-header flex items-center justify-between">
                <span>📦 TABLE: praktikan (1 Tuple / Record)</span>
                <span className="text-xs font-mono">PRIMARY KEY (id) = {currentUser.id}</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-xs font-bold border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-black">
                      <th className="p-2 text-left">id</th>
                      <th className="p-2 text-left">nim (UNIQUE)</th>
                      <th className="p-2 text-left">nama</th>
                      <th className="p-2 text-left">password</th>
                      <th className="p-2 text-left">profile_picture</th>
                      <th className="p-2 text-left">header_picture</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 font-mono font-black">{currentUser.id}</td>
                      <td className="p-2 font-mono text-purple-700">{currentUser.nim}</td>
                      <td className="p-2">{currentUser.nama}</td>
                      <td className="p-2 font-mono text-gray-400">•••••••• (encrypted)</td>
                      <td className="p-2">{currentUser.profile_picture || "NULL"}</td>
                      <td className="p-2">{currentUser.header_picture || "NULL"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table absensi Records for this Student */}
            <div className="comic-panel">
              <div className="comic-panel-header flex items-center justify-between">
                <span>📅 TABLE: absensi (14 Tuples Terhitung)</span>
                <span className="text-xs font-mono">FK praktikan_id = {currentUser.id}</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-xs font-bold border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-black">
                      <th className="p-2 text-left">id</th>
                      <th className="p-2 text-left">pertemuan_id</th>
                      <th className="p-2 text-left">Topik Pertemuan</th>
                      <th className="p-2 text-left">waktu_absen</th>
                      <th className="p-2 text-left">status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {studentAbsensi.map((a) => (
                      <tr key={a.id} className={a.status === "Hadir" ? "bg-green-50/50" : ""}>
                        <td className="p-2 font-mono">{a.id}</td>
                        <td className="p-2 font-mono text-center">{a.pertemuan_id}</td>
                        <td className="p-2">{a.pertemuan.topik_pertemuan}</td>
                        <td className="p-2 font-mono text-gray-500">{a.waktu_absen}</td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-black ${
                              a.status === "Hadir"
                                ? "bg-green-500 text-white"
                                : a.status === "Izin"
                                ? "bg-blue-500 text-white"
                                : a.status === "Sakit"
                                ? "bg-yellow-400 text-black"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table kuis_hasil & keaktifan */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="comic-panel">
                <div className="comic-panel-header">🧠 TABLE: kuis_hasil ({studentKuisHasil.length} Records)</div>
                <div className="p-3 max-h-60 overflow-y-auto">
                  <table className="w-full text-xs font-bold border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-b border-black">
                        <th className="p-1.5 text-left">kuis_id</th>
                        <th className="p-1.5 text-center">benar</th>
                        <th className="p-1.5 text-center">salah</th>
                        <th className="p-1.5 text-right">skor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentKuisHasil.map((k) => (
                        <tr key={k.id} className="border-b border-gray-100">
                          <td className="p-1.5 font-mono">Quiz #{k.kuis_id}</td>
                          <td className="p-1.5 text-center text-green-600 font-bold">{k.jumlah_benar}</td>
                          <td className="p-1.5 text-center text-red-500 font-bold">{k.jumlah_salah}</td>
                          <td className="p-1.5 text-right font-black text-purple-700">{k.skor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="comic-panel">
                <div className="comic-panel-header">💬 TABLE: keaktifan ({studentKeaktifan.length} Records)</div>
                <div className="p-3 max-h-60 overflow-y-auto">
                  <table className="w-full text-xs font-bold border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-b border-black">
                        <th className="p-1.5 text-left">pertemuan_id</th>
                        <th className="p-1.5 text-center">bertanya</th>
                        <th className="p-1.5 text-center">menjawab</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentKeaktifan.map((ke) => (
                        <tr key={ke.id} className="border-b border-gray-100">
                          <td className="p-1.5 font-mono">Pertemuan #{ke.pertemuan_id}</td>
                          <td className="p-1.5 text-center font-bold">{ke.jumlah_bertanya} kali</td>
                          <td className="p-1.5 text-center font-bold text-blue-600">{ke.jumlah_menjawab} kali</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Detailed 14 Attendance Check */}
        {activeTab === "attendance" && (
          <div className="comic-panel">
            <div className="comic-panel-header flex items-center justify-between">
              <span>📋 STATUS ABSENSI 14 PERTEMUAN (INITIAL: 5 HADIR)</span>
              <span className="text-xs font-bold">
                Total Hadir: {attSummary.hadir} / {attSummary.totalPertemuan}
              </span>
            </div>
            <div className="p-4 grid gap-3 sm:grid-cols-2">
              {studentAbsensi.map((a) => (
                <div
                  key={a.id}
                  className={`p-3 rounded-xl border-2 flex items-center justify-between ${
                    a.status === "Hadir"
                      ? "bg-green-50 border-green-500"
                      : "bg-gray-50 border-gray-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black px-1.5 py-0.5 rounded bg-black text-yellow-300">
                        M{a.pertemuan_id}
                      </span>
                      <span className="font-black text-sm">{a.pertemuan.topik_pertemuan}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-bold mt-1">
                      {a.waktu_absen !== "-" ? `Tercatat: ${a.waktu_absen}` : "Belum ada presensi"}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 text-xs font-black rounded-lg border ${
                      a.status === "Hadir"
                        ? "bg-green-500 text-white border-green-600"
                        : "bg-gray-200 text-gray-600 border-gray-400"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Return Button */}
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
