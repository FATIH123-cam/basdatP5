export interface Praktikan {
  id: number
  nim: string
  nama: string
  password: string
  profile_picture: string | null
  header_picture: string | null
  role: "student" | "asprak"
  kelas: string
  email: string
  avatar: string
  bio?: string
}

export interface Pertemuan {
  id: number
  minggu_ke: number
  topik_pertemuan: string
  waktu_buka_akses: string | null
  date: string
  title: string
}

export interface Materi {
  id: number
  pertemuan_id: number
  judul_materi: string
  ringkasan: string
  file_url: string | null // null initially
  is_open: boolean // false initially
  category: string
  objectives: string[]
  concepts: string[]
}

export interface LKP {
  id: number
  pertemuan_id: number
  judul_lkp: string
  ringkasan: string
  file_url: string | null // null initially
  is_open: boolean // false initially
  type: "sebelum" | "setelah"
  file_type: string
  file_size?: string
}

export interface Absensi {
  id: number
  praktikan_id: number
  pertemuan_id: number
  waktu_absen: string
  status: "Hadir" | "Izin" | "Sakit" | "Alpa"
  photo_url?: string | null
}

export interface Kuis {
  id: number
  pertemuan_id: number
  judul_kuis: string
  total_soal: number
  difficulty: "Mudah" | "Sedang" | "Sulit"
  duration: number
}

export interface KuisHasil {
  id: number
  kuis_id: number
  praktikan_id: number
  jumlah_benar: number
  jumlah_salah: number
  skor: number
}

export interface Keaktifan {
  id: number
  praktikan_id: number
  pertemuan_id: number
  jumlah_bertanya: number
  jumlah_menjawab: number
}

