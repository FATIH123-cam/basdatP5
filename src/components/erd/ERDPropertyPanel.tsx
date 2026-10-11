import { ERDColumn, ERDTable, DataType } from "../../data/erdTemplates"

interface Props {
  selectedTable: ERDTable | null
  onRenameTable: (tableId: string, newName: string) => void
  onAddColumn: (tableId: string) => void
  onUpdateColumn: (
    tableId: string,
    columnId: string,
    updates: Partial<ERDColumn>,
  ) => void
  onDeleteColumn: (tableId: string, columnId: string) => void
  onDeleteTable: (tableId: string) => void
}

const DATA_TYPES: DataType[] = [
  "INTEGER",
  "BIGINT",
  "VARCHAR(50)",
  "VARCHAR(100)",
  "VARCHAR(255)",
  "TEXT",
  "BOOLEAN",
  "DATE",
  "TIMESTAMP",
  "DECIMAL(10,2)",
]

export default function ERDPropertyPanel({
  selectedTable,
  onRenameTable,
  onAddColumn,
  onUpdateColumn,
  onDeleteColumn,
  onDeleteTable,
}: Props) {
  if (!selectedTable) {
    return (
      <div
        className="p-5 rounded-3xl text-center flex flex-col items-center justify-center h-full min-h-[350px]"
        style={{
          background: "#fffdf5",
          border: "4px solid #0a0a0a",
          boxShadow: "6px 6px 0 #0a0a0a",
        }}
      >
        <div className="text-4xl mb-3 animate-comic-bounce">👆🗄️</div>
        <h4
          className="text-lg font-black uppercase text-[#0a0a0a]"
          style={{ fontFamily: "'Bangers', cursive" }}
        >
          PROPERTY INSPECTOR
        </h4>
        <p className="text-xs font-bold text-slate-500 max-w-xs mt-1">
          Klik salah satu tabel di canvas untuk mengedit nama tabel, menambah/mengubah kolom, tipe data, dan constraint primary key.
        </p>
      </div>
    )
  }

  return (
    <div
      className="p-5 rounded-3xl flex flex-col justify-between"
      style={{
        background: "#fffdf5",
        border: "4px solid #0a0a0a",
        boxShadow: "6px 6px 0 #0a0a0a",
      }}
    >
      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black/15">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <h4
              className="text-xl font-black uppercase text-[#0a0a0a]"
              style={{ fontFamily: "'Bangers', cursive" }}
            >
              PROPERTI TABEL
            </h4>
          </div>

          <button
            type="button"
            onClick={() => {
              if (confirm(`Hapus tabel "${selectedTable.name}"?`)) {
                onDeleteTable(selectedTable.id)
              }
            }}
            className="comic-btn text-xs py-1 px-2.5 bg-red-500 text-white"
          >
            🗑️ Hapus
          </button>
        </div>

        {/* Table Name Field */}
        <div className="mb-4">
          <label
            className="block text-xs font-black uppercase text-slate-700 mb-1"
            style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
          >
            🏷️ NAMA TABEL:
          </label>
          <input
            type="text"
            value={selectedTable.name}
            onChange={(e) => onRenameTable(selectedTable.id, e.target.value)}
            className="w-full px-3 py-2 text-sm font-black border-2 border-black rounded-xl bg-white"
            placeholder="nama_tabel..."
          />
        </div>

        {/* Columns Header & Add button */}
        <div className="flex items-center justify-between mb-2">
          <label
            className="text-xs font-black uppercase text-slate-700"
            style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
          >
            📋 DAFTAR KOLOM ({selectedTable.columns.length}):
          </label>

          <button
            type="button"
            onClick={() => onAddColumn(selectedTable.id)}
            className="comic-btn comic-btn-primary text-xs py-1 px-2.5"
          >
            + Tambah Kolom
          </button>
        </div>

        {/* Columns Editor List */}
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {selectedTable.columns.map((col, idx) => (
            <div
              key={col.id}
              className="p-2.5 rounded-xl bg-white border-2 border-black space-y-2 shadow-xs"
            >
              {/* Row 1: Name & Type & Delete */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black text-slate-400 w-4">
                  #{idx + 1}
                </span>

                <input
                  type="text"
                  value={col.name}
                  onChange={(e) =>
                    onUpdateColumn(selectedTable.id, col.id, {
                      name: e.target.value,
                    })
                  }
                  className="flex-1 px-2 py-1 text-xs font-bold border border-black/40 rounded-lg"
                  placeholder="nama_kolom"
                />

                <select
                  value={col.dataType}
                  onChange={(e) =>
                    onUpdateColumn(selectedTable.id, col.id, {
                      dataType: e.target.value as DataType,
                    })
                  }
                  className="px-2 py-1 text-xs font-bold border border-black/40 rounded-lg bg-slate-50"
                >
                  {DATA_TYPES.map((dt) => (
                    <option key={dt} value={dt}>
                      {dt}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  title="Hapus kolom"
                  onClick={() => onDeleteColumn(selectedTable.id, col.id)}
                  className="w-6 h-6 rounded bg-red-100 text-red-700 font-black text-xs flex items-center justify-center hover:bg-red-200 border border-red-300"
                >
                  ✕
                </button>
              </div>

              {/* Row 2: Constraint Checkboxes */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-bold text-slate-800 border-t border-black/10">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={col.isPrimaryKey}
                    onChange={(e) =>
                      onUpdateColumn(selectedTable.id, col.id, {
                        isPrimaryKey: e.target.checked,
                        isNullable: e.target.checked ? false : col.isNullable,
                        isUnique: e.target.checked ? true : col.isUnique,
                      })
                    }
                    className="accent-yellow-400 w-3.5 h-3.5"
                  />
                  <span className="font-black text-black">PK</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={col.isForeignKey}
                    onChange={(e) =>
                      onUpdateColumn(selectedTable.id, col.id, {
                        isForeignKey: e.target.checked,
                      })
                    }
                    className="accent-blue-500 w-3.5 h-3.5"
                  />
                  <span className="text-blue-700 font-bold">FK</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={col.isUnique}
                    onChange={(e) =>
                      onUpdateColumn(selectedTable.id, col.id, {
                        isUnique: e.target.checked,
                      })
                    }
                    className="accent-purple-500 w-3.5 h-3.5"
                  />
                  <span>UNIQUE</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!col.isNullable}
                    onChange={(e) =>
                      onUpdateColumn(selectedTable.id, col.id, {
                        isNullable: !e.target.checked,
                      })
                    }
                    className="accent-red-500 w-3.5 h-3.5"
                  />
                  <span>NOT NULL</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t-2 border-black/15 text-center">
        <p className="text-[11px] font-bold text-slate-500">
          Perubahan langsung otomatis tersinkronisasi di canvas.
        </p>
      </div>
    </div>
  )
}
