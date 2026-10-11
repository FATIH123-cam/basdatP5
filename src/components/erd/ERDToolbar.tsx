import { useState } from "react"
import { ERDTemplateItem, ERD_TEMPLATES } from "../../data/erdTemplates"

interface Props {
  onAddTable: () => void
  onOpenAddRelationship: () => void
  onSelectTemplate: (template: ERDTemplateItem) => void
  onAutoArrange: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  zoomLevel: number
  onSaveProject: () => void
  onExportPNG: () => void
  onExportJSON: () => void
  onImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void
  onOpenSQLModal: () => void
  projectName: string
  onChangeProjectName: (name: string) => void
}

export default function ERDToolbar({
  onAddTable,
  onOpenAddRelationship,
  onSelectTemplate,
  onAutoArrange,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  zoomLevel,
  onSaveProject,
  onExportPNG,
  onExportJSON,
  onImportJSON,
  onOpenSQLModal,
  projectName,
  onChangeProjectName,
}: Props) {
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false)
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false)

  return (
    <div
      className="p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3"
      style={{
        background: "#FFE033",
        border: "3.5px solid #0a0a0a",
        boxShadow: "5px 5px 0 #0a0a0a",
      }}
    >
      {/* Left: Project Title & Main Add Tools */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border-2 border-black">
          <span className="text-lg">🗄️</span>
          <input
            type="text"
            value={projectName}
            onChange={(e) => onChangeProjectName(e.target.value)}
            className="text-sm font-black text-[#0a0a0a] bg-transparent outline-none w-44 sm:w-56"
            placeholder="Nama Database ERD..."
          />
        </div>

        {/* Add Table Button */}
        <button
          type="button"
          onClick={onAddTable}
          className="comic-btn text-xs py-2 px-3.5 bg-black text-white hover:bg-zinc-800"
          style={{ border: "2px solid #0a0a0a", boxShadow: "2px 2px 0 #0a0a0a" }}
        >
          ➕ Tabel Baru
        </button>

        {/* Add Relationship Button */}
        <button
          type="button"
          onClick={onOpenAddRelationship}
          className="comic-btn text-xs py-2 px-3.5 bg-[#1B72D4] text-white hover:bg-blue-600"
          style={{ border: "2px solid #0a0a0a", boxShadow: "2px 2px 0 #0a0a0a" }}
        >
          🔗 Relationship
        </button>

        {/* Template Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setTemplateDropdownOpen(!templateDropdownOpen)}
            className="comic-btn text-xs py-2 px-3.5 bg-white text-[#0a0a0a] hover:bg-slate-100"
            style={{ border: "2px solid #0a0a0a", boxShadow: "2px 2px 0 #0a0a0a" }}
          >
            📚 Template ERD ▾
          </button>

          {templateDropdownOpen && (
            <div
              className="absolute left-0 top-full mt-2 w-72 p-2 rounded-2xl bg-[#fffdf5] border-3 border-black shadow-xl z-50 space-y-1"
              style={{ boxShadow: "6px 6px 0 #0a0a0a" }}
            >
              <p
                className="text-xs font-black uppercase text-slate-500 px-3 py-1 border-b border-black/10"
                style={{ fontFamily: "'Bangers', cursive" }}
              >
                PILIH TEMPLATE DATABASE:
              </p>
              {ERD_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => {
                    onSelectTemplate(tpl)
                    setTemplateDropdownOpen(false)
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-yellow-200 transition-colors flex items-start gap-2.5 border border-transparent hover:border-black"
                >
                  <span className="text-xl">{tpl.emoji}</span>
                  <div>
                    <p className="text-xs font-black text-slate-900 leading-tight">
                      {tpl.name}
                    </p>
                    <p className="text-[11px] font-bold text-slate-600 leading-tight mt-0.5">
                      {tpl.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center & Right: Canvas Utilities & Export Tools */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Auto Arrange */}
        <button
          type="button"
          onClick={onAutoArrange}
          title="Tata letak otomatis agar tidak bertumpuk"
          className="comic-btn text-xs py-2 px-3 bg-white text-[#0a0a0a]"
          style={{ border: "2px solid #0a0a0a", boxShadow: "2px 2px 0 #0a0a0a" }}
        >
          📐 Auto Arrange
        </button>

        {/* Zoom Controls */}
        <div className="flex items-center bg-white rounded-xl border-2 border-black p-0.5 shadow-sm">
          <button
            type="button"
            onClick={onZoomOut}
            className="w-7 h-7 flex items-center justify-center font-black text-sm hover:bg-slate-100 rounded"
          >
            -
          </button>
          <button
            type="button"
            onClick={onResetZoom}
            className="px-2 text-xs font-black"
            title="Reset Zoom"
          >
            {Math.round(zoomLevel * 100)}%
          </button>
          <button
            type="button"
            onClick={onZoomIn}
            className="w-7 h-7 flex items-center justify-center font-black text-sm hover:bg-slate-100 rounded"
          >
            +
          </button>
        </div>

        {/* Generate SQL Button */}
        <button
          type="button"
          onClick={onOpenSQLModal}
          className="comic-btn text-xs py-2 px-3 bg-[#22C55E] text-white hover:bg-emerald-600"
          style={{ border: "2px solid #0a0a0a", boxShadow: "2px 2px 0 #0a0a0a" }}
        >
          ⚡ SQL DDL
        </button>

        {/* Export Menu Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
            className="comic-btn text-xs py-2 px-3 bg-[#E8212A] text-white hover:bg-red-600"
            style={{ border: "2px solid #0a0a0a", boxShadow: "2px 2px 0 #0a0a0a" }}
          >
            💾 Simpan / Export ▾
          </button>

          {exportDropdownOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-56 p-2 rounded-2xl bg-[#fffdf5] border-3 border-black shadow-xl z-50 space-y-1"
              style={{ boxShadow: "6px 6px 0 #0a0a0a" }}
            >
              <button
                type="button"
                onClick={() => {
                  onSaveProject()
                  setExportDropdownOpen(false)
                }}
                className="w-full text-left p-2 rounded-xl text-xs font-black text-slate-800 hover:bg-yellow-200 flex items-center gap-2"
              >
                <span>💾</span> Simpan di Browser (LocalStorage)
              </button>

              <button
                type="button"
                onClick={() => {
                  onExportPNG()
                  setExportDropdownOpen(false)
                }}
                className="w-full text-left p-2 rounded-xl text-xs font-black text-slate-800 hover:bg-yellow-200 flex items-center gap-2"
              >
                <span>📸</span> Export Diagram (PNG)
              </button>

              <button
                type="button"
                onClick={() => {
                  onExportJSON()
                  setExportDropdownOpen(false)
                }}
                className="w-full text-left p-2 rounded-xl text-xs font-black text-slate-800 hover:bg-yellow-200 flex items-center gap-2"
              >
                <span>📦</span> Export Skema (JSON)
              </button>

              <label className="w-full text-left p-2 rounded-xl text-xs font-black text-slate-800 hover:bg-yellow-200 flex items-center gap-2 cursor-pointer">
                <span>📥</span> Import Skema (JSON)
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => {
                    onImportJSON(e)
                    setExportDropdownOpen(false)
                  }}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