// 40 Praktikan Mahasiswa from CSV
export const initialPraktikanList: Praktikan[] = [
  {
    id: 1,
    nim: "M0401251001",
    nama: "Najla Rayya Falisha Istiazakka",
    password: "M0401251001",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "najla.rayya@student.univ.ac.id",
    avatar: "NR",
    bio: "Praktikan Basis Data yang tertarik pada optimasi database & query tuning. 🚀",
  },
  {
    id: 2,
    nim: "M0401251006",
    nama: "Rifqi Candra Mahardhika",
    password: "M0401251006",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "rifqi.candra@student.univ.ac.id",
    avatar: "RC",
    bio: "Exploring SQL and relational database models. 💻",
  },
  {
    id: 3,
    nim: "M0401251007",
    nama: "Alliyah Safwana",
    password: "M0401251007",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "alliyah.safwana@student.univ.ac.id",
    avatar: "AS",
    bio: "Data enthusiast, suka mendesain ERD dan normalisasi. ✨",
  },
  {
    id: 4,
    nim: "M0401251011",
    nama: "Hasya Rahmat Sudarto",
    password: "M0401251011",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "hasya.rahmat@student.univ.ac.id",
    avatar: "HR",
    bio: "Belajar SQL dari dasar hingga mahir. 🗄️",
  },
  {
    id: 5,
    nim: "M0401251015",
    nama: "Silmi Aulia Zahra",
    password: "M0401251015",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "silmi.aulia@student.univ.ac.id",
    avatar: "SZ",
    bio: "Passionate about clean databases and beautiful UI. 🌸",
  },
  {
    id: 6,
    nim: "M0401251018",
    nama: "Muhammad Ghifari Sudjud",
    password: "M0401251018",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "ghifari.sudjud@student.univ.ac.id",
    avatar: "GS",
    bio: "Fokus belajar DDL, DML, dan indexing. ⚡",
  },
  {
    id: 7,
    nim: "M0401251022",
    nama: "Anisya Nurumughni Ramadiyanto",
    password: "M0401251022",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "anisya.nurumughni@student.univ.ac.id",
    avatar: "AN",
    bio: "Antusias dengan integrasi AI dan database modern. 🤖",
  },
  {
    id: 8,
    nim: "M0401251025",
    nama: "Devtasari Rajwa Hasanah",
    password: "M0401251025",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "devtasari.rajwa@student.univ.ac.id",
    avatar: "DH",
    bio: "Suka diskusi tentang normalisasi tabel. 📖",
  },
  {
    id: 9,
    nim: "M0401251028",
    nama: "Muhammad Daffa Prathama",
    password: "M0401251028",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "daffa.prathama@student.univ.ac.id",
    avatar: "DP",
    bio: "Ngulik query complex dan CTE di PostgreSQL. 🛠️",
  },
  {
    id: 10,
    nim: "M0401251031",
    nama: "Katharina Vanessa Herwanto",
    password: "M0401251031",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "katharina.vanessa@student.univ.ac.id",
    avatar: "KV",
    bio: "Senang belajar konseptual dan logika database. 💡",
  },
  {
    id: 11,
    nim: "M0401251035",
    nama: "Nasya Pavita Kirana",
    password: "M0401251035",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "nasya.pavita@student.univ.ac.id",
    avatar: "NK",
    bio: "Mendalami Conceptual Modelling & ER diagramming. 📐",
  },
  {
    id: 12,
    nim: "M0401251038",
    nama: "Bayu Chandra Wiranata",
    password: "M0401251038",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "bayu.chandra@student.univ.ac.id",
    avatar: "BW",
    bio: "Software developer in the making! 🚀",
  },
  {
    id: 13,
    nim: "M0401251039",
    nama: "Muhamad Nabil Arka",
    password: "M0401251039",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "nabil.arka@student.univ.ac.id",
    avatar: "NA",
    bio: "Eksplorasi ERD dan EERD relasional. 🔍",
  },
  {
    id: 14,
    nim: "M0401251043",
    nama: "Abyan Dinar Fathin Shafiulla",
    password: "M0401251043",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "abyan.dinar@student.univ.ac.id",
    avatar: "AD",
    bio: "Belajar arsitektur basis data dan ACID. 🛡️",
  },
  {
    id: 15,
    nim: "M0401251046",
    nama: "Fazwah Afina Shabirah",
    password: "M0401251046",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "fazwah.afina@student.univ.ac.id",
    avatar: "FS",
    bio: "Desain Lojik dan Perancangan Logical Database. 📝",
  },
  {
    id: 16,
    nim: "M0401251047",
    nama: "Tobias Stefan Manik",
    password: "M0401251047",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "tobias.manik@student.univ.ac.id",
    avatar: "TM",
    bio: "Coding, problem solving, and databases. 🎯",
  },
  {
    id: 17,
    nim: "M0401251053",
    nama: "Nurani Aprilia Elasti",
    password: "M0401251053",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "nurani.aprilia@student.univ.ac.id",
    avatar: "NE",
    bio: "Praktikan rajin yang selalu siap mengerjakan LKP. 📚",
  },
  {
    id: 18,
    nim: "M0401251055",
    nama: "Aulia Zahra Assyifa",
    password: "M0401251055",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "aulia.zahra@student.univ.ac.id",
    avatar: "AZ",
    bio: "Mempelajari 1NF, 2NF, 3NF, hingga BCNF. 🎯",
  },
  {
    id: 19,
    nim: "M0401251063",
    nama: "Nickho Irsyad A",
    password: "M0401251063",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "nickho.irsyad@student.univ.ac.id",
    avatar: "NI",
    bio: "Fullstack enthusiast with love for relational DBs. 🌐",
  },
  {
    id: 20,
    nim: "M0401251064",
    nama: "Rama Monica Pardede",
    password: "M0401251064",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "rama.monica@student.univ.ac.id",
    avatar: "RM",
    bio: "Senang belajar pemodelan data relasional. 📊",
  },
  {
    id: 21,
    nim: "M0401251070",
    nama: "Salsabila Ismatul Hawa",
    password: "M0401251070",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "salsabila.ismatul@student.univ.ac.id",
    avatar: "SH",
    bio: "Perancangan fisikal basis data dan indexing. 💾",
  },
  {
    id: 22,
    nim: "M0401251072",
    nama: "Ahmad Faza Prayoga",
    password: "M0401251072",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "ahmad.faza@student.univ.ac.id",
    avatar: "AF",
    bio: "Suka hands-on praktek query SQL. ⚡",
  },
  {
    id: 23,
    nim: "M0401251074",
    nama: "Hanif Althaf Bagaskara",
    password: "M0401251074",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "hanif.althaf@student.univ.ac.id",
    avatar: "HB",
    bio: "Mendalami optimasi query dan database security. 🔒",
  },
  {
    id: 24,
    nim: "M0401251075",
    nama: "Muhammad Edo Aditya",
    password: "M0401251075",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "edo.aditya@student.univ.ac.id",
    avatar: "EA",
    bio: "Siap menghadapi UTS dan project akhir praktikum! 🏆",
  },
  {
    id: 25,
    nim: "M0401251076",
    nama: "Stevanie Valencia",
    password: "M0401251076",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "stevanie.valencia@student.univ.ac.id",
    avatar: "SV",
    bio: "Pemantapan DDL, DML, dan query join kompleks. ✨",
  },
  {
    id: 26,
    nim: "M0401251078",
    nama: "Jesselyn Carissa Siburian",
    password: "M0401251078",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "jesselyn.carissa@student.univ.ac.id",
    avatar: "JC",
    bio: "Advanced SQL: Window functions & views. 📈",
  },
  {
    id: 27,
    nim: "M0401251082",
    nama: "April Lahirna",
    password: "M0401251082",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "april.lahirna@student.univ.ac.id",
    avatar: "AL",
    bio: "Transactions, ACID properties, and Data Warehouse. 🏢",
  },
  {
    id: 28,
    nim: "M0401251087",
    nama: "Jonathan Hazel",
    password: "M0401251087",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "jonathan.hazel@student.univ.ac.id",
    avatar: "JH",
    bio: "Database administrator in progress. 💻",
  },
  {
    id: 29,
    nim: "M0401251089",
    nama: "Nur Aini Rahmawati",
    password: "M0401251089",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "nur.aini@student.univ.ac.id",
    avatar: "NR",
    bio: "Suka belajar relasi dan foreign keys. 🔗",
  },
  {
    id: 30,
    nim: "M0401251093",
    nama: "Nalendra Nitisara Isnugrahadi",
    password: "M0401251093",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "nalendra.nitisara@student.univ.ac.id",
    avatar: "NI",
    bio: "CRUD operations and career paths in database engineering. 🚀",
  },
  {
    id: 31,
    nim: "M0401251096",
    nama: "Rafar Evo Ahmad",
    password: "M0401251096",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "rafar.evo@student.univ.ac.id",
    avatar: "RE",
    bio: "MongoDB & document-based database enthusiast. 🍃",
  },
  {
    id: 32,
    nim: "M0401251100",
    nama: "Siti Nurhalimah",
    password: "M0401251100",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "siti.nurhalimah@student.univ.ac.id",
    avatar: "SN",
    bio: "Graph databases with Neo4J & Cypher queries. 🕸️",
  },
  {
    id: 33,
    nim: "M0401251101",
    nama: "Varel Fadhil Akbar",
    password: "M0401251101",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "varel.fadhil@student.univ.ac.id",
    avatar: "VF",
    bio: "Penikmat NoSQL dan scalability. 🚀",
  },
  {
    id: 34,
    nim: "M0401251102",
    nama: "Nasywa Aulia Artha",
    password: "M0401251102",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "nasywa.aulia@student.univ.ac.id",
    avatar: "NA",
    bio: "Belajar data modeling untuk aplikasi nyata. 🌟",
  },
  {
    id: 35,
    nim: "M0401251108",
    nama: "Diaz Farahsya Akbar",
    password: "M0401251108",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "diaz.farahsya@student.univ.ac.id",
    avatar: "DF",
    bio: "Suka eksplorasi query SQL dan perancangan skema. 🔍",
  },
  {
    id: 36,
    nim: "M0401251116",
    nama: "Izzat Khalil Yassin",
    password: "M0401251116",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "izzat.khalil@student.univ.ac.id",
    avatar: "IK",
    bio: "Teknologi database terdistribusi dan cloud. ☁️",
  },
  {
    id: 37,
    nim: "M0401251118",
    nama: "Jovan Darius Gonza",
    password: "M0401251118",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "jovan.darius@student.univ.ac.id",
    avatar: "JD",
    bio: "Data architecture enthusiast. 🏗️",
  },
  {
    id: 38,
    nim: "M0401251120",
    nama: "Gemilang Cahaya Ramadhan",
    password: "M0401251120",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "gemilang.cahaya@student.univ.ac.id",
    avatar: "GC",
    bio: "Praktikum Basis Data seru dan menantang! ✨",
  },
  {
    id: 39,
    nim: "M0401251126",
    nama: "Stefanus Gavriel Aurellius Tanurahardja",
    password: "M0401251126",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "stefanus.gavriel@student.univ.ac.id",
    avatar: "SG",
    bio: "Backend developer in training, database fan. 🚀",
  },
  {
    id: 40,
    nim: "M0401251134",
    nama: "Muhammad Azmi",
    password: "M0401251134",
    profile_picture: null,
    header_picture: null,
    role: "student",
    kelas: "Basis Data A 2026",
    email: "muhammad.azmi@student.univ.ac.id",
    avatar: "MA",
    bio: "Eksplorasi optimasi query dan performa DB. ⚡",
  },
]

