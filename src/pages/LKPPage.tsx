import { useState } from "react"
import { useNav } from "../context"
import { lkpList } from "../data/mockData"
import AppLayout from "../components/AppLayout"

export default function LKPPage() {
  const { navigate } = useNav()
  const [filter, setFilter] = useState<"all" | "sebelum" | "setelah">("all")

  const filtered = filter === "all" ? lkpList : lkpList.filter(l => l.type === filter)

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#22C55E", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
        >
          <h2 className="text-3xl text-white" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
            📄 LEMBAR KERJA PRAKTIKUM
          </h2>
          <p className="font-bold text-white/80 text-sm mt-1">
            Download & kerjakan LKP sebelum dan sesudah praktikum
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-3">
          {[
            { key: "all", label: "Semua" },
            { key: "sebelum", label: "📘 Sebelum Praktikum" },
            { key: "setelah", label: "📗 Setelah Praktikum" },
          ].map((f) => (
            <button
              key={f.key}
              className={`comic-btn text-sm px-4 py-2 ${filter === f.key ? "comic-btn-primary" : "comic-btn-white"}`}
              onClick={() => setFilter(f.key as typeof filter)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* LKP grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((lkp) => (
            <div
              key={lkp.id}
              className="comic-card p-5 flex items-start gap-4"
            >
              <div
                className="w-12 h-14 rounded-xl flex flex-col items-center justify-center shrink-0"
                style={{
                  background: lkp.fileType === "PDF" ? "#E8212A" : "#1B72D4",
                  border: "2.5px solid #0a0a0a",
                  boxShadow: "2px 2px 0 #0a0a0a",
                }}
              >
                <span className="text-xs font-black text-white">{lkp.fileType}</span>
                <span className="text-xs text-white/70">{lkp.fileSize}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-black px-2 py-0.5 rounded"
                    style={{
                      background: lkp.type === "sebelum" ? "#18B5D8" : "#22C55E",
                      color: "#fff",
                      border: "2px solid #0a0a0a",
                      fontFamily: "'Bangers', cursive",
                    }}
                  >
                    {lkp.type === "sebelum" ? "SEBELUM" : "SETELAH"}
                  </span>
                  {lkp.completed && (
                    <span className="text-xs font-bold text-[#22C55E]">✅ Selesai</span>
                  )}
                </div>
                <p className="font-black text-sm">{lkp.title}</p>
                <p className="text-xs text-[#0a0a0a]/60 font-bold mt-0.5">{lkp.desc}</p>
                <p className="text-xs text-[#0a0a0a]/40 font-bold mt-1">{lkp.date}</p>
              </div>
              <button
                className="comic-btn comic-btn-primary text-xs px-3 py-1.5 shrink-0"
                onClick={() => alert(`Download ${lkp.title}`)}
              >
                ⬇️
              </button>
            </div>
          ))}
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
