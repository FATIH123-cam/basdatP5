import React, { useRef, useState } from "react"
import { ERDProject, ERDRelationship, ERDTable } from "../../data/erdTemplates"
import ERDTableNode from "./ERDTableNode"

interface Props {
  project: ERDProject
  selectedTableId: string | null
  onSelectTable: (tableId: string | null) => void
  onUpdateTablePosition: (tableId: string, x: number, y: number) => void
  onAddColumn: (tableId: string) => void
  onDeleteTable: (tableId: string) => void
  onDeleteRelationship: (relId: string) => void
  zoomLevel: number
  canvasRef: React.RefObject<HTMLDivElement | null>
}

export default function ERDCanvas({
  project,
  selectedTableId,
  onSelectTable,
  onUpdateTablePosition,
  onAddColumn,
  onDeleteTable,
  onDeleteRelationship,
  zoomLevel,
  canvasRef,
}: Props) {
  const [draggingTableId, setDraggingTableId] = useState<string | null>(null)
  const dragOffsetRef = useRef<{ offsetX: number; offsetY: number }>({
    offsetX: 0,
    offsetY: 0,
  })

  // Start dragging a table
  const handleStartDrag = (e: React.MouseEvent, tableId: string) => {
    e.stopPropagation()
    const table = project.tables.find((t) => t.id === tableId)
    if (!table) return

    onSelectTable(tableId)
    setDraggingTableId(tableId)
    dragOffsetRef.current = {
      offsetX: e.clientX - table.position.x * zoomLevel,
      offsetY: e.clientY - table.position.y * zoomLevel,
    }
  }

  // Dragging movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingTableId) return
    const newX = Math.max(
      20,
      Math.round((e.clientX - dragOffsetRef.current.offsetX) / zoomLevel / 10) * 10,
    )
    const newY = Math.max(
      20,
      Math.round((e.clientY - dragOffsetRef.current.offsetY) / zoomLevel / 10) * 10,
    )
    onUpdateTablePosition(draggingTableId, newX, newY)
  }

  // End dragging
  const handleMouseUp = () => {
    setDraggingTableId(null)
  }

  // Helper to calculate relationship connector points between two tables
  const calculateConnection = (rel: ERDRelationship) => {
    const srcTable = project.tables.find((t) => t.id === rel.sourceTableId)
    const tgtTable = project.tables.find((t) => t.id === rel.targetTableId)
    if (!srcTable || !tgtTable) return null

    const TABLE_WIDTH = 280
    // Estimate table height based on column count
    const srcHeight = 45 + srcTable.columns.length * 32 + 25
    const tgtHeight = 45 + tgtTable.columns.length * 32 + 25

    const srcCenterX = srcTable.position.x + TABLE_WIDTH / 2
    const srcCenterY = srcTable.position.y + srcHeight / 2
    const tgtCenterX = tgtTable.position.x + TABLE_WIDTH / 2
    const tgtCenterY = tgtTable.position.y + tgtHeight / 2

    let startX = srcTable.position.x + TABLE_WIDTH
    let startY = srcCenterY
    let endX = tgtTable.position.x
    let endY = tgtCenterY

    // Determine best anchor sides
    if (srcTable.position.x > tgtTable.position.x + TABLE_WIDTH) {
      // Source is to the right of Target
      startX = srcTable.position.x
      endX = tgtTable.position.x + TABLE_WIDTH
    } else if (
      Math.abs(srcTable.position.x - tgtTable.position.x) < TABLE_WIDTH &&
      srcTable.position.y + srcHeight < tgtTable.position.y
    ) {
      // Source is above Target
      startX = srcCenterX
      startY = srcTable.position.y + srcHeight
      endX = tgtCenterX
      endY = tgtTable.position.y
    } else if (
      Math.abs(srcTable.position.x - tgtTable.position.x) < TABLE_WIDTH &&
      srcTable.position.y > tgtTable.position.y + tgtHeight
    ) {
      // Source is below Target
      startX = srcCenterX
      startY = srcTable.position.y
      endX = tgtCenterX
      endY = tgtTable.position.y + tgtHeight
    }

    const midX = (startX + endX) / 2
    const midY = (startY + endY) / 2

    // Path generation (Smooth step bezier)
    const pathD = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`

    return {
      id: rel.id,
      pathD,
      startX,
      startY,
      endX,
      endY,
      midX,
      midY,
      cardinality: rel.cardinality,
      sourceTableName: srcTable.name,
      targetTableName: tgtTable.name,
    }
  }

  return (
    <div
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={() => onSelectTable(null)}
      className="relative w-full h-[650px] rounded-3xl overflow-hidden cursor-crosshair select-none"
      style={{
        background: "#fffdf5",
        border: "4px solid #0a0a0a",
        boxShadow: "8px 8px 0 #0a0a0a",
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.12) 1.5px, transparent 1.5px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Zoom scale container */}
      <div
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: "0 0",
          width: "2500px",
          height: "2000px",
          position: "relative",
        }}
      >
        {/* SVG Relationship Connector Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ width: "2500px", height: "2000px" }}
        >
          <defs>
            <marker
              id="erd-arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#0a0a0a" />
            </marker>
          </defs>

          {project.relationships.map((rel) => {
            const conn = calculateConnection(rel)
            if (!conn) return null

            const [srcCard, tgtCard] =
              conn.cardinality === "1:N"
                ? ["1", "N"]
                : conn.cardinality === "N:1"
                  ? ["N", "1"]
                  : conn.cardinality === "N:N"
                    ? ["N", "N"]
                    : ["1", "1"]

            return (
              <g key={conn.id} className="pointer-events-auto group">
                {/* Thick background outline */}
                <path
                  d={conn.pathD}
                  fill="none"
                  stroke="#FFE033"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="opacity-70 group-hover:opacity-100"
                />

                {/* Main line */}
                <path
                  d={conn.pathD}
                  fill="none"
                  stroke="#0a0a0a"
                  strokeWidth="3.5"
                  strokeDasharray="6 3"
                  markerEnd="url(#erd-arrow)"
                />

                {/* Cardinality badge at source */}
                <circle
                  cx={conn.startX + (conn.midX > conn.startX ? 16 : -16)}
                  cy={conn.startY}
                  r="12"
                  fill="#1B72D4"
                  stroke="#0a0a0a"
                  strokeWidth="2"
                />
                <text
                  x={conn.startX + (conn.midX > conn.startX ? 16 : -16)}
                  y={conn.startY + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="900"
                  fontFamily="'Bangers', cursive"
                >
                  {srcCard}
                </text>

                {/* Cardinality badge at target */}
                <circle
                  cx={conn.endX + (conn.midX > conn.endX ? 16 : -16)}
                  cy={conn.endY}
                  r="12"
                  fill="#E8212A"
                  stroke="#0a0a0a"
                  strokeWidth="2"
                />
                <text
                  x={conn.endX + (conn.midX > conn.endX ? 16 : -16)}
                  y={conn.endY + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="900"
                  fontFamily="'Bangers', cursive"
                >
                  {tgtCard}
                </text>

                {/* Center Action (Delete relationship button on hover) */}
                <g
                  transform={`translate(${conn.midX - 12}, ${conn.midY - 12})`}
                  className="cursor-pointer opacity-70 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm("Hapus relasi ini?")) {
                      onDeleteRelationship(conn.id)
                    }
                  }}
                >
                  <rect
                    width="24"
                    height="24"
                    rx="6"
                    fill="#E8212A"
                    stroke="#0a0a0a"
                    strokeWidth="2"
                  />
                  <text
                    x="12"
                    y="16"
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    ✕
                  </text>
                </g>
              </g>
            )
          })}
        </svg>

        {/* Table Nodes */}
        {project.tables.map((table) => (
          <ERDTableNode
            key={table.id}
            table={table}
            isSelected={selectedTableId === table.id}
            onSelectTable={onSelectTable}
            onStartDrag={handleStartDrag}
            onAddColumn={onAddColumn}
            onDeleteTable={onDeleteTable}
          />
        ))}
      </div>

      {/* Floating Canvas Quick Stats */}
      <div
        className="absolute bottom-4 left-4 z-20 px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-3 bg-white"
        style={{
          border: "2.5px solid #0a0a0a",
          boxShadow: "3px 3px 0 #0a0a0a",
          fontFamily: "'Bangers', cursive",
          letterSpacing: "0.05em",
        }}
      >
        <span>📊 {project.tables.length} TABEL</span>
        <span>•</span>
        <span>🔗 {project.relationships.length} RELASI</span>
        <span>•</span>
        <span className="text-indigo-600">ZOOM: {Math.round(zoomLevel * 100)}%</span>
      </div>
    </div>
  )
}