// 2 Aspraks from CSV + Admin
export const initialAsprakList: Praktikan[] = [
  {
    id: 101,
    nim: "M0403241040",
    nama: "Muhammad Al Fatih (asprak)",
    password: "M0403241040",
    profile_picture: null,
    header_picture: null,
    role: "asprak",
    kelas: "Tim Asisten Praktikum",
    email: "al.fatih@asprak.univ.ac.id",
    avatar: "AF",
    bio: "Koordinator & Asisten Praktikum Basis Data 2026. 🛡️",
  },
  {
    id: 102,
    nim: "M0403241041",
    nama: "Nadine Putri Agustin (asprak)",
    password: "M0403241041",
    profile_picture: null,
    header_picture: null,
    role: "asprak",
    kelas: "Tim Asisten Praktikum",
    email: "nadine.putri@asprak.univ.ac.id",
    avatar: "NP",
    bio: "Asisten Praktikum Basis Data 2026. 🌟",
  },
  {
    id: 999,
    nim: "admin",
    nama: "Administrator Praktikum",
    password: "admin",
    profile_picture: null,
    header_picture: null,
    role: "asprak",
    kelas: "Administrator Lab",
    email: "admin@univ.ac.id",
    avatar: "AD",
    bio: "Sistem Administrator Dashboard Praktikum.",
  },
]

