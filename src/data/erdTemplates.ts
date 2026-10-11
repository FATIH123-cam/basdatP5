export type DataType =
  | "INTEGER"
  | "BIGINT"
  | "VARCHAR(50)"
  | "VARCHAR(100)"
  | "VARCHAR(255)"
  | "TEXT"
  | "BOOLEAN"
  | "DATE"
  | "TIMESTAMP"
  | "DECIMAL(10,2)"

export interface ERDColumn {
  id: string
  name: string
  dataType: DataType | string
  isPrimaryKey: boolean
  isForeignKey: boolean
  isUnique: boolean
  isNullable: boolean
  foreignKeyTarget?: {
    tableId: string
    columnId: string
    tableName: string
    columnName: string
  }
}

export interface ERDTable {
  id: string
  name: string
  position: {
    x: number
    y: number
  }
  columns: ERDColumn[]
  color?: string
}

export interface ERDRelationship {
  id: string
  sourceTableId: string
  sourceColumnId: string
  targetTableId: string
  targetColumnId: string
  cardinality: "1:1" | "1:N" | "N:1" | "N:N"
}

export interface ERDProject {
  id: string
  name: string
  description: string
  tables: ERDTable[]
  relationships: ERDRelationship[]
  createdAt: string
  updatedAt: string
}

// ============================================
// PRESET TEMPLATES
// ============================================

export interface ERDTemplateItem {
  id: string
  name: string
  emoji: string
  description: string
  project: ERDProject
}

