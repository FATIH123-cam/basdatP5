-- =========================================================================
-- DATABASE SCHEMA: DASHBOARD PRAKTIKUM BASIS DATA
-- Sesuai Entity Relationship Diagram (ERD) dan Data CSV
-- =========================================================================

-- Existing tables preserved (JANGAN KURANGI APA APA)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'asprak')),
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    module VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'submitted', 'verified', 'rejected')),
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, meeting_id)
);

CREATE TABLE IF NOT EXISTS attendance_photos (
    id SERIAL PRIMARY KEY,
    attendance_id INTEGER REFERENCES attendance(id) ON DELETE CASCADE,
    pose VARCHAR(50) NOT NULL,
    photo_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    header_theme VARCHAR(50) DEFAULT 'default',
    header_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
    score INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS erd_diagrams (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- CANONICAL SCHEMA SESUAI DIAGRAM ERD
-- =========================================================================

-- 1. Table: praktikan
CREATE TABLE IF NOT EXISTS praktikan (
    id SERIAL PRIMARY KEY,
    nim VARCHAR(15) UNIQUE NOT NULL,
    nama VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255) NULL,
    header_picture VARCHAR(255) NULL,
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'asprak')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table: pertemuan
CREATE TABLE IF NOT EXISTS pertemuan (
    id SERIAL PRIMARY KEY,
    minggu_ke INT NOT NULL,
    topik_pertemuan VARCHAR(100) NOT NULL,
    waktu_buka_akses TIMESTAMP NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table: materi
CREATE TABLE IF NOT EXISTS materi (
    id SERIAL PRIMARY KEY,
    pertemuan_id INT NOT NULL REFERENCES pertemuan(id) ON DELETE CASCADE,
    judul_materi VARCHAR(100) NOT NULL,
    ringkasan TEXT NULL,
    file_url VARCHAR(255) NULL,
    is_open BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table: lkp
CREATE TABLE IF NOT EXISTS lkp (
    id SERIAL PRIMARY KEY,
    pertemuan_id INT NOT NULL REFERENCES pertemuan(id) ON DELETE CASCADE,
    judul_lkp VARCHAR(100) NOT NULL,
    ringkasan TEXT NULL,
    file_url VARCHAR(255) NULL,
    is_open BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Table: absensi
CREATE TABLE IF NOT EXISTS absensi (
    id SERIAL PRIMARY KEY,
    praktikan_id INT NOT NULL REFERENCES praktikan(id) ON DELETE CASCADE,
    pertemuan_id INT NOT NULL REFERENCES pertemuan(id) ON DELETE CASCADE,
    waktu_absen TIMESTAMP NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('Hadir', 'Izin', 'Sakit', 'Alpa')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(praktikan_id, pertemuan_id)
);

-- 6. Table: kuis
CREATE TABLE IF NOT EXISTS kuis (
    id SERIAL PRIMARY KEY,
    pertemuan_id INT NOT NULL REFERENCES pertemuan(id) ON DELETE CASCADE,
    judul_kuis VARCHAR(100) NOT NULL,
    total_soal INT NOT NULL DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Table: kuis_hasil
CREATE TABLE IF NOT EXISTS kuis_hasil (
    id SERIAL PRIMARY KEY,
    kuis_id INT NOT NULL REFERENCES kuis(id) ON DELETE CASCADE,
    praktikan_id INT NOT NULL REFERENCES praktikan(id) ON DELETE CASCADE,
    jumlah_benar INT NOT NULL DEFAULT 0,
    jumlah_salah INT NOT NULL DEFAULT 0,
    skor DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(kuis_id, praktikan_id)
);

-- 8. Table: keaktifan
CREATE TABLE IF NOT EXISTS keaktifan (
    id SERIAL PRIMARY KEY,
    praktikan_id INT NOT NULL REFERENCES praktikan(id) ON DELETE CASCADE,
    pertemuan_id INT NOT NULL REFERENCES pertemuan(id) ON DELETE CASCADE,
    jumlah_bertanya INT NOT NULL DEFAULT 0,
    jumlah_menjawab INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(praktikan_id, pertemuan_id)
);

-- =========================================================================
-- SEED DATA DARI FILE CSV
-- =========================================================================

-- Seed Praktikan (40 Mahasiswa)
INSERT INTO praktikan (id, nim, nama, password, role) VALUES
(1, 'M0401251001', 'Najla Rayya Falisha Istiazakka', 'M0401251001', 'student'),
(2, 'M0401251006', 'Rifqi Candra Mahardhika', 'M0401251006', 'student'),
(3, 'M0401251007', 'Alliyah Safwana', 'M0401251007', 'student'),
(4, 'M0401251011', 'Hasya Rahmat Sudarto', 'M0401251011', 'student'),
(5, 'M0401251015', 'Silmi Aulia Zahra', 'M0401251015', 'student'),
(6, 'M0401251018', 'Muhammad Ghifari Sudjud', 'M0401251018', 'student'),
(7, 'M0401251022', 'Anisya Nurumughni Ramadiyanto', 'M0401251022', 'student'),
(8, 'M0401251025', 'Devtasari Rajwa Hasanah', 'M0401251025', 'student'),
(9, 'M0401251028', 'Muhammad Daffa Prathama', 'M0401251028', 'student'),
(10, 'M0401251031', 'Katharina Vanessa Herwanto', 'M0401251031', 'student'),
(11, 'M0401251035', 'Nasya Pavita Kirana', 'M0401251035', 'student'),
(12, 'M0401251038', 'Bayu Chandra Wiranata', 'M0401251038', 'student'),
(13, 'M0401251039', 'Muhamad Nabil Arka', 'M0401251039', 'student'),
(14, 'M0401251043', 'Abyan Dinar Fathin Shafiulla', 'M0401251043', 'student'),
(15, 'M0401251046', 'Fazwah Afina Shabirah', 'M0401251046', 'student'),
(16, 'M0401251047', 'Tobias Stefan Manik', 'M0401251047', 'student'),
(17, 'M0401251053', 'Nurani Aprilia Elasti', 'M0401251053', 'student'),
(18, 'M0401251055', 'Aulia Zahra Assyifa', 'M0401251055', 'student'),
(19, 'M0401251063', 'Nickho Irsyad A', 'M0401251063', 'student'),
(20, 'M0401251064', 'Rama Monica Pardede', 'M0401251064', 'student'),
(21, 'M0401251070', 'Salsabila Ismatul Hawa', 'M0401251070', 'student'),
(22, 'M0401251072', 'Ahmad Faza Prayoga', 'M0401251072', 'student'),
(23, 'M0401251074', 'Hanif Althaf Bagaskara', 'M0401251074', 'student'),
(24, 'M0401251075', 'Muhammad Edo Aditya', 'M0401251075', 'student'),
(25, 'M0401251076', 'Stevanie Valencia', 'M0401251076', 'student'),
(26, 'M0401251078', 'Jesselyn Carissa Siburian', 'M0401251078', 'student'),
(27, 'M0401251082', 'April Lahirna', 'M0401251082', 'student'),
(28, 'M0401251087', 'Jonathan Hazel', 'M0401251087', 'student'),
(29, 'M0401251089', 'Nur Aini Rahmawati', 'M0401251089', 'student'),
(30, 'M0401251093', 'Nalendra Nitisara Isnugrahadi', 'M0401251093', 'student'),
(31, 'M0401251096', 'Rafar Evo Ahmad', 'M0401251096', 'student'),
(32, 'M0401251100', 'Siti Nurhalimah', 'M0401251100', 'student'),
(33, 'M0401251101', 'Varel Fadhil Akbar', 'M0401251101', 'student'),
(34, 'M0401251102', 'Nasywa Aulia Artha', 'M0401251102', 'student'),
(35, 'M0401251108', 'Diaz Farahsya Akbar', 'M0401251108', 'student'),
(36, 'M0401251116', 'Izzat Khalil Yassin', 'M0401251116', 'student'),
(37, 'M0401251118', 'Jovan Darius Gonza', 'M0401251118', 'student'),
(38, 'M0401251120', 'Gemilang Cahaya Ramadhan', 'M0401251120', 'student'),
(39, 'M0401251126', 'Stefanus Gavriel Aurellius Tanurahardja', 'M0401251126', 'student'),
(40, 'M0401251134', 'Muhammad Azmi', 'M0401251134', 'student')
ON CONFLICT (id) DO UPDATE SET nama = EXCLUDED.nama, nim = EXCLUDED.nim;

-- Seed Asprak (2 Asisten Praktikum dari CSV)
INSERT INTO praktikan (id, nim, nama, password, role) VALUES
(101, 'M0403241040', 'Muhammad Al Fatih', 'adminM0403241040', 'asprak'),
(102, 'M0403241041', 'Nadine Putri Agustin', 'adminM0403241041', 'asprak')
ON CONFLICT (id) DO UPDATE SET nama = EXCLUDED.nama, nim = EXCLUDED.nim;

-- Seed Pertemuan (14 Pertemuan dari CSV)
INSERT INTO pertemuan (id, minggu_ke, topik_pertemuan, waktu_buka_akses) VALUES
(1, 1, 'pengenalan database', '2026-09-02 08:00:00'),
(2, 2, 'pengenalan SQL', '2026-09-09 08:00:00'),
(3, 3, 'Conceptual Modelling Part 1', '2026-09-16 08:00:00'),
(4, 4, 'Conceptual Modelling Part 2', '2026-09-23 08:00:00'),
(5, 5, 'Desain Lojik', '2026-09-30 08:00:00'),
(6, 6, 'Normalisasi', '2026-10-07 08:00:00'),
(7, 7, 'SQL', '2026-10-14 08:00:00'),
(8, 8, 'UTS', '2026-10-21 08:00:00'),
(9, 9, 'Pemantapan SQL, DDL, dan DML', '2026-10-28 08:00:00'),
(10, 10, 'Advanced SQL', '2026-11-04 08:00:00'),
(11, 11, 'Transactions & ACID', '2026-11-11 08:00:00'),
(12, 12, 'CRUD', '2026-11-18 08:00:00'),
(13, 13, 'MongoDB', '2026-11-25 08:00:00'),
(14, 14, 'Neo4J', '2026-12-02 08:00:00')
ON CONFLICT (id) DO UPDATE SET topik_pertemuan = EXCLUDED.topik_pertemuan;

-- Seed Materi (14 Materi dari CSV, file_url NULL, is_open FALSE)
INSERT INTO materi (id, pertemuan_id, judul_materi, ringkasan, file_url, is_open) VALUES
(1, 1, 'database', 'Pengenalan konsep dasar sistem basis data, DBMS, arsitektur data, dan perbandingan flat-file dengan relational database.', NULL, FALSE),
(2, 2, 'integrasi AI dengan database', 'Pengantar Structured Query Language (SQL) serta pemanfaatan kecerdasan buatan (AI) untuk membantu query generation.', NULL, FALSE),
(3, 3, 'conceptual database design', 'Perancangan model konseptual tingkat awal: identifikasi entitas, atribut kunci, dan relasi bisnis.', NULL, FALSE),
(4, 4, 'ERD dan EERD', 'Pemodelan mendalam Entity Relationship Diagram dan EERD: kardinalitas, spesialisasi, dan generalisasi.', NULL, FALSE),
(5, 5, 'perancangan logical', 'Transformasi dari ERD/EERD menjadi skema relasional logika (tabel, foreign key, dan constraint integrity).', NULL, FALSE),
(6, 6, 'normalisasi', 'Teknik dekomposisi tabel tanpa kehilangan informasi untuk menghilangkan anomali (1NF, 2NF, 3NF, BCNF).', NULL, FALSE),
(7, 7, 'perancangan fisikal', 'Penerapan skema database ke mesin SQL: tipe data fisik, indexing (B-Tree, Hash), dan optimasi performa.', NULL, FALSE),
(8, 8, 'Evaluasi Tengah Semester Basis Data', 'Ujian Tengah Semester (UTS): Evaluasi komprehensif dari materi konseptual hingga query SQL.', NULL, FALSE),
(9, 9, 'SQL', 'Pemantapan sintaks DDL (CREATE, ALTER, DROP) dan DML (INSERT, UPDATE, DELETE, SELECT) beserta multi-table JOIN.', NULL, FALSE),
(10, 10, 'advance SQL', 'Fitur tingkat lanjut SQL: Common Table Expressions (CTE), Window Functions, Stored Procedures, dan Triggers.', NULL, FALSE),
(11, 11, 'data warehouse', 'Konsep transaksi ACID, transaction isolation levels, dan pengantar arsitektur Data Warehouse (Star Schema).', NULL, FALSE),
(12, 12, 'karir bidang basis data', 'Implementasi CRUD menyeluruh, integrasi ORM, serta wawasan karir: Data Analyst, Data Engineer, dan DBA.', NULL, FALSE),
(13, 13, 'pengenalan NoSQL', 'Pergeseran paradigma database non-relasional: Arsitektur NoSQL, pengenalan MongoDB, dan BSON collections.', NULL, FALSE),
(14, 14, 'advance NoSQL', 'Graph database menggunakan Neo4J: Node, Relationship, Properties, dan Cypher Query Language (CQL).', NULL, FALSE)
ON CONFLICT (id) DO UPDATE SET judul_materi = EXCLUDED.judul_materi;

-- Seed LKP (14 LKP dari CSV, file_url NULL, is_open FALSE)
INSERT INTO lkp (id, pertemuan_id, judul_lkp, ringkasan, file_url, is_open) VALUES
(1, 1, 'LKP 1 — Pengenalan Database', 'Instalasi DBeaver, konfigurasi koneksi PostgreSQL, dan eksplorasi katalog sistem database.', NULL, FALSE),
(2, 2, 'LKP 2 — Pengenalan SQL & AI', 'Latihan penulisan query dasar SELECT, WHERE, serta eksperimen prompt AI untuk sintaks SQL.', NULL, FALSE),
(3, 3, 'LKP 3 — Conceptual Modelling Part 1', 'Analisis studi kasus: mengidentifikasi entitas, relasi, dan penentuan kandidat primary key.', NULL, FALSE),
(4, 4, 'LKP 4 — Conceptual Modelling Part 2 (ERD & EERD)', 'Menggambar ERD lengkap dengan relasi 1:N dan M:N, notasi Crow''s Foot, dan hirarki generalisasi.', NULL, FALSE),
(5, 5, 'LKP 5 — Desain Lojik', 'Transformasi ER diagram ke dalam skema tabel relasional lengkap dengan foreign key.', NULL, FALSE),
(6, 6, 'LKP 6 — Normalisasi', 'Studi kasus tabel anomali faktur penjualan: proses bertahap dari UNF hingga 3NF.', NULL, FALSE),
(7, 7, 'LKP 7 — SQL & Perancangan Fisikal', 'Implementasi DDL CREATE TABLE dengan CHECK constraints, DEFAULT, dan pembuatan Index.', NULL, FALSE),
(8, 8, 'LKP 8 — Soal Latihan & Panduan UTS', 'Paket lembar kerja simulasi Ujian Tengah Semester mencakup perancangan ERD hingga implementasi SQL.', NULL, FALSE),
(9, 9, 'LKP 9 — Pemantapan SQL, DDL, dan DML', 'Latihan intensif manipulasi data, INSERT bertingkat, dan berbagai variasi JOIN.', NULL, FALSE),
(10, 10, 'LKP 10 — Advanced SQL (CTE & Window Functions)', 'Praktek penulisan Common Table Expression dan Window Function untuk ranking dan partisi data.', NULL, FALSE),
(11, 11, 'LKP 11 — Transactions, ACID & Data Warehouse', 'Simulasi commit dan rollback transaksi perbankan serta pembuatan tabel fakta dan dimensi.', NULL, FALSE),
(12, 12, 'LKP 12 — CRUD & Karir Bidang Basis Data', 'Penyusunan modul backend CRUD utuh dan pembuatan portofolio proyek database.', NULL, FALSE),
(13, 13, 'LKP 13 — MongoDB & NoSQL CRUD', 'Hands-on instalasi MongoDB, import dataset JSON, dan query agregasi data BSON.', NULL, FALSE),
(14, 14, 'LKP 14 — Neo4J & Graph Query Language', 'Eksplorasi database graf: membuat relasi node dan menganalisis path graf dengan Cypher.', NULL, FALSE)
ON CONFLICT (id) DO UPDATE SET judul_lkp = EXCLUDED.judul_lkp;

-- Seed Absensi (Setiap mahasiswa diinisialisasi 5 kehadiran awal)
-- Pertemuan 1 s.d. 5: 'Hadir', Pertemuan 6 s.d. 14: 'Alpa'
INSERT INTO absensi (praktikan_id, pertemuan_id, waktu_absen, status)
SELECT p.id, m.id,
    CASE WHEN m.minggu_ke <= 5 THEN TIMESTAMP '2026-09-02 08:15:00' + ((m.minggu_ke - 1) * INTERVAL '7 days') ELSE NULL END,
    CASE WHEN m.minggu_ke <= 5 THEN 'Hadir' ELSE 'Alpa' END
FROM praktikan p
CROSS JOIN pertemuan m
WHERE p.role = 'student'
CROSS JOIN pertemuan m
WHERE p.role = 'student'
ON CONFLICT (praktikan_id, pertemuan_id) DO NOTHING;

-- Seed Kuis (14 Kuis)
INSERT INTO kuis (id, pertemuan_id, judul_kuis, total_soal)
SELECT id, id, 'Quiz ' || id || ' — ' || topik_pertemuan, 10
FROM pertemuan
ON CONFLICT (id) DO NOTHING;

-- Seed Kuis Hasil (Untuk 5 kuis pertama yang sudah hadir)
INSERT INTO kuis_hasil (kuis_id, praktikan_id, jumlah_benar, jumlah_salah, skor)
SELECT k.id, p.id,
    8 + ((p.id + k.id) % 3),
    2 - ((p.id + k.id) % 3),
    (8 + ((p.id + k.id) % 3)) * 10
FROM kuis k
CROSS JOIN praktikan p
WHERE k.id <= 5 AND p.role = 'student'
ON CONFLICT (kuis_id, praktikan_id) DO NOTHING;

-- Seed Keaktifan
INSERT INTO keaktifan (praktikan_id, pertemuan_id, jumlah_bertanya, jumlah_menjawab)
SELECT p.id, m.id, (p.id + m.id) % 3, (p.id * 2 + m.id) % 4
FROM praktikan p
CROSS JOIN pertemuan m
WHERE m.id <= 5 AND p.role = 'student'
ON CONFLICT (praktikan_id, pertemuan_id) DO NOTHING;