// 14 Pertemuan from CSV
export const initialPertemuanList: Pertemuan[] = [
  {
    id: 1,
    minggu_ke: 1,
    topik_pertemuan: "pengenalan database",
    waktu_buka_akses: "2026-09-02 08:00:00",
    date: "2026-09-02",
    title: "Pertemuan 1 — Pengenalan Database",
  },
  {
    id: 2,
    minggu_ke: 2,
    topik_pertemuan: "pengenalan SQL",
    waktu_buka_akses: "2026-09-09 08:00:00",
    date: "2026-09-09",
    title: "Pertemuan 2 — Pengenalan SQL",
  },
  {
    id: 3,
    minggu_ke: 3,
    topik_pertemuan: "Conceptual Modelling Part 1",
    waktu_buka_akses: "2026-09-16 08:00:00",
    date: "2026-09-16",
    title: "Pertemuan 3 — Conceptual Modelling Part 1",
  },
  {
    id: 4,
    minggu_ke: 4,
    topik_pertemuan: "Conceptual Modelling Part 2",
    waktu_buka_akses: "2026-09-23 08:00:00",
    date: "2026-09-23",
    title: "Pertemuan 4 — Conceptual Modelling Part 2",
  },
  {
    id: 5,
    minggu_ke: 5,
    topik_pertemuan: "Desain Lojik",
    waktu_buka_akses: "2026-09-30 08:00:00",
    date: "2026-09-30",
    title: "Pertemuan 5 — Desain Lojik",
  },
  {
    id: 6,
    minggu_ke: 6,
    topik_pertemuan: "Normalisasi",
    waktu_buka_akses: "2026-10-07 08:00:00",
    date: "2026-10-07",
    title: "Pertemuan 6 — Normalisasi",
  },
  {
    id: 7,
    minggu_ke: 7,
    topik_pertemuan: "SQL",
    waktu_buka_akses: "2026-10-14 08:00:00",
    date: "2026-10-14",
    title: "Pertemuan 7 — SQL & Perancangan Fisikal",
  },
  {
    id: 8,
    minggu_ke: 8,
    topik_pertemuan: "UTS",
    waktu_buka_akses: "2026-10-21 08:00:00",
    date: "2026-10-21",
    title: "Pertemuan 8 — Ujian Tengah Semester (UTS)",
  },
  {
    id: 9,
    minggu_ke: 9,
    topik_pertemuan: "Pemantapan SQL, DDL, dan DML",
    waktu_buka_akses: "2026-10-28 08:00:00",
    date: "2026-10-28",
    title: "Pertemuan 9 — Pemantapan SQL, DDL, dan DML",
  },
  {
    id: 10,
    minggu_ke: 10,
    topik_pertemuan: "Advanced SQL",
    waktu_buka_akses: "2026-11-04 08:00:00",
    date: "2026-11-04",
    title: "Pertemuan 10 — Advanced SQL",
  },
  {
    id: 11,
    minggu_ke: 11,
    topik_pertemuan: "Transactions & ACID (1 jam pertama)",
    waktu_buka_akses: "2026-11-11 08:00:00",
    date: "2026-11-11",
    title: "Pertemuan 11 — Transactions, ACID & Data Warehouse",
  },
  {
    id: 12,
    minggu_ke: 12,
    topik_pertemuan: "CRUD",
    waktu_buka_akses: "2026-11-18 08:00:00",
    date: "2026-11-18",
    title: "Pertemuan 12 — CRUD & Karir Bidang Basis Data",
  },
  {
    id: 13,
    minggu_ke: 13,
    topik_pertemuan: "MongoDB",
    waktu_buka_akses: "2026-11-25 08:00:00",
    date: "2026-11-25",
    title: "Pertemuan 13 — MongoDB & Pengenalan NoSQL",
  },
  {
    id: 14,
    minggu_ke: 14,
    topik_pertemuan: "Neo4J",
    waktu_buka_akses: "2026-12-02 08:00:00",
    date: "2026-12-02",
    title: "Pertemuan 14 — Neo4J & Advance NoSQL",
  },
]

