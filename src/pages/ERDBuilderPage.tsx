import { useState, useCallback, useRef } from "react"
import { useNav } from "../context"
import { ERDProject, ERDTable, ERDColumn, ERDRelationship, ERDTemplateItem, ERD_TEMPLATES, DataType } from "../data/erdTemplates"
import ERDCanvas from "../components/erd/ERDCanvas"
import ERDToolbar from "../components/erd/ERDToolbar"
import ERDPropertyPanel from "../components/erd/ERDPropertyPanel"
import ERDRelationshipModal from "../components/erd/ERDRelationshipModal"
import ERDSqlModal from "../components/erd/ERDSqlModal"
import AppLayout from "../components/AppLayout"

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function createEmptyProject(): ERDProject {
  return {
    id: generateId(),
    name: "Database Baru",
    description: "Skema ERD baru",
    tables: [],
    relationships: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export default function ERDBuilderPage() {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const [project, setProject] = useState<ERDProject>(createEmptyProject())
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null)
  const [showRelationModal, setShowRelationModal] = useState(false)
  const [showSqlModal, setShowSqlModal] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  const selectedTable = project.tables.find(t => t.id === selectedTableId) ?? null

  const updateProject = useCallback((updater: (prev: ERDProject) => ERDProject) => {
    setProject(prev => ({ ...updater(prev), updatedAt: new Date().toISOString() }))
  }, [])

  const addTable = () => {
    const newTable: ERDTable = {
      id: generateId(),
      name: `table_${project.tables.length + 1}`,
      position: { x: 80 + (project.tables.length % 4) * 220, y: 60 + Math.floor(project.tables.length / 4) * 200 },
      columns: [
        {
          id: generateId(),
          name: "id",
          dataType: "INTEGER",
          isPrimaryKey: true,
          isForeignKey: false,
          isUnique: true,
          isNullable: false,
        },
      ],
      color: ["#FFE033", "#18B5D8", "#22C55E", "#E8212A", "#7C3AED"][project.tables.length % 5],
    }
    updateProject(prev => ({ ...prev, tables: [...prev.tables, newTable] }))
    setSelectedTableId(newTable.id)
  }

  const renameTable = (tableId: string, newName: string) => {
    updateProject(prev => ({
      ...prev,
      tables: prev.tables.map(t => t.id === tableId ? { ...t, name: newName } : t),
    }))
  }

  const addColumn = (tableId: string) => {
    const newCol: ERDColumn = {
      id: generateId(),
      name: "column",
      dataType: "VARCHAR(100)" as DataType,
      isPrimaryKey: false,
      isForeignKey: false,
      isUnique: false,
      isNullable: true,
    }
    updateProject(prev => ({
      ...prev,
      tables: prev.tables.map(t => t.id === tableId ? { ...t, columns: [...t.columns, newCol] } : t),
    }))
  }

  const updateColumn = (tableId: string, columnId: string, updates: Partial<ERDColumn>) => {
    updateProject(prev => ({
      ...prev,
      tables: prev.tables.map(t =>
        t.id === tableId
          ? { ...t, columns: t.columns.map(c => c.id === columnId ? { ...c, ...updates } : c) }
          : t
      ),
    }))
  }

  const deleteColumn = (tableId: string, columnId: string) => {
    updateProject(prev => ({
      ...prev,
      tables: prev.tables.map(t =>
        t.id === tableId ? { ...t, columns: t.columns.filter(c => c.id !== columnId) } : t
      ),
    }))
  }

  const deleteTable = (tableId: string) => {
    updateProject(prev => ({
      ...prev,
      tables: prev.tables.filter(t => t.id !== tableId),
      relationships: prev.relationships.filter(r => r.sourceTableId !== tableId && r.targetTableId !== tableId),
    }))
    if (selectedTableId === tableId) setSelectedTableId(null)
  }

  const updateTablePosition = (tableId: string, x: number, y: number) => {
    updateProject(prev => ({
      ...prev,
      tables: prev.tables.map(t => t.id === tableId ? { ...t, position: { x, y } } : t),
    }))
  }

  const deleteRelationship = (relId: string) => {
    updateProject(prev => ({
      ...prev,
      relationships: prev.relationships.filter(r => r.id !== relId),
    }))
  }

  const createRelationship = (params: {
    sourceTableId: string
    sourceColumnId: string
    targetTableId: string
    targetColumnId: string
    cardinality: "1:1" | "1:N" | "N:1" | "N:N"
    autoCreateForeignKey: boolean
  }) => {
    const newRel: ERDRelationship = {
      id: generateId(),
      sourceTableId: params.sourceTableId,
      sourceColumnId: params.sourceColumnId,
      targetTableId: params.targetTableId,
      targetColumnId: params.targetColumnId,
      cardinality: params.cardinality,
    }

    // If autoCreateForeignKey, add FK column to source table
    if (params.autoCreateForeignKey) {
      const targetTable = project.tables.find(t => t.id === params.targetTableId)
      if (targetTable) {
        const fkCol: ERDColumn = {
          id: generateId(),
          name: `${targetTable.name}_id`,
          dataType: "INTEGER",
          isPrimaryKey: false,
          isForeignKey: true,
          isUnique: false,
          isNullable: true,
          foreignKeyTarget: {
            tableId: params.targetTableId,
            columnId: params.targetColumnId,
            tableName: targetTable.name,
            columnName: targetTable.columns.find(c => c.id === params.targetColumnId)?.name ?? "id",
          },
        }
        updateProject(prev => ({
          ...prev,
          tables: prev.tables.map(t => t.id === params.sourceTableId ? { ...t, columns: [...t.columns, fkCol] } : t),
          relationships: [...prev.relationships, newRel],
        }))
        return
      }
    }

    updateProject(prev => ({ ...prev, relationships: [...prev.relationships, newRel] }))
  }

  const handleSelectTemplate = (template: ERDTemplateItem) => {
    setProject({ ...template.project, id: generateId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    setSelectedTableId(null)
  }

  const handleAutoArrange = () => {
    updateProject(prev => ({
      ...prev,
      tables: prev.tables.map((t, i) => ({
        ...t,
        position: { x: 80 + (i % 3) * 240, y: 60 + Math.floor(i / 3) * 220 },
      })),
    }))
  }

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${project.name.toLowerCase().replace(/\s+/g, "_")}_erd.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as ERDProject
        setProject(parsed)
        setSelectedTableId(null)
      } catch {
        alert("File JSON tidak valid!")
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  return (
    <AppLayout>
      <div className="space-y-4">
        {/* Toolbar */}
        <ERDToolbar
          onAddTable={addTable}
          onOpenAddRelationship={() => setShowRelationModal(true)}
          onSelectTemplate={handleSelectTemplate}
          onAutoArrange={handleAutoArrange}
          onZoomIn={() => setZoomLevel(z => Math.min(z + 0.1, 2))}
          onZoomOut={() => setZoomLevel(z => Math.max(z - 0.1, 0.3))}
          onResetZoom={() => setZoomLevel(1)}
          zoomLevel={zoomLevel}
          onSaveProject={() => alert("Project tersimpan (mock)!")}
          onExportPNG={() => alert("Export PNG akan segera hadir!")}
          onExportJSON={exportJSON}
          onImportJSON={importJSON}
          onOpenSQLModal={() => setShowSqlModal(true)}
          projectName={project.name}
          onChangeProjectName={(name) => updateProject(prev => ({ ...prev, name }))}
        />

        {/* Main ERD area */}
        <div
          className="flex gap-4 rounded-2xl overflow-hidden"
          style={{ border: "4px solid #0a0a0a", boxShadow: "5px 5px 0 #0a0a0a", minHeight: "600px" }}
        >
          {/* Canvas */}
          <div className="flex-1 relative overflow-hidden" style={{ background: "#f8f7f0", minHeight: "560px" }}>
            <ERDCanvas
              project={project}
              selectedTableId={selectedTableId}
              onSelectTable={setSelectedTableId}
              onUpdateTablePosition={updateTablePosition}
              onAddColumn={addColumn}
              onDeleteTable={deleteTable}
              onDeleteRelationship={deleteRelationship}
              zoomLevel={zoomLevel}
              canvasRef={canvasRef}
            />
          </div>

          {/* Property panel */}
          {selectedTable && (
            <ERDPropertyPanel
              selectedTable={selectedTable}
              onRenameTable={renameTable}
              onAddColumn={addColumn}
              onUpdateColumn={updateColumn}
              onDeleteColumn={deleteColumn}
              onDeleteTable={deleteTable}
            />
          )}
        </div>

        {/* Status bar */}
        <div
          className="flex items-center gap-6 px-4 py-2 rounded-xl text-xs font-bold"
          style={{ background: "#0a0a0a", color: "#FFE033" }}
        >
          <span>📊 {project.tables.length} Tabel</span>
          <span>🔗 {project.relationships.length} Relasi</span>
          <span>🔍 Zoom: {Math.round(zoomLevel * 100)}%</span>
          <span className="ml-auto text-white/40">Update: {new Date(project.updatedAt).toLocaleTimeString("id-ID")}</span>
        </div>

        {/* Modals */}
        {showRelationModal && (
          <ERDRelationshipModal
            open={showRelationModal}
            onClose={() => setShowRelationModal(false)}
            tables={project.tables}
            onCreateRelationship={createRelationship}
          />
        )}

        {showSqlModal && (
          <ERDSqlModal
            open={showSqlModal}
            onClose={() => setShowSqlModal(false)}
            project={project}
          />
        )}
      </div>
    </AppLayout>
  )
}
