import { useState } from "react"
import AppLayout from "../components/AppLayout"
import { materials } from "../data/mockData"

export default function MaterialsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Semua")
  const [detailId, setDetailId] = useState<number | null>(null)

  const categories = [
    "Semua",
    ...Array.from(new Set(materials.map((m) => m.category))),
  ]
  const filtered = materials.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.summary.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === "Semua" || m.category === category
    return matchSearch && matchCat
  })

  const detail = materials.find((m) => m.id === detailId)

  if (detail) {
    return (
      <AppLayout>
        <button
          onClick={() => setDetailId(null)}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-6"
        >
          ← Kembali ke Materi
        </button>
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">
              {detail.category}
            </span>
            <span className="text-xs text-slate-500">
              Pertemuan {detail.meetingId}
            </span>
            {detail.completed && (
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                ✓ Selesai
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {detail.title}
          </h2>
          <p className="text-slate-500 text-sm mb-6">{detail.date}</p>

          <p className="text-slate-700 leading-relaxed mb-6">
            {detail.summary}
          </p>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-6">
            <h3 className="font-bold text-indigo-900 mb-3">
              🎯 Tujuan Pembelajaran
            </h3>
            <ul className="space-y-2">
              {detail.objectives.map((o, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-indigo-800"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="flex-shrink-0 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">
            <h3 className="font-bold text-slate-900 mb-3">🔑 Konsep Kunci</h3>
            <div className="flex flex-wrap gap-2">
              {detail.concepts.map((c) => (
                <span
                  key={c}
                  className="bg-slate-100 text-slate-700 text-sm px-3 py-1.5 rounded-xl font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-slate-500 text-xs ml-2">
                contoh_kode.py
              </span>
            </div>
            <pre className="text-emerald-400 text-sm font-mono leading-relaxed overflow-x-auto">
              {`# Contoh implementasi ${detail.title}
# Pertemuan ${detail.meetingId} — Praktikum Ilkom

def contoh_fungsi(parameter):
    """
    Fungsi contoh untuk ${detail.category}
    """
    hasil = parameter * 2
    return hasil

# Eksekusi
if __name__ == "__main__":
    output = contoh_fungsi(10)
    print(f"Hasil: {output}")  # Output: Hasil: 20`}
            </pre>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm">
              ⬇ Unduh Materi
            </button>
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors text-sm">
              Tandai Selesai
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Materi & Rangkuman</h2>
        <p className="text-slate-500 text-sm mt-1">
          Pelajari ringkasan materi setiap pertemuan praktikum.
        </p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari materi..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                category === c
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((m) => (
          <div
            key={m.id}
            onClick={() => setDetailId(m.id)}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                    {m.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    Prt. {m.meetingId}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {m.title}
                </h3>
              </div>
              {m.completed ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="flex-shrink-0"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ) : (
                <div className="w-5 h-5 border-2 border-slate-300 rounded-full flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {m.summary}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {m.concepts.slice(0, 3).map((c) => (
                <span
                  key={c}
                  className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-lg"
                >
                  {c}
                </span>
              ))}
              {m.concepts.length > 3 && (
                <span className="text-xs text-slate-400 py-1">
                  +{m.concepts.length - 3}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