// 14 Materi matching CSV, initially file_url: null, is_open: false
export const initialMateriList: Materi[] = [
  {
    id: 1,
    pertemuan_id: 1,
    judul_materi: "database",
    ringkasan: "Pengenalan konsep dasar sistem basis data, DBMS, arsitektur data, dan perbandingan flat-file dengan relational database.",
    file_url: null,
    is_open: false,
    category: "Dasar Basis Data",
    objectives: [
      "Memahami konsep dasar DBMS vs File System",
      "Mengenal komponen arsitektur basis data relasional",
      "Mempersiapkan tools DBeaver dan PostgreSQL",
    ],
    concepts: ["DBMS", "Data Independence", "Schema & Instance", "Relational Model"],
  },
  {
    id: 2,
    pertemuan_id: 2,
    judul_materi: "integrasi AI dengan database",
    ringkasan: "Pengantar Structured Query Language (SQL) serta pemanfaatan kecerdasan buatan (AI) untuk membantu query generation dan analisis data.",
    file_url: null,
    is_open: false,
    category: "Pengenalan SQL & AI",
    objectives: [
      "Mengenal sintaks dasar SELECT dan klausa WHERE",
      "Memanfaatkan prompt AI untuk perancangan query SQL",
      "Mengevaluasi hasil sintaks SQL berbantuan AI",
    ],
    concepts: ["SQL Basics", "Prompt Engineering for SQL", "Query Validation", "Database Copilot"],
  },
  {
    id: 3,
    pertemuan_id: 3,
    judul_materi: "conceptual database design",
    ringkasan: "Perancangan model konseptual tingkat awal: identifikasi entitas, atribut kunci, atribut komposit, dan relasi bisnis dasar.",
    file_url: null,
    is_open: false,
    category: "Pemodelan Data",
    objectives: [
      "Mengidentifikasi entitas kuat dan entitas lemah",
      "Menentukan primary key candidate",
      "Membuat pemetaan hubungan antar entitas bisnis",
    ],
    concepts: ["Entity Types", "Key Attributes", "Conceptual Schema", "Business Rules"],
  },
  {
    id: 4,
    pertemuan_id: 4,
    judul_materi: "ERD dan EERD",
    ringkasan: "Pemodelan mendalam Entity Relationship Diagram (ERD) dan Enhanced ERD: kardinalitas (1:1, 1:N, M:N), spesialisasi, dan generalisasi.",
    file_url: null,
    is_open: false,
    category: "Pemodelan Data Lanjutan",
    objectives: [
      "Menggambar notasi ERD Chen dan Crow's Foot",
      "Menerapkan konsep ISA / Supertype & Subtype (EERD)",
      "Menghindari jebakan pemodelan seperti chasm trap",
    ],
    concepts: ["Cardinality Ratio", "Participation Constraint", "Generalization", "Specialization"],
  },
  {
    id: 5,
    pertemuan_id: 5,
    judul_materi: "perancangan logical",
    ringkasan: "Transformasi dari ERD/EERD menjadi skema relasional logika (tabel, foreign key, composite key, dan constraint integrity).",
    file_url: null,
    is_open: false,
    category: "Desain Lojik",
    objectives: [
      "Mengonversi relasi M:N menjadi tabel perantara (junction table)",
      "Menetapkan referential integrity constraints",
      "Membuat skema relasional formal",
    ],
    concepts: ["Relational Mapping", "Foreign Key", "Referential Integrity", "Junction Table"],
  },
  {
    id: 6,
    pertemuan_id: 6,
    judul_materi: "normalisasi",
    ringkasan: "Teknik dekomposisi tabel tanpa kehilangan informasi untuk menghilangkan anomali redundansi (1NF, 2NF, 3NF, BCNF).",
    file_url: null,
    is_open: false,
    category: "Normalisasi Data",
    objectives: [
      "Mendeteksi anomali insert, update, dan delete",
      "Menentukan Functional Dependency (FD)",
      "Mengubah tabel unnormalized ke bentuk 3NF/BCNF",
    ],
    concepts: ["1NF Atomic Values", "2NF Partial Dependency", "3NF Transitive Dependency", "BCNF"],
  },
  {
    id: 7,
    pertemuan_id: 7,
    judul_materi: "perancangan fisikal",
    ringkasan: "Penerapan skema database ke mesin SQL: tipe data fisik, indexing (B-Tree, Hash), storage engine, dan optimasi performa tabel.",
    file_url: null,
    is_open: false,
    category: "Perancangan Fisikal",
    objectives: [
      "Memilih tipe data hemat memori yang optimal",
      "Membuat index pada kolom pencarian sering",
      "Mengukur estimasi cost eksekusi query fisik",
    ],
    concepts: ["Physical Types", "Index Structures", "Clustered Index", "Execution Cost"],
  },
  {
    id: 8,
    pertemuan_id: 8,
    judul_materi: "Evaluasi Tengah Semester Basis Data",
    ringkasan: "Ujian Tengah Semester (UTS): Evaluasi komprehensif dari materi konseptual, normalisasi, hingga query pembuatan database.",
    file_url: null,
    is_open: false,
    category: "Evaluasi",
    objectives: [
      "Menguji pemahaman mahasiswa tentang pemodelan ERD",
      "Menguji kemampuan normalisasi studi kasus nyata",
      "Menulis DDL dan DML secara mandiri",
    ],
    concepts: ["Comprehensive Assessment", "Problem Solving", "Schema Design Review"],
  },
  {
    id: 9,
    pertemuan_id: 9,
    judul_materi: "SQL",
    ringkasan: "Pemantapan sintaks DDL (CREATE, ALTER, DROP) dan DML (INSERT, UPDATE, DELETE, SELECT) beserta multi-table JOIN.",
    file_url: null,
    is_open: false,
    category: "SQL Praktis",
    objectives: [
      "Menguasai INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN",
      "Menerapkan klausa GROUP BY dan HAVING",
      "Menggunakan subquery skalar dan korelasi",
    ],
    concepts: ["DDL vs DML", "Multi-table Joins", "Aggregation Functions", "Subqueries"],
  },
  {
    id: 10,
    pertemuan_id: 10,
    judul_materi: "advance SQL",
    ringkasan: "Fitur tingkat lanjut SQL: Common Table Expressions (CTE), Window Functions (ROW_NUMBER, RANK), Stored Procedures, dan Triggers.",
    file_url: null,
    is_open: false,
    category: "Advanced SQL",
    objectives: [
      "Membuat recursive CTE untuk hierarki data",
      "Menggunakan Window Function OVER(PARTITION BY)",
      "Membangun Trigger audit trail",
    ],
    concepts: ["CTE", "Window Functions", "Stored Procedures", "Triggers & Events"],
  },
  {
    id: 11,
    pertemuan_id: 11,
    judul_materi: "data warehouse",
    ringkasan: "Konsep transaksi ACID (Atomicity, Consistency, Isolation, Durability), transaction isolation levels, dan pengantar Data Warehouse (OLAP vs OLTP).",
    file_url: null,
    is_open: false,
    category: "Transaksi & Data Warehouse",
    objectives: [
      "Memahami COMMIT, ROLLBACK, dan SAVEPOINT",
      "Menghindari Dirty Read dan Phantom Read",
      "Mengenal skema Bintang (Star Schema) dan Snowflake pada Data Warehouse",
    ],
    concepts: ["ACID Properties", "Deadlock Handling", "OLTP vs OLAP", "Star Schema"],
  },
  {
    id: 12,
    pertemuan_id: 12,
    judul_materi: "karir bidang basis data",
    ringkasan: "Implementasi CRUD menyeluruh, integrasi ORM dengan backend, serta wawasan karir: Data Analyst, Data Engineer, dan Database Administrator (DBA).",
    file_url: null,
    is_open: false,
    category: "Implementasi & Karir",
    objectives: [
      "Membangun endpoint CRUD terintegrasi",
      "Menghindari SQL Injection vulnerability",
      "Memahami roadmap karir profesional di ekosistem data",
    ],
    concepts: ["CRUD Flow", "Prepared Statements", "DBA Roles", "Data Engineering Career"],
  },
  {
    id: 13,
    pertemuan_id: 13,
    judul_materi: "pengenalan NoSQL",
    ringkasan: "Pergeseran paradigma database non-relasional: Arsitektur NoSQL, pengenalan MongoDB, BSON documents, collections, dan CRUD operators.",
    file_url: null,
    is_open: false,
    category: "NoSQL",
    objectives: [
      "Membedakan RDBMS vs Document Store NoSQL",
      "Memasang dan menghubungkan MongoDB Compass",
      "Melakukan operasi find, insertOne, updateMany, dan agregasi",
    ],
    concepts: ["NoSQL Taxonomy", "Document Store (BSON)", "Dynamic Schema", "Aggregation Pipeline"],
  },
  {
    id: 14,
    pertemuan_id: 14,
    judul_materi: "advance NoSQL",
    ringkasan: "Graph database menggunakan Neo4J: Node, Relationship, Properties, Cypher Query Language (CQL), dan pemodelan social network / knowledge graph.",
    file_url: null,
    is_open: false,
    category: "Graph Database",
    objectives: [
      "Memahami struktur Graph Nodes and Directed Edges",
      "Menulis query Cypher: MATCH (n)-[r]->(m)",
      "Menganalisis shortest path dan rekomendasi jaringan",
    ],
    concepts: ["Graph Theory in DB", "Neo4J Nodes & Edges", "Cypher Language", "Knowledge Graph"],
  },
]

