import { useState } from "react"
import { useNav } from "../context"
import { useDatabase } from "../context/DatabaseContext"
import AppLayout from "../components/AppLayout"

export default function LKPPage() {
  const { navigate } = useNav()
  const { lkpList, pertemuanList } = useDatabase()
  const [search, setSearch] = useState("")

  const filtered = lkpList.filter((l) =>
    l.judul_lkp.toLowerCase().includes(search.toLowerCase()) ||
    l.ringkasan.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#22C55E", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl text-white font-black" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
                📄 LEMBAR KERJA PRAKTIKUM (LKP 14 PERTEMUAN)
              </h2>
              <p className="font-bold text-white/90 text-sm mt-1">
                Topik LKP sesuai silabus praktikum basis data. Akses link dikendalikan oleh Asisten Praktikum.
              </p>
            </div>
            <div
              className="px-3 py-1.5 rounded-xl bg-black text-[#FFE033] text-xs font-black border-2 border-white"
              style={{ fontFamily: "'Bangers', cursive" }}
            >
              TOTAL: 14 LKP
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="🔍 Cari LKP berdasarkan topik atau nomor pertemuan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 text-sm font-bold rounded-xl border-3 border-black bg-white"
            style={{ border: "2.5px solid #0a0a0a" }}
          />
        </div>

        {/* LKP grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((lkp) => {
            const hasLink = lkp.file_url !== null && lkp.file_url.trim() !== ""
            const isAccessible = hasLink && lkp.is_open
            const meeting = pertemuanList.find((p) => p.id === lkp.pertemuan_id)

            return (
              <div
                key={lkp.id}
                className="comic-card p-5 flex flex-col justify-between hover:scale-[1.01] transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    <span
                      className="text-xs font-black px-2 py-0.5 rounded"
                      style={{
                        background: "#18B5D8",
                        color: "#fff",
                        border: "2px solid #0a0a0a",
                        fontFamily: "'Bangers', cursive",
                      }}
                    >
                      PERTEMUAN #{lkp.pertemuan_id}
                    </span>

                    {/* Status Badge */}
                    {isAccessible ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-green-500 text-white border border-black">
                        🔓 LKP TERBUKA
                      </span>
                    ) : hasLink ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-500 text-white border border-black">
                        🔒 AKSES DITUTUP ASPRAK
                      </span>
                    ) : (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-yellow-400 text-black border border-black">
                        🔒 BELUM DIUNGGAH ASPRAK
                      </span>
                    )}
                  </div>

                  <h3
                    className="font-black text-lg text-[#0a0a0a] leading-tight"
                    style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.03em" }}
                  >
                    {lkp.judul_lkp}
                  </h3>
                  <p className="text-xs text-[#0a0a0a]/70 font-bold mt-1">
                    {lkp.ringkasan}
                  </p>
                  <p className="text-[11px] text-gray-400 font-bold mt-1.5">
                    Jadwal Pertemuan: {meeting?.date} · Topik: {meeting?.topik_pertemuan}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-gray-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-500">
                    <span>📁 Format: {lkp.file_type}</span>
                    {lkp.file_size && <span>({lkp.file_size})</span>}
                  </div>

                  {isAccessible ? (
                    <a
                      href={lkp.file_url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="comic-btn comic-btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5"
                    >
                      <span>Unduh LKP</span>
                      <span>📥</span>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="comic-btn text-xs px-3 py-1.5 bg-gray-200 text-gray-500 border border-gray-400 cursor-not-allowed opacity-75"
                      title={hasLink ? "Akses LKP ditutup oleh Asprak" : "Link LKP belum diunggah oleh Asprak"}
                    >
                      {hasLink ? "🔒 Akses Ditutup" : "🔒 Belum Diunggah"}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

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
