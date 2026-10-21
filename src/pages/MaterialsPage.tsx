import { useState } from "react"
import AppLayout from "../components/AppLayout"
import { useDatabase } from "../context/DatabaseContext"
import { useNav } from "../context"

export default function MaterialsPage() {
  const { navigate } = useNav()
  const { materiList, pertemuanList } = useDatabase()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Semua")
  const [detailId, setDetailId] = useState<number | null>(null)

  const categories = [
    "Semua",
    ...Array.from(new Set(materiList.map((m) => m.category))),
  ]

  const filtered = materiList.filter((m) => {
    const matchSearch =
      m.judul_materi.toLowerCase().includes(search.toLowerCase()) ||
      m.ringkasan.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === "Semua" || m.category === category
    return matchSearch && matchCat
  })

  const detail = materiList.find((m) => m.id === detailId)
  const detailMeeting = detail
    ? pertemuanList.find((p) => p.id === detail.pertemuan_id)
    : null

  if (detail) {
    const hasLink = detail.file_url !== null && detail.file_url.trim() !== ""
    const isAccessible = hasLink && detail.is_open

    return (
      <AppLayout>
        <div className="space-y-6 max-w-4xl">
          <button
            onClick={() => setDetailId(null)}
            className="comic-btn comic-btn-white text-xs px-3 py-1.5 flex items-center gap-1.5"
          >
            ← Kembali ke Daftar Materi
          </button>

          {/* Header Card */}
          <div
            className="p-6 rounded-2xl"
            style={{
              background: "#18B5D8",
              border: "4px solid #0a0a0a",
              boxShadow: "6px 6px 0 #0a0a0a",
            }}
          >
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="text-xs font-black px-2.5 py-1 rounded"
                style={{ background: "#FFE033", color: "#0a0a0a", border: "2px solid #0a0a0a" }}
              >
                Pertemuan #{detail.pertemuan_id}
              </span>
              <span
                className="text-xs font-black px-2.5 py-1 rounded"
                style={{ background: "#0a0a0a", color: "#fff" }}
              >
                {detail.category}
              </span>

              {/* Status Badge */}
              {isAccessible ? (
                <span className="text-xs font-black px-2.5 py-1 rounded bg-green-500 text-white border-2 border-black">
                  🔓 AKSES TERBUKA
                </span>
              ) : hasLink ? (
                <span className="text-xs font-black px-2.5 py-1 rounded bg-red-500 text-white border-2 border-black">
                  🔒 AKSES DITUTUP ASPRAK
                </span>
              ) : (
                <span className="text-xs font-black px-2.5 py-1 rounded bg-yellow-400 text-black border-2 border-black">
                  🔒 LINK BELUM DIUNGGAH ASPRAK
                </span>
              )}
            </div>

            <h2
              className="text-3xl text-white font-black"
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
            >
              Materi: {detail.judul_materi}
            </h2>
            <p className="text-white/80 text-xs font-bold mt-1">
              Topik Pertemuan: {detailMeeting?.topik_pertemuan} · Tanggal: {detailMeeting?.date}
            </p>
          </div>

          {/* Access Box */}
          <div
            className="p-5 rounded-xl border-3 border-black"
            style={{
              background: isAccessible ? "#F0FDF4" : "#FEF2F2",
              border: "3px solid #0a0a0a",
              boxShadow: "4px 4px 0 #0a0a0a",
            }}
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h4 className="font-black text-sm" style={{ fontFamily: "'Bangers', cursive" }}>
                  {isAccessible
                    ? "📥 LINK MATERI KULIAH RESMI"
                    : hasLink
                    ? "🔒 AKSES MATERI DIKUNCI"
                    : "🔒 LINK MATERI BELUM TERSEDIA"}
                </h4>
                <p className="text-xs font-bold text-gray-700 mt-0.5">
                  {isAccessible
                    ? "Materi telah diunggah dan dibuka oleh asisten praktikum."
                    : hasLink
                    ? "Link materi sudah ditambahkan oleh asprak, namun akses untuk mahasiswa saat ini ditutup."
                    : "Link materi diset NULL (belum diunggah). Menunggu asisten praktikum menambahkannya dari dashboard asprak."}
                </p>
              </div>

              {isAccessible ? (
                <a
                  href={detail.file_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comic-btn comic-btn-primary text-sm px-4 py-2 shrink-0 flex items-center gap-2"
                >
                  <span>📥 Buka / Unduh Materi</span>
                  <span>↗️</span>
                </a>
              ) : (
                <button
                  disabled
                  className="comic-btn text-xs px-3 py-2 bg-gray-200 text-gray-500 border-2 border-gray-400 cursor-not-allowed shrink-0"
                >
                  🔒 Belum Dapat Diakses
                </button>
              )}
            </div>
          </div>

          {/* Ringkasan */}
          <div className="comic-panel">
            <div className="comic-panel-header">📖 RINGKASAN MATERI</div>
            <div className="p-5 font-bold text-sm text-[#0a0a0a] leading-relaxed">
              {detail.ringkasan}
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="comic-panel">
            <div className="comic-panel-header">🎯 TUJUAN PEMBELAJARAN</div>
            <div className="p-5">
              <ul className="space-y-2">
                {detail.objectives.map((o, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-bold text-gray-800">
                    <span className="text-green-600 font-black">✓</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Concepts */}
          <div className="comic-panel">
            <div className="comic-panel-header">🔑 KONSEP KUNCI</div>
            <div className="p-5 flex flex-wrap gap-2">
              {detail.concepts.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 text-xs font-black rounded-lg border-2 border-black bg-yellow-300 text-black shadow"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#18B5D8", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl text-white font-black" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
                📖 MATERI PRAKTIKUM BASIS DATA (14 PERTEMUAN)
              </h2>
              <p className="font-bold text-white/80 text-sm mt-1">
                Link materi dikendalikan penuh oleh Asisten Praktikum (akses buka/tutup)
              </p>
            </div>
            <div
              className="px-3 py-1.5 rounded-xl bg-black text-[#FFE033] text-xs font-black border-2 border-white"
              style={{ fontFamily: "'Bangers', cursive" }}
            >
              TOTAL: 14 MATERI
            </div>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="🔍 Cari judul materi atau kata kunci..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 text-sm font-bold rounded-xl border-3 border-black bg-white"
            style={{ border: "2.5px solid #0a0a0a" }}
          />

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`comic-btn text-xs px-3 py-2 whitespace-nowrap ${
                  category === cat ? "comic-btn-primary" : "comic-btn-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((m) => {
            const hasLink = m.file_url !== null && m.file_url.trim() !== ""
            const isAccessible = hasLink && m.is_open

            return (
              <div
                key={m.id}
                className="comic-card p-5 flex flex-col justify-between hover:scale-[1.01] transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    <span
                      className="text-xs font-black px-2 py-0.5 rounded"
                      style={{ background: "#FFE033", border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                    >
                      PERTEMUAN #{m.pertemuan_id}
                    </span>

                    {/* Status Badge */}
                    {isAccessible ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-green-500 text-white border border-black">
                        🔓 TERBUKA
                      </span>
                    ) : hasLink ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-500 text-white border border-black">
                        🔒 DITUTUP ASPRAK
                      </span>
                    ) : (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-yellow-400 text-black border border-black">
                        🔒 BELUM ADA LINK
                      </span>
                    )}
                  </div>

                  <h3
                    className="font-black text-lg text-[#0a0a0a] leading-snug"
                    style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.03em" }}
                  >
                    {m.judul_materi}
                  </h3>
                  <p className="text-xs text-gray-600 font-bold mt-1 line-clamp-2">
                    {m.ringkasan}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-gray-100 flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-gray-500">
                    Kategori: {m.category}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setDetailId(m.id)}
                      className="comic-btn comic-btn-white text-xs px-2.5 py-1"
                    >
                      Detail 🔍
                    </button>

                    {isAccessible ? (
                      <a
                        href={m.file_url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="comic-btn comic-btn-primary text-xs px-2.5 py-1 flex items-center gap-1"
                      >
                        <span>Unduh</span>
                        <span>📥</span>
                      </a>
                    ) : (
                      <button
                        disabled
                        className="comic-btn text-xs px-2.5 py-1 bg-gray-200 text-gray-500 border border-gray-400 cursor-not-allowed opacity-75"
                        title={hasLink ? "Akses ditutup oleh Asprak" : "Link belum diunggah oleh Asprak"}
                      >
                        🔒 Terkunci
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Back Button */}
        <button
          className="comic-btn comic-btn-white"
          onClick={() => navigate("student-dashboard")}
        >
          ← Kembali ke Dashboard
        </button>
      </div>
    </AppLayout>
  )
}