// 14 LKP matching CSV topics, initially file_url: null, is_open: false
export const initialLKPList: LKP[] = [
  {
    id: 1,
    pertemuan_id: 1,
    judul_lkp: "LKP 1 — Pengenalan Database",
    ringkasan: "Instalasi DBeaver, konfigurasi koneksi PostgreSQL, dan eksplorasi katalog sistem database.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "1.4 MB",
  },
  {
    id: 2,
    pertemuan_id: 2,
    judul_lkp: "LKP 2 — Pengenalan SQL & AI",
    ringkasan: "Latihan penulisan query dasar SELECT, WHERE, operator logika, serta eksperimen prompt AI untuk sintaks SQL.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "1.8 MB",
  },
  {
    id: 3,
    pertemuan_id: 3,
    judul_lkp: "LKP 3 — Conceptual Modelling Part 1",
    ringkasan: "Analisis studi kasus universitas: mengidentifikasi entitas, relasi, dan penentuan kandidat primary key.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "2.1 MB",
  },
  {
    id: 4,
    pertemuan_id: 4,
    judul_lkp: "LKP 4 — Conceptual Modelling Part 2 (ERD & EERD)",
    ringkasan: "Menggambar ERD lengkap dengan relasi 1:N dan M:N, notasi Crow's Foot, dan hirarki generalisasi/spesialisasi.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "2.5 MB",
  },
  {
    id: 5,
    pertemuan_id: 5,
    judul_lkp: "LKP 5 — Desain Lojik",
    ringkasan: "Transformasi ER diagram ke dalam skema tabel relasional lengkap dengan foreign key dan composite key.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "1.9 MB",
  },
  {
    id: 6,
    pertemuan_id: 6,
    judul_lkp: "LKP 6 — Normalisasi",
    ringkasan: "Studi kasus tabel anomali faktur penjualan: proses bertahap dari UNF, 1NF, 2NF, hingga 3NF.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "2.2 MB",
  },
  {
    id: 7,
    pertemuan_id: 7,
    judul_lkp: "LKP 7 — SQL & Perancangan Fisikal",
    ringkasan: "Implementasi DDL CREATE TABLE dengan CHECK constraints, DEFAULT, UNIQUE, dan pembuatan Index.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "2.0 MB",
  },
  {
    id: 8,
    pertemuan_id: 8,
    judul_lkp: "LKP 8 — Soal Latihan & Panduan UTS",
    ringkasan: "Paket lembar kerja simulasi Ujian Tengah Semester mencakup perancangan ERD hingga implementasi SQL.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "3.0 MB",
  },
  {
    id: 9,
    pertemuan_id: 9,
    judul_lkp: "LKP 9 — Pemantapan SQL, DDL, dan DML",
    ringkasan: "Latihan intensif manipulasi data, INSERT bertingkat, UPDATE dengan subquery, dan berbagai variasi JOIN.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "2.4 MB",
  },
  {
    id: 10,
    pertemuan_id: 10,
    judul_lkp: "LKP 10 — Advanced SQL (CTE & Window Functions)",
    ringkasan: "Praktek penulisan Common Table Expression dan Window Function untuk ranking, pagination, dan partisi data.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "2.3 MB",
  },
  {
    id: 11,
    pertemuan_id: 11,
    judul_lkp: "LKP 11 — Transactions, ACID & Data Warehouse",
    ringkasan: "Simulasi commit dan rollback transaksi perbankan serta pembuatan tabel fakta dan dimensi pada Data Warehouse.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "2.6 MB",
  },
  {
    id: 12,
    pertemuan_id: 12,
    judul_lkp: "LKP 12 — CRUD & Karir Bidang Basis Data",
    ringkasan: "Penyusunan modul backend CRUD utuh dan pembuatan portofolio proyek database untuk karir profesional.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "1.7 MB",
  },
  {
    id: 13,
    pertemuan_id: 13,
    judul_lkp: "LKP 13 — MongoDB & NoSQL CRUD",
    ringkasan: "Hands-on instalasi MongoDB, import dataset JSON, pembuatan collections, dan query agregasi data BSON.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "2.8 MB",
  },
  {
    id: 14,
    pertemuan_id: 14,
    judul_lkp: "LKP 14 — Neo4J & Graph Query Language",
    ringkasan: "Eksplorasi database graf: membuat relasi FRIENDS_WITH, HAS_POSTED, dan menganalisis path graf dengan Cypher.",
    file_url: null,
    is_open: false,
    type: "sebelum",
    file_type: "PDF",
    file_size: "2.9 MB",
  },
]

