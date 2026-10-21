import { useState } from "react"
import { useNav } from "../context"
import { useDatabase } from "../context/DatabaseContext"
import { announcements } from "../data/mockData"
import AppLayout from "../components/AppLayout"

type ContentTab = "meetings" | "lkp" | "materials" | "quiz" | "announcements" | "settings"

export default function AdminContentPage() {
  const { page, navigate } = useNav()
  const {
    pertemuanList,
    materiList,
    lkpList,
    updateMateriLink,
    toggleMateriAccess,
    updateLKPLink,
    toggleLKPAccess,
    praktikanList,
    asprakList,
    absensiList,
    resetDatabaseToDefault,
  } = useDatabase()

  const [activeTab, setActiveTab] = useState<ContentTab>(
    page === "admin-meetings" ? "meetings" :
    page === "admin-lkp" ? "lkp" :
    page === "admin-materials" ? "materials" :
    page === "admin-quiz" ? "quiz" :
    page === "admin-announcements" ? "announcements" :
    "settings"
  )

  // Editing state for Materi link
  const [editingMateriId, setEditingMateriId] = useState<number | null>(null)
  const [materiInputUrl, setMateriInputUrl] = useState("")

  // Editing state for LKP link
  const [editingLkpId, setEditingLkpId] = useState<number | null>(null)
  const [lkpInputUrl, setLkpInputUrl] = useState("")

  // Notification message
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const tabs: { key: ContentTab; label: string; icon: string }[] = [
    { key: "materials", label: "Link & Akses Materi", icon: "📖" },
    { key: "lkp", label: "Link & Akses LKP", icon: "📄" },
    { key: "meetings", label: "Jadwal Pertemuan (14)", icon: "📅" },
    { key: "quiz", label: "Kuis", icon: "🧠" },
    { key: "announcements", label: "Pengumuman", icon: "📢" },
    { key: "settings", label: "Database / Reset", icon: "⚙️" },
  ]

  const handleStartEditMateri = (id: number, currentUrl: string | null) => {
    setEditingMateriId(id)
    setMateriInputUrl(currentUrl || "")
  }

  const handleSaveMateri = (pertemuanId: number) => {
    const trimmed = materiInputUrl.trim()
    const finalUrl = trimmed === "" ? null : trimmed
    updateMateriLink(pertemuanId, finalUrl)
    setEditingMateriId(null)
    showToast(`✅ Link materi Pertemuan #${pertemuanId} berhasil diperbarui!`)
  }

  const handleSetMateriNull = (pertemuanId: number) => {
    updateMateriLink(pertemuanId, null, false)
    setEditingMateriId(null)
    showToast(`🗑️ Link materi Pertemuan #${pertemuanId} diatur ke NULL (tidak ada).`)
  }

  const handleStartEditLKP = (id: number, currentUrl: string | null) => {
    setEditingLkpId(id)
    setLkpInputUrl(currentUrl || "")
  }

  const handleSaveLKP = (pertemuanId: number) => {
    const trimmed = lkpInputUrl.trim()
    const finalUrl = trimmed === "" ? null : trimmed
    updateLKPLink(pertemuanId, finalUrl)
    setEditingLkpId(null)
    showToast(`✅ Link LKP Pertemuan #${pertemuanId} berhasil diperbarui!`)
  }

  const handleSetLKPNull = (pertemuanId: number) => {
    updateLKPLink(pertemuanId, null, false)
    setEditingLkpId(null)
    showToast(`🗑️ Link LKP Pertemuan #${pertemuanId} diatur ke NULL (tidak ada).`)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#7C3AED", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div
                className="inline-block px-2.5 py-0.5 text-xs font-black rounded mb-2 bg-[#FFE033] text-black border border-black"
                style={{ fontFamily: "'Bangers', cursive" }}
              >
                DASHBOARD ASPRAK — MANAJEMEN KONTEN
              </div>
              <h2 className="text-3xl text-white font-black" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
                ⚙️ KELOLA LINK MATERI & LKP (14 PERTEMUAN)
              </h2>
              <p className="font-bold text-white/80 text-sm mt-1">
                Semua link awalnya NULL dan tidak dapat diakses praktikan sampai Asprak menambahkan link & membuka aksesnya.
              </p>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div
            className="p-3 rounded-xl border-3 border-black bg-[#22C55E] text-white font-black text-sm flex items-center justify-between animate-comic-pop"
            style={{ boxShadow: "3px 3px 0 #0a0a0a" }}
          >
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-xs bg-black/20 px-2 py-0.5 rounded">
              ✕
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`comic-btn text-sm px-4 py-2 ${activeTab === t.key ? "comic-btn-primary" : "comic-btn-white"}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: MATERI MANAGEMENT */}
        {activeTab === "materials" && (
          <div className="comic-panel">
            <div className="comic-panel-header flex items-center justify-between flex-wrap gap-2">
              <span>📖 KELOLA LINK & AKSES MATERI (14 PERTEMUAN DARI CSV)</span>
              <span className="text-xs font-bold text-[#FFE033]">
                Status Default: NULL (Terkunci)
              </span>
            </div>

            <div className="divide-y divide-[#0a0a0a]/10 max-h-[700px] overflow-y-auto">
              {materiList.map((m) => {
                const meeting = pertemuanList.find((p) => p.id === m.pertemuan_id)
                const isEditing = editingMateriId === m.id
                const hasLink = m.file_url !== null && m.file_url.trim() !== ""

                return (
                  <div key={m.id} className="p-4 space-y-3 hover:bg-yellow-50/30 transition-colors">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0"
                          style={{
                            background: m.is_open ? "#22C55E" : "#FFE033",
                            color: m.is_open ? "#fff" : "#0a0a0a",
                            border: "2px solid #0a0a0a",
                            fontFamily: "'Bangers', cursive",
                          }}
                        >
                          #{m.pertemuan_id}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-black text-sm text-[#0a0a0a]">{m.judul_materi}</h4>
                            <span className="text-[10px] bg-gray-200 text-gray-700 font-bold px-1.5 py-0.5 rounded">
                              {m.category}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 font-bold mt-0.5">
                            Topik: {meeting?.topik_pertemuan} · {meeting?.date}
                          </p>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {hasLink ? (
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300">
                            🔗 Link Ada
                          </span>
                        ) : (
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-600 border border-gray-400">
                            ❌ NULL (Belum Ada Link)
                          </span>
                        )}

                        {m.is_open ? (
                          <span className="text-xs font-black px-2 py-0.5 rounded bg-green-500 text-white border border-black">
                            🔓 AKSES DIBUKA
                          </span>
                        ) : (
                          <span className="text-xs font-black px-2 py-0.5 rounded bg-red-500 text-white border border-black">
                            🔒 AKSES DITUTUP
                          </span>
                        )}
                      </div>
                    </div>

                    {/* URL Display or Edit Form */}
                    {isEditing ? (
                      <div className="p-3 rounded-xl bg-gray-50 border-2 border-black space-y-2">
                        <label className="text-xs font-black text-gray-700">
                          Masukkan URL Link Materi (Google Drive / GitHub / PDF link):
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={materiInputUrl}
                            onChange={(e) => setMateriInputUrl(e.target.value)}
                            placeholder="https://drive.google.com/file/d/... atau https://..."
                            className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg border-2 border-black bg-white"
                          />
                          <button
                            onClick={() => handleSaveMateri(m.pertemuan_id)}
                            className="comic-btn comic-btn-primary text-xs px-3 py-1"
                          >
                            💾 Simpan
                          </button>
                          <button
                            onClick={() => handleSetMateriNull(m.pertemuan_id)}
                            className="comic-btn text-xs px-2.5 py-1 bg-red-100 text-red-800 border border-red-500"
                            title="Set link menjadi NULL"
                          >
                            Set Null
                          </button>
                          <button
                            onClick={() => setEditingMateriId(null)}
                            className="comic-btn comic-btn-white text-xs px-2.5 py-1"
                          >
                            Batal
                          </button>
                        </div>
                        {/* Demo Template link for quick test */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-500 font-bold">Contoh cepat:</span>
                          <button
                            onClick={() =>
                              setMateriInputUrl(
                                `https://basdat.univ.ac.id/materi/pertemuan-${m.pertemuan_id}.pdf`
                              )
                            }
                            className="text-[10px] text-purple-700 underline font-bold"
                          >
                            Gunakan Contoh URL Materi #{m.pertemuan_id}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-3 text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-200 flex-wrap">
                        <div className="truncate max-w-md font-mono">
                          {hasLink ? (
                            <span className="text-blue-700 truncate underline">{m.file_url}</span>
                          ) : (
                            <span className="text-gray-400 italic">Link materi belum diset (NULL). Praktikan belum dapat mengakses.</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Toggle Access Button */}
                          <button
                            onClick={() => {
                              toggleMateriAccess(m.pertemuan_id)
                              showToast(
                                m.is_open
                                  ? `🔒 Akses materi Pertemuan #${m.pertemuan_id} DITUTUP.`
                                  : `🔓 Akses materi Pertemuan #${m.pertemuan_id} DIBUKA untuk praktikan.`
                              )
                            }}
                            className={`comic-btn text-xs px-3 py-1 ${
                              m.is_open
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                          >
                            {m.is_open ? "🔒 Tutup Akses" : "🔓 Buka Akses"}
                          </button>

                          {/* Edit / Add Link Button */}
                          <button
                            onClick={() => handleStartEditMateri(m.id, m.file_url)}
                            className="comic-btn comic-btn-white text-xs px-2.5 py-1"
                          >
                            ✏️ {hasLink ? "Ubah Link" : "+ Tambah Link"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB 2: LKP MANAGEMENT */}
        {activeTab === "lkp" && (
          <div className="comic-panel">
            <div className="comic-panel-header flex items-center justify-between flex-wrap gap-2">
              <span>📄 KELOLA LINK & AKSES LKP (14 PERTEMUAN DARI CSV)</span>
              <span className="text-xs font-bold text-[#FFE033]">
                Status Default: NULL (Terkunci)
              </span>
            </div>

            <div className="divide-y divide-[#0a0a0a]/10 max-h-[700px] overflow-y-auto">
              {lkpList.map((lkp) => {
                const meeting = pertemuanList.find((p) => p.id === lkp.pertemuan_id)
                const isEditing = editingLkpId === lkp.id
                const hasLink = lkp.file_url !== null && lkp.file_url.trim() !== ""

                return (
                  <div key={lkp.id} className="p-4 space-y-3 hover:bg-yellow-50/30 transition-colors">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0"
                          style={{
                            background: lkp.is_open ? "#22C55E" : "#18B5D8",
                            color: "#fff",
                            border: "2px solid #0a0a0a",
                            fontFamily: "'Bangers', cursive",
                          }}
                        >
                          #{lkp.pertemuan_id}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-black text-sm text-[#0a0a0a]">{lkp.judul_lkp}</h4>
                            <span className="text-[10px] bg-gray-200 text-gray-700 font-bold px-1.5 py-0.5 rounded">
                              Format: {lkp.file_type}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 font-bold mt-0.5">
                            Topik: {meeting?.topik_pertemuan} · {meeting?.date}
                          </p>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {hasLink ? (
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300">
                            🔗 Link Ada
                          </span>
                        ) : (
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-600 border border-gray-400">
                            ❌ NULL (Belum Ada Link)
                          </span>
                        )}

                        {lkp.is_open ? (
                          <span className="text-xs font-black px-2 py-0.5 rounded bg-green-500 text-white border border-black">
                            🔓 LKP TERBUKA
                          </span>
                        ) : (
                          <span className="text-xs font-black px-2 py-0.5 rounded bg-red-500 text-white border border-black">
                            🔒 AKSES DITUTUP
                          </span>
                        )}
                      </div>
                    </div>

                    {/* URL Display or Edit Form */}
                    {isEditing ? (
                      <div className="p-3 rounded-xl bg-gray-50 border-2 border-black space-y-2">
                        <label className="text-xs font-black text-gray-700">
                          Masukkan URL Link LKP untuk mahasiswa (PDF / DOCX download link):
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={lkpInputUrl}
                            onChange={(e) => setLkpInputUrl(e.target.value)}
                            placeholder="https://drive.google.com/file/d/... atau https://..."
                            className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg border-2 border-black bg-white"
                          />
                          <button
                            onClick={() => handleSaveLKP(lkp.pertemuan_id)}
                            className="comic-btn comic-btn-primary text-xs px-3 py-1"
                          >
                            💾 Simpan
                          </button>
                          <button
                            onClick={() => handleSetLKPNull(lkp.pertemuan_id)}
                            className="comic-btn text-xs px-2.5 py-1 bg-red-100 text-red-800 border border-red-500"
                            title="Set link menjadi NULL"
                          >
                            Set Null
                          </button>
                          <button
                            onClick={() => setEditingLkpId(null)}
                            className="comic-btn comic-btn-white text-xs px-2.5 py-1"
                          >
                            Batal
                          </button>
                        </div>
                        {/* Demo Template link for quick test */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-500 font-bold">Contoh cepat:</span>
                          <button
                            onClick={() =>
                              setLkpInputUrl(
                                `https://basdat.univ.ac.id/lkp/lkp-pertemuan-${lkp.pertemuan_id}.pdf`
                              )
                            }
                            className="text-[10px] text-purple-700 underline font-bold"
                          >
                            Gunakan Contoh URL LKP #{lkp.pertemuan_id}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-3 text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-200 flex-wrap">
                        <div className="truncate max-w-md font-mono">
                          {hasLink ? (
                            <span className="text-blue-700 truncate underline">{lkp.file_url}</span>
                          ) : (
                            <span className="text-gray-400 italic">Link LKP belum diset (NULL). Praktikan belum dapat mengunduh.</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Toggle Access Button */}
                          <button
                            onClick={() => {
                              toggleLKPAccess(lkp.pertemuan_id)
                              showToast(
                                lkp.is_open
                                  ? `🔒 Akses LKP Pertemuan #${lkp.pertemuan_id} DITUTUP.`
                                  : `🔓 Akses LKP Pertemuan #${lkp.pertemuan_id} DIBUKA untuk praktikan.`
                              )
                            }}
                            className={`comic-btn text-xs px-3 py-1 ${
                              lkp.is_open
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                          >
                            {lkp.is_open ? "🔒 Tutup Akses" : "🔓 Buka Akses"}
                          </button>

                          {/* Edit / Add Link Button */}
                          <button
                            onClick={() => handleStartEditLKP(lkp.id, lkp.file_url)}
                            className="comic-btn comic-btn-white text-xs px-2.5 py-1"
                          >
                            ✏️ {hasLink ? "Ubah Link" : "+ Tambah Link"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB 3: MEETINGS SCHEDULE */}
        {activeTab === "meetings" && (
          <div className="comic-panel">
            <div className="comic-panel-header flex items-center justify-between">
              <span>📅 DAFTAR 14 PERTEMUAN (DARI FILE.CSV)</span>
              <span className="text-xs font-mono">14 Sesi Lengkap</span>
            </div>
            <div className="divide-y divide-[#0a0a0a]/10 max-h-[600px] overflow-y-auto">
              {pertemuanList.map((m) => (
                <div key={m.id} className="flex items-center gap-4 px-4 py-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-black shrink-0"
                    style={{ background: "#FFE033", border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                  >
                    {m.minggu_ke}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm">{m.title}</p>
                    <p className="text-xs text-[#0a0a0a]/50 font-bold">
                      Jadwal: {m.date} · Topik: {m.topik_pertemuan}
                    </p>
                  </div>
                  <div className="text-xs font-mono font-bold bg-green-100 text-green-800 px-2 py-1 rounded">
                    Terdaftar di DB
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: QUIZ TAB */}
        {activeTab === "quiz" && (
          <div className="comic-panel">
            <div className="comic-panel-header">🧠 KUIS PERTEMUAN 1 S.D. 14</div>
            <div className="p-5 space-y-3">
              <p className="text-xs font-bold text-gray-700">
                Data kuis terhubung dengan tabel <code>kuis</code> dan <code>kuis_hasil</code> untuk menghitung leaderboard dan skor profil praktikan.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {pertemuanList.map((m) => (
                  <div key={m.id} className="p-3 rounded-xl border-2 border-black bg-white flex items-center justify-between">
                    <div>
                      <p className="font-black text-xs">Quiz #{m.id}: {m.topik_pertemuan}</p>
                      <p className="text-[10px] text-gray-500 font-bold">10 Pertanyaan · Durasi: 15 menit</p>
                    </div>
                    <span className="text-xs font-black bg-yellow-300 px-2 py-0.5 rounded border border-black">
                      Aktif
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ANNOUNCEMENTS */}
        {activeTab === "announcements" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button className="comic-btn comic-btn-primary text-sm">+ Buat Pengumuman</button>
            </div>
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="comic-card p-5"
                style={ann.important ? { borderColor: "#E8212A", boxShadow: "4px 4px 0 #E8212A" } : {}}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {ann.important && (
                        <span
                          className="text-xs font-black px-2 py-0.5 rounded"
                          style={{ background: "#E8212A", color: "#fff", border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                        >
                          ❗ PENTING
                        </span>
                      )}
                    </div>
                    <h4 className="font-black text-sm">{ann.title}</h4>
                    <p className="text-xs text-[#0a0a0a]/60 font-bold mt-1">{ann.body}</p>
                    <p className="text-xs text-[#0a0a0a]/40 font-bold mt-2">
                      {ann.author} · {ann.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: SETTINGS / DATABASE RESET */}
        {activeTab === "settings" && (
          <div className="comic-panel">
            <div className="comic-panel-header">⚙️ STATUS DATABASE & RESET</div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl border border-gray-300 bg-white">
                  <p className="text-xs text-gray-500 font-bold">Total Praktikan</p>
                  <p className="text-xl font-black">{praktikanList.length} Orang</p>
                </div>
                <div className="p-3 rounded-xl border border-gray-300 bg-white">
                  <p className="text-xs text-gray-500 font-bold">Total Asprak</p>
                  <p className="text-xl font-black">{asprakList.length} Orang</p>
                </div>
                <div className="p-3 rounded-xl border border-gray-300 bg-white">
                  <p className="text-xs text-gray-500 font-bold">Total Pertemuan</p>
                  <p className="text-xl font-black">{pertemuanList.length} Sesi</p>
                </div>
                <div className="p-3 rounded-xl border border-gray-300 bg-white">
                  <p className="text-xs text-gray-500 font-bold">Total Records Presensi</p>
                  <p className="text-xl font-black">{absensiList.length} Baris</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-50 border-2 border-red-400 space-y-2">
                <h4 className="font-black text-sm text-red-800">⚠️ Reset Database ke Data Awal</h4>
                <p className="text-xs font-bold text-red-700">
                  Mengembalikan semua link materi & LKP ke null/terkunci, dan mengembalikan inisialisasi presensi mahasiswa ke default (5 kehadiran).
                </p>
                <button
                  onClick={() => {
                    if (window.confirm("Apakah Anda yakin ingin mereset database ke nilai default awal?")) {
                      resetDatabaseToDefault()
                      showToast("✅ Database berhasil direset ke data awal!")
                    }
                  }}
                  className="comic-btn comic-btn-danger text-xs px-4 py-2"
                >
                  🔄 Reset Database Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

        <button className="comic-btn comic-btn-white" onClick={() => navigate("admin-dashboard")}>
          ← Kembali ke Dashboard Asprak
        </button>
      </div>
    </AppLayout>
  )
}
