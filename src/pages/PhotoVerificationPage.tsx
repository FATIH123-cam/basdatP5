import { useState } from "react"
import { useNav } from "../context"
import { useDatabase } from "../context/DatabaseContext"
import AppLayout from "../components/AppLayout"

export default function PhotoVerificationPage() {
  const { navigate } = useNav()
  const { praktikanList, setStudentMeetingAttendance } = useDatabase()

  // Generate verification strips from real praktikan
  const [strips, setStrips] = useState(() =>
    praktikanList.slice(0, 10).map((s, idx) => ({
      id: s.id,
      name: s.nama,
      nim: s.nim,
      meeting: 5,
      status: idx < 3 ? "menunggu-verifikasi" : idx < 7 ? "hadir" : "ditolak",
      stripColor: ["#FFE033", "#18B5D8", "#E8212A", "#22C55E", "#7C3AED"][idx % 5],
      submittedAt: `2026-09-30 08:${15 + idx * 5}`,
      photos: [1, 2, 3].map(i => ({ pose: ["normal", "lucu", "serius"][i - 1], idx: i })),
    }))
  )
  const [selectedStrip, setSelectedStrip] = useState<any | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [showRejectModal, setShowRejectModal] = useState(false)

  const handleApprove = (id: number) => {
    setStrips(prev => prev.map(s => s.id === id ? { ...s, status: "hadir" } : s))
    setStudentMeetingAttendance(id, 5, "Hadir")
    setSelectedStrip(null)
  }

  const handleReject = (id: number) => {
    if (!rejectReason.trim()) {
      alert("Masukkan alasan penolakan!")
      return
    }
    setStrips(prev => prev.map(s => s.id === id ? { ...s, status: "ditolak" } : s))
    setStudentMeetingAttendance(id, 5, "Alpa")
    setSelectedStrip(null)
    setShowRejectModal(false)
    setRejectReason("")
  }

  const pending = strips.filter(s => s.status === "menunggu-verifikasi")
  const approved = strips.filter(s => s.status === "hadir")
  const rejected = strips.filter(s => s.status === "ditolak")

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#E8212A", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
        >
          <h2 className="text-3xl text-white" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
            📸 VERIFIKASI PHOTO STRIP
          </h2>
          <p className="font-bold text-white/80 text-sm mt-1">
            {pending.length} foto menunggu verifikasi
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Menunggu", count: pending.length, color: "#FFE033", text: "#0a0a0a" },
            { label: "Disetujui", count: approved.length, color: "#22C55E", text: "#fff" },
            { label: "Ditolak", count: rejected.length, color: "#E8212A", text: "#fff" },
          ].map((s, i) => (
            <div key={i} className="comic-card p-4 text-center">
              <div
                className="text-3xl font-black"
                style={{ fontFamily: "'Bangers', cursive", color: "#0a0a0a" }}
              >
                {s.count}
              </div>
              <div className="text-xs font-bold mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pending strips */}
        {pending.length > 0 && (
          <div>
            <h3 className="font-black mb-3" style={{ fontFamily: "'Bangers', cursive", fontSize: "1.1rem" }}>
              ⏳ MENUNGGU VERIFIKASI
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pending.map((strip) => (
                <div
                  key={strip.id}
                  className="comic-card p-4 cursor-pointer hover:scale-[1.02] transition-transform"
                  onClick={() => setSelectedStrip(strip)}
                >
                  {/* Simulated photo strip */}
                  <div
                    className="rounded-xl p-3 mb-3 flex flex-col gap-2"
                    style={{ background: strip.stripColor, border: "3px solid #0a0a0a" }}
                  >
                    {strip.photos.map((p) => (
                      <div
                        key={p.idx}
                        className="h-16 rounded-lg flex items-center justify-center font-black text-sm"
                        style={{ background: "rgba(255,255,255,0.3)", border: "2px solid #0a0a0a" }}
                      >
                        📷 Pose {p.pose}
                      </div>
                    ))}
                    <div className="text-center text-xs font-black" style={{ fontFamily: "'Bangers', cursive" }}>
                      PRAKTIKUM BASDAT
                    </div>
                  </div>

                  <p className="font-black text-sm">{strip.name}</p>
                  <p className="text-xs text-[#0a0a0a]/60 font-bold">{strip.nim}</p>
                  <p className="text-xs text-[#0a0a0a]/40 font-bold mt-1">{strip.submittedAt}</p>

                  <div className="flex gap-2 mt-3">
                    <button
                      className="comic-btn flex-1 text-xs py-1.5"
                      style={{ background: "#22C55E", color: "#fff" }}
                      onClick={(e) => { e.stopPropagation(); handleApprove(strip.id) }}
                    >
                      ✅ Setujui
                    </button>
                    <button
                      className="comic-btn comic-btn-danger flex-1 text-xs py-1.5"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedStrip(strip)
                        setShowRejectModal(true)
                      }}
                    >
                      ❌ Tolak
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved */}
        {approved.length > 0 && (
          <div>
            <h3 className="font-black mb-3" style={{ fontFamily: "'Bangers', cursive", fontSize: "1.1rem" }}>
              ✅ SUDAH DISETUJUI
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {approved.map((strip) => (
                <div
                  key={strip.id}
                  className="comic-card p-3 flex items-center gap-3 opacity-70"
                >
                  <div
                    className="w-12 h-16 rounded-lg shrink-0"
                    style={{ background: strip.stripColor, border: "2px solid #0a0a0a" }}
                  />
                  <div>
                    <p className="font-black text-sm">{strip.name}</p>
                    <p className="text-xs text-[#0a0a0a]/50 font-bold">{strip.nim}</p>
                    <span
                      className="text-xs font-black px-2 py-0.5 rounded mt-1 inline-block"
                      style={{ background: "#22C55E", color: "#fff", border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                    >
                      ✅ HADIR
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reject modal */}
        {showRejectModal && selectedStrip && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-md p-6 rounded-2xl animate-comic-pop"
              style={{ background: "#fffdf5", border: "4px solid #0a0a0a", boxShadow: "8px 8px 0 #E8212A" }}
            >
              <h3 className="text-2xl mb-4" style={{ fontFamily: "'Bangers', cursive" }}>
                ❌ TOLAK FOTO: {selectedStrip.name}
              </h3>
              <p className="text-sm font-bold mb-3 text-[#0a0a0a]/70">Berikan alasan penolakan (wajib diisi):</p>
              <textarea
                className="w-full p-3 text-sm font-bold rounded-xl resize-none"
                rows={4}
                placeholder="Contoh: Wajah tidak terlihat jelas, foto buram, dll."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                style={{ border: "2.5px solid #0a0a0a" }}
              />
              <div className="flex gap-3 mt-4">
                <button
                  className="comic-btn comic-btn-white flex-1"
                  onClick={() => { setShowRejectModal(false); setRejectReason("") }}
                >
                  Batal
                </button>
                <button
                  className="comic-btn comic-btn-danger flex-[2]"
                  onClick={() => handleReject(selectedStrip.id)}
                >
                  ❌ Tolak Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

        <button className="comic-btn comic-btn-white" onClick={() => navigate("admin-dashboard")}>
          ← Kembali ke Dashboard
        </button>
      </div>
    </AppLayout>
  )
}
