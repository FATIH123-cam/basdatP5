import { useState } from "react"
import { ERDProject, generateSQLScript } from "../../data/erdTemplates"

interface Props {
  open: boolean
  onClose: () => void
  project: ERDProject
}

export default function ERDSqlModal({ open, onClose, project }: Props) {
  const [copied, setCopied] = useState(false)

  if (!open) return null

  const sqlScript = generateSQLScript(project)

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadSql = () => {
    const blob = new Blob([sqlScript], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${project.name.toLowerCase().replace(/\s+/g, "_")}.sql`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full p-6 rounded-3xl bg-[#fffdf5] max-h-[90vh] flex flex-col"
        style={{
          border: "5px solid #0a0a0a",
          boxShadow: "10px 10px 0 #0a0a0a",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black/15">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <h3
              className="text-2xl font-black uppercase text-[#0a0a0a]"
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
            >
              SQL DDL GENERATOR (CREATE TABLE)
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

        {/* Info notice */}
        <div className="p-3 bg-emerald-50 border-2 border-emerald-400 rounded-xl text-emerald-950 text-xs font-bold mb-3 flex items-center justify-between">
          <span>
            ✓ Skema SQL otomatis di-generate dari {project.tables.length} tabel dan {project.relationships.length} relasi.
          </span>
          <span className="font-black text-emerald-800">PostgreSQL / MySQL Ready</span>
        </div>

        {/* Code Editor Preview Box */}
        <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-slate-950 border-3 border-black font-mono text-xs text-emerald-400 leading-relaxed max-h-[400px]">
          <pre>{sqlScript}</pre>
        </div>

        {/* Modal Actions */}
        <div className="mt-4 pt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleDownloadSql}
            className="comic-btn text-xs py-2 px-4 bg-white text-black"
            style={{ border: "2px solid #0a0a0a" }}
          >
            💾 Download File .SQL
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className={`comic-btn text-xs py-2 px-5 ${
                copied ? "bg-emerald-500 text-black font-black" : "comic-btn-primary"
              }`}
            >
              {copied ? "✓ Tersalin ke Clipboard!" : "📋 Copy SQL Script"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
