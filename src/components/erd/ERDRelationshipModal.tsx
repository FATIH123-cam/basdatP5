import { useState } from "react"
import { ERDTable } from "../../data/erdTemplates"

interface Props {
  open: boolean
  onClose: () => void
  tables: ERDTable[]
  onCreateRelationship: (params: {
    sourceTableId: string
    sourceColumnId: string
    targetTableId: string
    targetColumnId: string
    cardinality: "1:1" | "1:N" | "N:1" | "N:N"
    autoCreateForeignKey: boolean
  }) => void
}

export default function ERDRelationshipModal({
  open,
  onClose,
  tables,
  onCreateRelationship,
}: Props) {
  const [sourceTableId, setSourceTableId] = useState<string>(tables[0]?.id || "")
  const [targetTableId, setTargetTableId] = useState<string>(tables[1]?.id || tables[0]?.id || "")
  const [sourceColId, setSourceColId] = useState<string>("")
  const [targetColId, setTargetColId] = useState<string>("")
  const [cardinality, setCardinality] = useState<"1:1" | "1:N" | "N:1" | "N:N">("1:N")
  const [autoCreateFK, setAutoCreateFK] = useState<boolean>(true)

  if (!open) return null

  const sourceTable = tables.find((t) => t.id === sourceTableId) || tables[0]
  const targetTable = tables.find((t) => t.id === targetTableId) || tables[1] || tables[0]

  const effectiveSourceColId =
    sourceColId || sourceTable?.columns.find((c) => c.isPrimaryKey)?.id || sourceTable?.columns[0]?.id || ""
  const effectiveTargetColId =
    targetColId || targetTable?.columns[0]?.id || ""

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!sourceTableId || !targetTableId) {
      alert("Pilih tabel sumber dan tabel target!")
      return
    }

    onCreateRelationship({
      sourceTableId,
      sourceColumnId: effectiveSourceColId,
      targetTableId,
      targetColumnId: effectiveTargetColId,
      cardinality,
      autoCreateForeignKey: autoCreateFK,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full p-6 rounded-3xl bg-[#fffdf5] animate-comic-pop"
        style={{
          border: "5px solid #0a0a0a",
          boxShadow: "10px 10px 0 #0a0a0a",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black/15">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔗</span>
            <h3
              className="text-2xl font-black uppercase text-[#0a0a0a]"
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
            >
              TAMBAH RELATIONSHIP
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="comic-btn text-xs py-1.5 px-3 bg-red-500 text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Source Table & Column */}
          <div className="p-3.5 rounded-2xl bg-blue-50 border-2 border-blue-300 space-y-2">
            <span className="text-xs font-black uppercase text-blue-900 block">
              1. TABEL SUMBER (PARENT / PK):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Tabel:
                </label>
                <select
                  value={sourceTableId}
                  onChange={(e) => setSourceTableId(e.target.value)}
                  className="w-full p-2 text-xs font-bold border border-black rounded-lg bg-white"
                >
                  {tables.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Kolom (PK):
                </label>
                <select
                  value={effectiveSourceColId}
                  onChange={(e) => setSourceColId(e.target.value)}
                  className="w-full p-2 text-xs font-bold border border-black rounded-lg bg-white"
                >
                  {sourceTable?.columns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.isPrimaryKey ? "(PK)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Cardinality Selector */}
          <div>
            <label
              className="block text-xs font-black uppercase text-slate-700 mb-1.5"
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
            >
              2. KARDINALITAS (HUBUNGAN RELASI):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["1:1", "1:N", "N:1", "N:N"] as const).map((card) => (
                <button
                  key={card}
                  type="button"
                  onClick={() => setCardinality(card)}
                  className={`py-2 px-3 rounded-xl text-xs font-black border-2 transition-all ${
                    cardinality === card
                      ? "bg-[#FFE033] border-black scale-105 shadow-sm text-black"
                      : "bg-white border-slate-300 text-slate-700 hover:border-black"
                  }`}
                  style={{ fontFamily: "'Bangers', cursive" }}
                >
                  {card}
                </button>
              ))}
            </div>
          </div>

          {/* Target Table & Column */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2">
            <span className="text-xs font-black uppercase text-amber-900 block">
              3. TABEL TARGET (CHILD / FK):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Tabel:
                </label>
                <select
                  value={targetTableId}
                  onChange={(e) => setTargetTableId(e.target.value)}
                  className="w-full p-2 text-xs font-bold border border-black rounded-lg bg-white"
                >
                  {tables.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Kolom Target:
                </label>
                <select
                  value={effectiveTargetColId}
                  onChange={(e) => setTargetColId(e.target.value)}
                  className="w-full p-2 text-xs font-bold border border-black rounded-lg bg-white"
                >
                  {targetTable?.columns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.isForeignKey ? "(FK)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Auto Foreign Key Generator Checkbox (C4 Requirement) */}
          <div className="p-3 bg-white rounded-xl border-2 border-black flex items-start gap-2.5">
            <input
              type="checkbox"
              id="auto-fk"
              checked={autoCreateFK}
              onChange={(e) => setAutoCreateFK(e.target.checked)}
              className="accent-indigo-600 w-4 h-4 mt-0.5"
            />
            <label htmlFor="auto-fk" className="text-xs font-bold text-slate-800 cursor-pointer">
              <span className="font-black text-indigo-700 block">
                ✨ Buat Kolom Foreign Key Otomatis
              </span>
              Sistem akan otomatis menambahkan kolom FK (misal:{" "}
              <code className="bg-slate-100 px-1 rounded text-red-600">
                {sourceTable?.name}_id
              </code>
              ) pada tabel <strong>{targetTable?.name}</strong>.
            </label>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t-2 border-black flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="comic-btn comic-btn-white text-xs py-2 px-4"
            >
              Batal
            </button>

            <button
              type="submit"
              className="comic-btn comic-btn-primary text-sm py-2 px-6"
            >
              🔗 Hubungkan Tabel Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