// Generate Initial Attendance:
// User explicitly instructed: "semua daftar kehadiaran praktikan saat ini diinisialisasi 5, danasprak bisa mengelola absen peserta, artinya bisa ditambahkan atau dikurangi secara manualdari dashboar asprak"
// For all 40 students: Meetings 1 to 5 are 'Hadir' (total 5). Meetings 6 to 14 are 'Alpa'.
export const generateInitialAbsensiList = (): Absensi[] => {
  const list: Absensi[] = []
  let idCounter = 1

  initialPraktikanList.forEach((student) => {
    initialPertemuanList.forEach((meeting) => {
      const isPresent = meeting.minggu_ke <= 5
      list.push({
        id: idCounter++,
        praktikan_id: student.id,
        pertemuan_id: meeting.id,
        waktu_absen: isPresent ? `${meeting.date} 08:15:00` : "-",
        status: isPresent ? "Hadir" : "Alpa",
        photo_url: isPresent ? "verified_photobooth" : null,
      })
    })
  })

  return list
}

// 14 Kuis (one for each meeting)
export const initialKuisList: Kuis[] = initialPertemuanList.map((m, idx) => ({
  id: m.id,
  pertemuan_id: m.id,
  judul_kuis: `Quiz ${m.id} — ${m.topik_pertemuan}`,
  total_soal: 10,
  difficulty: idx < 4 ? "Mudah" : idx < 9 ? "Sedang" : "Sulit",
  duration: 15,
}))

