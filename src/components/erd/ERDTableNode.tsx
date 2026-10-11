import React from "react"
import { ERDTable } from "../../data/erdTemplates"

interface Props {
  table: ERDTable
  isSelected: boolean
  onSelectTable: (tableId: string) => void
  onStartDrag: (e: React.MouseEvent, tableId: string) => void
  onAddColumn: (tableId: string) => void
  onDeleteTable: (tableId: string) => void
}

export default function ERDTableNode({
  table,
  isSelected,
  onSelectTable,
  onStartDrag,
  onAddColumn,
  onDeleteTable,
}: Props) {
  return (
    <div
      id={`table-node-${table.id}`}
      onClick={(e) => {
        e.stopPropagation()
        onSelectTable(table.id)
      }}
      className={`absolute select-none rounded-2xl overflow-hidden transition-shadow duration-100 ${
        isSelected ? "ring-4 ring-emerald-500 scale-[1.01]" : ""
      }`}
      style={{
        left: `${table.position.x}px`,
        top: `${table.position.y}px`,
        width: "280px",
        background: "#fffdf5",
        border: isSelected ? "3.5px solid #059669" : "3.5px solid #0a0a0a",
        boxShadow: isSelected ? "6px 6px 0 #059669" : "5px 5px 0 #0a0a0a",
        cursor: "grab",
      }}
    >
      {/* Table Header (Drag Handle) */}
      <div
        onMouseDown={(e) => onStartDrag(e, table.id)}
        className="p-2.5 flex items-center justify-between cursor-grab active:cursor-grabbing text-white"
        style={{
          background: isSelected ? "#059669" : "#0a0a0a",
          borderBottom: "2.5px solid #0a0a0a",
        }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base">🗄️</span>
          <span
            className="text-base font-black uppercase truncate tracking-wide"
            style={{ fontFamily: "'Bangers', cursive" }}
          >
            {table.name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Tambah Kolom Cepat"
            onClick={(e) => {
              e.stopPropagation()
              onAddColumn(table.id)
            }}
            className="w-6 h-6 rounded bg-[#FFE033] text-black font-black text-xs flex items-center justify-center hover:bg-yellow-300"
          >
            +
          </button>
          <button
            type="button"
            title="Hapus Tabel"
            onClick={(e) => {
              e.stopPropagation()
              if (confirm(`Hapus tabel "${table.name}"?`)) {
                onDeleteTable(table.id)
              }
            }}
            className="w-6 h-6 rounded bg-red-600 text-white font-black text-xs flex items-center justify-center hover:bg-red-700"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Columns List */}
      <div className="divide-y divide-black/10 bg-white">
        {table.columns.length === 0 ? (
          <div className="p-3 text-center text-xs font-bold text-slate-400">
            Belum ada kolom. Klik (+) untuk tambah.
          </div>
        ) : (
          table.columns.map((col) => (
            <div
              key={col.id}
              className="px-3 py-2 flex items-center justify-between text-xs font-bold hover:bg-yellow-50 transition-colors"
            >
              {/* Left: Key badges + Column Name */}
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                {col.isPrimaryKey && (
                  <span
                    className="px-1.5 py-0.2 rounded text-[10px] font-black bg-[#FFE033] text-black border border-black"
                    title="Primary Key"
                  >
                    PK
                  </span>
                )}
                {col.isForeignKey && (
                  <span
                    className="px-1.5 py-0.2 rounded text-[10px] font-black bg-[#1B72D4] text-white border border-black"
                    title="Foreign Key"
                  >
                    FK
                  </span>
                )}
                {col.isUnique && !col.isPrimaryKey && (
                  <span
                    className="px-1 py-0.2 rounded text-[9px] font-black bg-purple-100 text-purple-800 border border-purple-300"
                    title="Unique Value"
                  >
                    UQ
                  </span>
                )}
                <span
                  className={`truncate ${
                    col.isPrimaryKey
                      ? "text-black font-black"
                      : "text-slate-800"
                  }`}
                >
                  {col.name}
                </span>
              </div>

              {/* Right: Data Type & Nullable */}
              <div className="flex items-center gap-1.5 text-right pl-2">
                <span className="text-[11px] font-bold text-indigo-700">
                  {col.dataType}
                </span>
                {!col.isNullable && !col.isPrimaryKey && (
                  <span className="text-[9px] text-red-600 font-black" title="Not Null">
                    *
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Footer Info */}
      <div className="p-1.5 bg-[#fffdf5] border-t border-black/10 flex items-center justify-between text-[10px] font-bold text-slate-500">
        <span>{table.columns.length} Kolom</span>
        <span className="text-indigo-600">Klik utk edit ➔</span>
      </div>
    </div>
  )
}
