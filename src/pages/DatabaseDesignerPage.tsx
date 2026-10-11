import { useState, useRef } from "react"
import AppLayout from "../components/AppLayout"
import ERDCanvas from "../components/erd/ERDCanvas"
import ERDToolbar from "../components/erd/ERDToolbar"
import ERDPropertyPanel from "../components/erd/ERDPropertyPanel"
import ERDSqlModal from "../components/erd/ERDSqlModal"
import { ERDProject, getSavedERDProjects, ERD_TEMPLATES, saveERDProject } from "../data/erdTemplates"

export default function DatabaseDesignerPage() {
  const [project, setProject] = useState<ERDProject>(getSavedERDProjects()[0] || ERD_TEMPLATES[0].project)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null)
  const [showSqlModal, setShowSqlModal] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleSelectTable = (tableId: string | null) => setSelectedTableId(tableId)
  
  const handleUpdateTablePosition = (tableId: string, x: number, y: number) => {
    setProject(prev => {
      const updated = { ...prev, tables: prev.tables.map(t => t.id === tableId ? { ...t, position: { x, y } } : t) }
      saveERDProject(updated)
      return updated
    })
  }

  const handleAddColumn = (tableId: string) => {
    setProject(prev => {
      const updated = {
        ...prev,
        tables: prev.tables.map(t => {
          if (t.id === tableId) {
            return {
              ...t,
              columns: [...t.columns, { id: `c-${Date.now()}`, name: "new_column", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: true }]
            }
          }
          return t
        })
      }
      saveERDProject(updated)
      return updated
    })
  }

  const handleDeleteTable = (tableId: string) => {
    setProject(prev => {
      const updated = {
        ...prev,
        tables: prev.tables.filter(t => t.id !== tableId),
        relationships: prev.relationships.filter(r => r.sourceTableId !== tableId && r.targetTableId !== tableId)
      }
      saveERDProject(updated)
      return updated
    })
  }

  const handleDeleteRelationship = (relId: string) => {
    setProject(prev => {
      const updated = { ...prev, relationships: prev.relationships.filter(r => r.id !== relId) }
      saveERDProject(updated)
      return updated
    })
  }

  const handleUpdateTable = (tableId: string, updates: any) => {
    setProject(prev => {
      const updated = { ...prev, tables: prev.tables.map(t => t.id === tableId ? { ...t, ...updates } : t) }
      saveERDProject(updated)
      return updated
    })
  }

  const selectedTable = project.tables.find(t => t.id === selectedTableId)

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-120px)] space-y-4">
        <ERDToolbar 
          project={project} 
          zoomLevel={zoomLevel} 
          onZoomIn={() => setZoomLevel(z => Math.min(2, z + 0.1))} 
          onZoomOut={() => setZoomLevel(z => Math.max(0.5, z - 0.1))} 
          onGenerateSql={() => setShowSqlModal(true)} 
          onLoadTemplate={(tpl) => setProject(tpl)} 
          onAddTable={() => {
            const newTable = { id: `tbl-${Date.now()}`, name: "new_table", position: { x: 100, y: 100 }, columns: [{ id: `c-${Date.now()}`, name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false }] }
            setProject(prev => {
              const updated = { ...prev, tables: [...prev.tables, newTable] }
              saveERDProject(updated)
              return updated
            })
          }}
          onAddRelationship={() => {}} // Simple mock
        />
        <div className="flex flex-1 gap-4 overflow-hidden">
          <div className="flex-1 overflow-auto">
            <ERDCanvas 
              project={project}
              selectedTableId={selectedTableId}
              onSelectTable={handleSelectTable}
              onUpdateTablePosition={handleUpdateTablePosition}
              onAddColumn={handleAddColumn}
              onDeleteTable={handleDeleteTable}
              onDeleteRelationship={handleDeleteRelationship}
              zoomLevel={zoomLevel}
              canvasRef={canvasRef}
            />
          </div>
          {selectedTable && (
            <div className="w-80 overflow-y-auto">
              <ERDPropertyPanel 
                table={selectedTable} 
                onUpdateTable={handleUpdateTable} 
                onClose={() => setSelectedTableId(null)} 
              />
            </div>
          )}
        </div>
      </div>
      {showSqlModal && <ERDSqlModal project={project} onClose={() => setShowSqlModal(false)} />}
    </AppLayout>
  )
}