// Realistic Quiz Results: for the first 5 meetings (since 5 attended)
export const generateInitialKuisHasilList = (): KuisHasil[] => {
  const list: KuisHasil[] = []
  let idCounter = 1

  initialPraktikanList.forEach((student, sIdx) => {
    // each student has scores for meetings 1..5
    for (let kId = 1; kId <= 5; kId++) {
      // give realistic variation based on index
      const baseCorrect = 7 + ((sIdx + kId) % 4) // 7..10
      const correct = Math.min(10, Math.max(6, baseCorrect))
      const wrong = 10 - correct
      const score = correct * 10
      list.push({
        id: idCounter++,
        kuis_id: kId,
        praktikan_id: student.id,
        jumlah_benar: correct,
        jumlah_salah: wrong,
        skor: score,
      })
    }
  })

  return list
}

// Initial Keaktifan records for each student across meetings
export const generateInitialKeaktifanList = (): Keaktifan[] => {
  const list: Keaktifan[] = []
  let idCounter = 1

  initialPraktikanList.forEach((student, sIdx) => {
    for (let mId = 1; mId <= 5; mId++) {
      const ask = (sIdx + mId) % 3
      const ans = (sIdx * 2 + mId) % 4
      list.push({
        id: idCounter++,
        praktikan_id: student.id,
        pertemuan_id: mId,
        jumlah_bertanya: ask,
        jumlah_menjawab: ans,
      })
    }
  })

  return list
}