export const ERD_TEMPLATES: ERDTemplateItem[] = [
  {
    id: "empty",
    name: "Empty Database",
    emoji: "📄",
    description: "Canvas kosong untuk mendesain dari nol",
    project: {
      id: "tpl-empty",
      name: "Database Baru",
      description: "Skema ERD baru",
      tables: [],
      relationships: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: "perpustakaan",
    name: "Sistem Perpustakaan",
    emoji: "📚",
    description: "Katalog buku, anggota, peminjaman & pengembalian",
    project: {
      id: "tpl-perpustakaan",
      name: "ERD Sistem Perpustakaan",
      description: "Skema database manajemen perpustakaan kampus",
      tables: [
        {
          id: "tbl-anggota",
          name: "anggota",
          position: { x: 50, y: 60 },
          columns: [
            { id: "c-a1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-a2", name: "nim", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-a3", name: "nama", dataType: "VARCHAR(100)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-a4", name: "email", dataType: "VARCHAR(100)", isPrimaryKey: false, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-a5", name: "status_aktif", dataType: "BOOLEAN", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
          ],
        },
        {
          id: "tbl-peminjaman",
          name: "peminjaman",
          position: { x: 420, y: 60 },
          columns: [
            { id: "c-p1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-p2", name: "anggota_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
            { id: "c-p3", name: "buku_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
            { id: "c-p4", name: "tgl_pinjam", dataType: "DATE", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-p5", name: "tgl_kembali", dataType: "DATE", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: true },
            { id: "c-p6", name: "status", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
          ],
        },
        {
          id: "tbl-buku",
          name: "buku",
          position: { x: 790, y: 60 },
          columns: [
            { id: "c-b1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-b2", name: "isbn", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-b3", name: "judul", dataType: "VARCHAR(255)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-b4", name: "penulis", dataType: "VARCHAR(100)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-b5", name: "kategori_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
            { id: "c-b6", name: "stok", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
          ],
        },
        {
          id: "tbl-kategori",
          name: "kategori_buku",
          position: { x: 790, y: 390 },
          columns: [
            { id: "c-k1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-k2", name: "nama_kategori", dataType: "VARCHAR(100)", isPrimaryKey: false, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-k3", name: "deskripsi", dataType: "TEXT", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: true },
          ],
        },
      ],
      relationships: [
        { id: "r1", sourceTableId: "tbl-anggota", sourceColumnId: "c-a1", targetTableId: "tbl-peminjaman", targetColumnId: "c-p2", cardinality: "1:N" },
        { id: "r2", sourceTableId: "tbl-buku", sourceColumnId: "c-b1", targetTableId: "tbl-peminjaman", targetColumnId: "c-p3", cardinality: "1:N" },
        { id: "r3", sourceTableId: "tbl-kategori", sourceColumnId: "c-k1", targetTableId: "tbl-buku", targetColumnId: "c-b5", cardinality: "1:N" },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: "praktikum",
    name: "Sistem Praktikum P5",
    emoji: "🎓",
    description: "Mahasiswa, pertemuan, absensi photobox & LKP",
    project: {
      id: "tpl-praktikum",
      name: "ERD Sistem Praktikum Basis Data",
      description: "Skema lengkap absensi photobox, LKP, dan nilai praktikum",
      tables: [
        {
          id: "tbl-mhs",
          name: "mahasiswa",
          position: { x: 50, y: 80 },
          columns: [
            { id: "c-m1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-m2", name: "nim", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-m3", name: "nama", dataType: "VARCHAR(100)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-m4", name: "kelas", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
          ],
        },
        {
          id: "tbl-absen",
          name: "absensi_foto",
          position: { x: 430, y: 60 },
          columns: [
            { id: "c-af1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-af2", name: "mahasiswa_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
            { id: "c-af3", name: "pertemuan_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
            { id: "c-af4", name: "photo_strip_url", dataType: "TEXT", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-af5", name: "status_verifikasi", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-af6", name: "created_at", dataType: "TIMESTAMP", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
          ],
        },
        {
          id: "tbl-prt",
          name: "pertemuan",
          position: { x: 800, y: 60 },
          columns: [
            { id: "c-pr1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-pr2", name: "nomor_pertemuan", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-pr3", name: "judul_materi", dataType: "VARCHAR(150)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-pr4", name: "tanggal", dataType: "DATE", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
          ],
        },
        {
          id: "tbl-lkp",
          name: "lkp_submission",
          position: { x: 430, y: 390 },
          columns: [
            { id: "c-lk1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-lk2", name: "mahasiswa_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
            { id: "c-lk3", name: "pertemuan_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
            { id: "c-lk4", name: "file_url", dataType: "TEXT", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-lk5", name: "nilai", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: true },
          ],
        },
      ],
      relationships: [
        { id: "r1", sourceTableId: "tbl-mhs", sourceColumnId: "c-m1", targetTableId: "tbl-absen", targetColumnId: "c-af2", cardinality: "1:N" },
        { id: "r2", sourceTableId: "tbl-prt", sourceColumnId: "c-pr1", targetTableId: "tbl-absen", targetColumnId: "c-af3", cardinality: "1:N" },
        { id: "r3", sourceTableId: "tbl-mhs", sourceColumnId: "c-m1", targetTableId: "tbl-lkp", targetColumnId: "c-lk2", cardinality: "1:N" },
        { id: "r4", sourceTableId: "tbl-prt", sourceColumnId: "c-pr1", targetTableId: "tbl-lkp", targetColumnId: "c-lk3", cardinality: "1:N" },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: "toko-online",
    name: "Sistem Toko Online",
    emoji: "🛒",
    description: "Pelanggan, pesanan, produk, order items & pembayaran",
    project: {
      id: "tpl-ecommerce",
      name: "ERD E-Commerce Online Store",
      description: "Database transaksi belanja online",
      tables: [
        {
          id: "tbl-cust",
          name: "customers",
          position: { x: 50, y: 70 },
          columns: [
            { id: "c-cu1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-cu2", name: "name", dataType: "VARCHAR(100)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-cu3", name: "email", dataType: "VARCHAR(150)", isPrimaryKey: false, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-cu4", name: "phone", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: true },
          ],
        },
        {
          id: "tbl-orders",
          name: "orders",
          position: { x: 420, y: 70 },
          columns: [
            { id: "c-o1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-o2", name: "customer_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
            { id: "c-o3", name: "order_date", dataType: "TIMESTAMP", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-o4", name: "total_amount", dataType: "DECIMAL(10,2)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-o5", name: "status", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
          ],
        },
        {
          id: "tbl-order-items",
          name: "order_items",
          position: { x: 790, y: 70 },
          columns: [
            { id: "c-oi1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-oi2", name: "order_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
            { id: "c-oi3", name: "product_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
            { id: "c-oi4", name: "quantity", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-oi5", name: "price", dataType: "DECIMAL(10,2)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
          ],
        },
        {
          id: "tbl-products",
          name: "products",
          position: { x: 790, y: 380 },
          columns: [
            { id: "c-pr1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-pr2", name: "name", dataType: "VARCHAR(150)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-pr3", name: "price", dataType: "DECIMAL(10,2)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-pr4", name: "stock", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
          ],
        },
      ],
      relationships: [
        { id: "r1", sourceTableId: "tbl-cust", sourceColumnId: "c-cu1", targetTableId: "tbl-orders", targetColumnId: "c-o2", cardinality: "1:N" },
        { id: "r2", sourceTableId: "tbl-orders", sourceColumnId: "c-o1", targetTableId: "tbl-order-items", targetColumnId: "c-oi2", cardinality: "1:N" },
        { id: "r3", sourceTableId: "tbl-products", sourceColumnId: "c-pr1", targetTableId: "tbl-order-items", targetColumnId: "c-oi3", cardinality: "1:N" },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: "rumah-makan",
    name: "Sistem Rumah Makan",
    emoji: "🍽️",
    description: "Meja, menu, pesanan makanan, dan billing",
    project: {
      id: "tpl-restaurant",
      name: "ERD Sistem Resto & Cafe",
      description: "Database pemesanan makanan dan meja",
      tables: [
        {
          id: "tbl-meja",
          name: "meja",
          position: { x: 50, y: 80 },
          columns: [
            { id: "c-mj1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-mj2", name: "nomor_meja", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-mj3", name: "kapasitas", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-mj4", name: "status", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
          ],
        },
        {
          id: "tbl-pesanan",
          name: "pesanan",
          position: { x: 420, y: 80 },
          columns: [
            { id: "c-ps1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-ps2", name: "meja_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
            { id: "c-ps3", name: "waktu_pesan", dataType: "TIMESTAMP", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-ps4", name: "total_bayar", dataType: "DECIMAL(10,2)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
          ],
        },
        {
          id: "tbl-menu",
          name: "menu_kuliner",
          position: { x: 790, y: 80 },
          columns: [
            { id: "c-mn1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-mn2", name: "nama_menu", dataType: "VARCHAR(150)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-mn3", name: "harga", dataType: "DECIMAL(10,2)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-mn4", name: "kategori", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
          ],
        },
      ],
      relationships: [
        { id: "r1", sourceTableId: "tbl-meja", sourceColumnId: "c-mj1", targetTableId: "tbl-pesanan", targetColumnId: "c-ps2", cardinality: "1:N" },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: "akademik",
    name: "Sistem Akademik Kampus",
    emoji: "🏛️",
    description: "Dosen, mahasiswa, mata kuliah & KRS",
    project: {
      id: "tpl-akademik",
      name: "ERD Sistem Informasi Akademik (SIAKAD)",
      description: "Skema registrasi perkuliahan dan KRS mahasiswa",
      tables: [
        {
          id: "tbl-dosen",
          name: "dosen",
          position: { x: 50, y: 80 },
          columns: [
            { id: "c-ds1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-ds2", name: "nip", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-ds3", name: "nama", dataType: "VARCHAR(100)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-ds4", name: "email", dataType: "VARCHAR(100)", isPrimaryKey: false, isForeignKey: false, isUnique: true, isNullable: false },
          ],
        },
        {
          id: "tbl-matkul",
          name: "mata_kuliah",
          position: { x: 420, y: 80 },
          columns: [
            { id: "c-mk1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-mk2", name: "kode_mk", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-mk3", name: "nama_mk", dataType: "VARCHAR(150)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-mk4", name: "sks", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
            { id: "c-mk5", name: "dosen_pengampu_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
          ],
        },
        {
          id: "tbl-krs",
          name: "krs_mahasiswa",
          position: { x: 790, y: 80 },
          columns: [
            { id: "c-kr1", name: "id", dataType: "INTEGER", isPrimaryKey: true, isForeignKey: false, isUnique: true, isNullable: false },
            { id: "c-kr2", name: "mahasiswa_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
            { id: "c-kr3", name: "mata_kuliah_id", dataType: "INTEGER", isPrimaryKey: false, isForeignKey: true, isUnique: false, isNullable: false },
            { id: "c-kr4", name: "semester", dataType: "VARCHAR(50)", isPrimaryKey: false, isForeignKey: false, isUnique: false, isNullable: false },
          ],
        },
      ],
      relationships: [
        { id: "r1", sourceTableId: "tbl-dosen", sourceColumnId: "c-ds1", targetTableId: "tbl-matkul", targetColumnId: "c-mk5", cardinality: "1:N" },
        { id: "r2", sourceTableId: "tbl-matkul", sourceColumnId: "c-mk1", targetTableId: "tbl-krs", targetColumnId: "c-kr3", cardinality: "1:N" },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
]

const ERD_STORAGE_KEY = "praktikum_erd_projects_v2"

export function getSavedERDProjects(): ERDProject[] {
  try {
    const raw = localStorage.getItem(ERD_STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.error("Failed to load ERD projects", e)
  }
  return [ERD_TEMPLATES[2].project] // Default to Praktikum template
}

export function saveERDProject(project: ERDProject) {
  try {
    const list = getSavedERDProjects()
    const idx = list.findIndex((p) => p.id === project.id)
    if (idx >= 0) {
      list[idx] = { ...project, updatedAt: new Date().toISOString() }
    } else {
      list.push({ ...project, updatedAt: new Date().toISOString() })
    }
    localStorage.setItem(ERD_STORAGE_KEY, JSON.stringify(list))
  } catch (e) {
    console.error("Failed to save ERD project", e)
  }
}

// SQL Generator Helper
export function generateSQLScript(project: ERDProject): string {
  let sql = `-- ============================================\n`
  sql += `-- SQL DDL GENERATED FROM ERD DESIGNER\n`
  sql += `-- Project: ${project.name}\n`
  sql += `-- Created on: ${new Date().toLocaleString("id-ID")}\n`
  sql += `-- ============================================\n\n`

  project.tables.forEach((table) => {
    sql += `CREATE TABLE ${table.name} (\n`
    const colDefs = table.columns.map((col) => {
      let def = `    ${col.name} ${col.dataType}`
      if (col.isPrimaryKey) def += ` PRIMARY KEY`
      if (col.isUnique && !col.isPrimaryKey) def += ` UNIQUE`
      if (!col.isNullable && !col.isPrimaryKey) def += ` NOT NULL`
      return def
    })

    // Foreign key constraints
    const fkConstraints: string[] = []
    table.columns.forEach((col) => {
      if (col.isForeignKey && col.foreignKeyTarget) {
        fkConstraints.push(
          `    FOREIGN KEY (${col.name}) REFERENCES ${col.foreignKeyTarget.tableName}(${col.foreignKeyTarget.columnName}) ON DELETE CASCADE`,
        )
      }
    })

    // Also check relationships
    project.relationships.forEach((rel) => {
      if (rel.targetTableId === table.id) {
        const srcTable = project.tables.find((t) => t.id === rel.sourceTableId)
        const srcCol = srcTable?.columns.find((c) => c.id === rel.sourceColumnId)
        const tgtCol = table.columns.find((c) => c.id === rel.targetColumnId)
        if (srcTable && srcCol && tgtCol && !colDefs.some((d) => d.includes(`REFERENCES ${srcTable.name}`))) {
          // Add if not already explicitly covered
        }
      }
    })

    const allLines = [...colDefs, ...fkConstraints]
    sql += allLines.join(",\n")
    sql += `\n);\n\n`
  })

  return sql
}
