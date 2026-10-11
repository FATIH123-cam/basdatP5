import { useNav } from "../context"
import dashboardBg from "../assets/dashboard-bg.jpg"
import AsprakCarousel from "../components/AsprakCarousel";

const HERO_IMAGE = dashboardBg

const features = [
  {
    tag: "POW! 📸",
    tagColor: "bg-[#FFE033] text-[#0a0a0a]",
    bg: "bg-[#fffdf5]",
    iconBg: "bg-[#FFE033]",
    title: "Absensi Photobox 3-Pose",
    desc: "Sistem absensi digital seru dengan kamera laptop! Ambil 3 pose unik berbeda, pilih tema warna, dan download photo strip ala photobox.",
    action: "Coba Absen 📸",
  },
  {
    tag: "ZAP! 📚",
    tagColor: "bg-[#18B5D8] text-[#0a0a0a]",
    bg: "bg-[#fffdf5]",
    iconBg: "bg-[#18B5D8]",
    title: "Modul & LKP Lengkap",
    desc: "Akses Lembar Kerja Praktikum, cheatsheet query SQL, dan ringkasan materi tiap pertemuan secara instan tanpa ribet.",
    action: "Buka Modul 📖",
  },
  {
    tag: "BAM! 🎯",
    tagColor: "bg-[#22C55E] text-[#0a0a0a]",
    bg: "bg-[#fffdf5]",
    iconBg: "bg-[#22C55E]",
    title: "Latihan & Kuis Interaktif",
    desc: "Uji pemahaman database dengan soal latihan seru, tantangan query langsung, dan feedback instan dari asisten praktikum.",
    action: "Mulai Kuis ⚡",
  },
  {
    tag: "BOOM! 🏆",
    tagColor: "bg-[#E8212A] text-white",
    bg: "bg-[#fffdf5]",
    iconBg: "bg-[#E8212A]",
    title: "Papan Peringkat Juara",
    desc: "Pantau ranking kelasmu secara real-time! Kumpulkan poin kehadiran, nilai tugas terbaik, dan raih posisi teratas.",
    action: "Cek Leaderboard 👑",
  },
]

const steps = [
  {
    num: "01",
    panel: "PANEL 1",
    emoji: "🔑",
    title: "Login Akun Praktikum",
    desc: "Masuk dengan email kampus dan NIM sebagai password default. Cepat dan aman!",
    color: "#FFE033",
  },
  {
    num: "02",
    panel: "PANEL 2",
    emoji: "📸",
    title: "Absen 3 Pose Photobox",
    desc: "Nyalakan kamera, ambil 3 foto dengan pose terbaikmu, lalu generate bukti kehadiran!",
    color: "#18B5D8",
  },
  {
    num: "03",
    panel: "PANEL 3",
    emoji: "💻",
    title: "Pelajari Materi & LKP",
    desc: "Kerjakan lembar kerja praktikum dan diskusikan error query bersama asisten lab.",
    color: "#22C55E",
  },
  {
    num: "04",
    panel: "PANEL 4",
    emoji: "👑",
    title: "Raih Nilai Tertinggi!",
    desc: "Kumpulkan nilai tugas maksimal dan jadilah peringkat pertama di leaderboard kelas!",
    color: "#E8212A",
    textColor: "white",
  },
]

const stats = [
  { label: "MAHASISWA AKTIF", val: "120+", emoji: "👥", bg: "#FFE033" },
  { label: "MODUL PRAKTIKUM", val: "10 BAB", emoji: "📚", bg: "#18B5D8" },
  { label: "POSE PHOTOBOX", val: "3 GAYA", emoji: "📸", bg: "#22C55E" },
  { label: "TINGKAT KEPUASAN", val: "100%", emoji: "🔥", bg: "#E8212A", textWhite: true },
]

export default function LandingPage() {
  const { navigate } = useNav()

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "#fffdf5" }}>
      {/* Comic Action Background Floating Badges */}
      <div
        className="fixed top-24 left-4 text-5xl font-black opacity-15 pointer-events-none select-none z-0 hidden lg:block"
        style={{ fontFamily: "'Bangers', cursive", color: "#E8212A", transform: "rotate(-18deg)" }}
      >
        POW! 💥
      </div>
      <div
        className="fixed bottom-24 left-6 text-6xl font-black opacity-15 pointer-events-none select-none z-0 hidden lg:block"
        style={{ fontFamily: "'Bangers', cursive", color: "#1B72D4", transform: "rotate(14deg)" }}
      >
        BOOM! ⚡
      </div>
      <div
        className="fixed top-1/3 right-6 text-6xl font-black opacity-15 pointer-events-none select-none z-0 hidden lg:block"
        style={{ fontFamily: "'Bangers', cursive", color: "#FFE033", transform: "rotate(-12deg)" }}
      >
        ZAP! ⚡
      </div>

      {/* ========================================================
          COMIC TOP NAVBAR
         ======================================================== */}
      <nav
        className="fixed top-0 inset-x-0 z-50 px-4 py-3"
        style={{
          background: "#FFE033",
          borderBottom: "4px solid #0a0a0a",
          boxShadow: "0 4px 0 #0a0a0a",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate("landing")}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div
              className="w-10 h-10 flex items-center justify-center text-xl rounded-lg group-hover:rotate-6 transition-transform"
              style={{
                background: "#fffdf5",
                border: "2.5px solid #0a0a0a",
                boxShadow: "2.5px 2.5px 0 #0a0a0a",
              }}
            >
              🎓
            </div>
            <div>
              <span
                className="text-xl sm:text-2xl leading-none font-black block tracking-wide"
                style={{ fontFamily: "'Bangers', cursive", color: "#0a0a0a" }}
              >
                PRAKTIKUM BASDAT
              </span>
              <span
                className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-black text-[#FFE033] inline-block mt-0.5"
                style={{ fontFamily: "'Bangers', cursive" }}
              >
                P5 • EDISI KOMIK
              </span>
            </div>
          </div>

          {/* Links & Login button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#fitur"
              className="hidden md:inline-block font-black text-sm uppercase px-3 py-1.5 rounded-lg text-black hover:bg-black hover:text-[#FFE033] transition-colors"
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
            >
              ⭐ FITUR UTAMA
            </a>
            <a
              href="#cara-kerja"
              className="hidden md:inline-block font-black text-sm uppercase px-3 py-1.5 rounded-lg text-black hover:bg-black hover:text-[#FFE033] transition-colors"
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
            >
              📖 CARA KERJA
            </a>
            <button
              onClick={() => navigate("login")}
              className="comic-btn comic-btn-danger text-sm py-2 px-4 sm:px-5"
              style={{ fontSize: "1rem" }}
            >
              🚀 MASUK (LOGIN)
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================
          HERO SECTION (COMIC COVER STYLE)
         ======================================================== */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Comic background cover frame */}
        <div className="max-w-6xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden p-6 sm:p-12 text-center"
            style={{
              background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #0F172A 100%)",
              border: "5px solid #0a0a0a",
              boxShadow: "10px 10px 0 #0a0a0a",
            }}
          >
            {/* Background image overlay with comic halftone texture */}
            <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-luminosity">
              <img
                src={HERO_IMAGE}
                alt="Laboratorium komputer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Halftone dot pattern overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
              }}
            />

            {/* Top Comic Badges */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
              <div
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-sm"
                style={{
                  background: "#FFE033",
                  color: "#0a0a0a",
                  border: "2.5px solid #0a0a0a",
                  boxShadow: "3px 3px 0 #0a0a0a",
                  fontFamily: "'Bangers', cursive",
                  letterSpacing: "0.05em",
                }}
              >
                <span>🔥</span> SEMESTER GANJIL 2024/2025
              </div>

              <div
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black flex items-center gap-1.5"
                style={{
                  background: "#E8212A",
                  color: "white",
                  border: "2.5px solid #0a0a0a",
                  boxShadow: "3px 3px 0 #0a0a0a",
                  fontFamily: "'Bangers', cursive",
                  letterSpacing: "0.05em",
                }}
              >
                <span>📸</span> FITUR BARU: ABSENSI PHOTOBOX 3-POSE!
              </div>
            </div>

            {/* Main Title Comic Heading */}
            <div className="relative z-10 mb-4">
              <p
                className="text-lg sm:text-2xl font-black uppercase text-[#FFE033] tracking-widest mb-1"
                style={{
                  fontFamily: "'Bangers', cursive",
                  textShadow: "2px 2px 0 #0a0a0a",
                }}
              >
                ⚡ PORTAL RESMI PRAKTIKUM BASDAT ⚡
              </p>
              <h1
                className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight uppercase tracking-wide"
                style={{
                  fontFamily: "'Bangers', cursive",
                  textShadow: "4px 4px 0 #0a0a0a, -2px -2px 0 #0a0a0a, 2px -2px 0 #0a0a0a, -2px 2px 0 #0a0a0a",
                }}
              >
                SELAMAT DATANG DI <br />
                <span
                  className="inline-block px-3 sm:px-6 py-1 rounded-xl my-1 transform -rotate-1"
                  style={{
                    background: "#FFE033",
                    color: "#0a0a0a",
                    border: "4px solid #0a0a0a",
                    boxShadow: "6px 6px 0 #0a0a0a",
                    textShadow: "none",
                  }}
                >
                  PRAKTIKUM BASDAT P5!
                </span>
              </h1>
            </div>

            {/* P5 Slogan Banner */}
            <div className="relative z-10 mb-8 flex justify-center">
              <div
                className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-white"
                style={{
                  background: "rgba(0,0,0,0.65)",
                  border: "2px dashed #FFE033",
                }}
              >
                <span className="text-[#FFE033]">★ PINTAR</span>
                <span className="text-white">•</span>
                <span className="text-[#18B5D8]">★ PRODUKTIF</span>
                <span className="text-white">•</span>
                <span className="text-[#22C55E]">★ POSITIF</span>
                <span className="text-white">•</span>
                <span className="text-[#F97316]">★ PENOLONG</span>
                <span className="text-white">•</span>
                <span className="text-[#EC4899]">★ PEMBERANI</span>
              </div>
            </div>

            {/* Speech Bubble description */}
            <div className="relative z-10 max-w-2xl mx-auto mb-10">
              <div
                className="p-4 sm:p-5 rounded-2xl text-sm sm:text-base font-bold text-left sm:text-center text-[#0a0a0a] relative"
                style={{
                  background: "#fffdf5",
                  border: "3.5px solid #0a0a0a",
                  boxShadow: "6px 6px 0 #0a0a0a",
                }}
              >
                <div className="flex items-center gap-2 mb-1 justify-center">
                  <span className="text-xl">💬</span>
                  <span
                    className="font-black text-base uppercase"
                    style={{ fontFamily: "'Bangers', cursive", color: "#1B72D4" }}
                  >
                    PESAN DARI ASISTEN PRAKTIKUM:
                  </span>
                </div>
                <p className="text-slate-800 font-bold leading-relaxed">
                  "Jadi apakah kalian pikir kita kita berdua jadi asprak karena jago basdat? Basdatnya A? pintar? hebat? oh tidakkk, in this economy kita perlu duit aja sih, jadi selamat terjebak ya teman teman, ENJOY!"
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate("login")}
                className="w-full sm:w-auto comic-btn comic-btn-primary text-lg sm:text-xl py-3.5 px-8"
                style={{
                  fontSize: "1.25rem",
                  border: "3.5px solid #0a0a0a",
                  boxShadow: "6px 6px 0 #0a0a0a",
                }}
              >
                🚀 MASUK KE DASHBOARD!
              </button>

              <a
                href="#fitur"
                className="w-full sm:w-auto comic-btn comic-btn-white text-lg sm:text-xl py-3.5 px-8"
                style={{
                  fontSize: "1.25rem",
                  border: "3.5px solid #0a0a0a",
                  boxShadow: "6px 6px 0 #0a0a0a",
                  textDecoration: "none",
                }}
              >
                ⭐ LIHAT FITUR KOMIK
              </a>
            </div>
          </div>
        </div>
      </section>

      <AsprakCarousel />

      {/* ========================================================
          COMIC STATS STRIP
         ======================================================== */}
      <section className="py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((st) => (
              <div
                key={st.label}
                className="p-4 sm:p-5 rounded-2xl flex items-center gap-3 sm:gap-4 transition-transform hover:-translate-y-1"
                style={{
                  background: st.bg,
                  border: "3.5px solid #0a0a0a",
                  boxShadow: "5px 5px 0 #0a0a0a",
                  color: st.textWhite ? "white" : "#0a0a0a",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: "#fffdf5",
                    border: "2.5px solid #0a0a0a",
                    boxShadow: "2px 2px 0 #0a0a0a",
                    color: "#0a0a0a",
                  }}
                >
                  {st.emoji}
                </div>
                <div>
                  <div
                    className="text-2xl sm:text-3xl font-black leading-none"
                    style={{
                      fontFamily: "'Bangers', cursive",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {st.val}
                  </div>
                  <div
                    className="text-xs font-black uppercase mt-1 opacity-90"
                    style={{
                      fontFamily: "'Bangers', cursive",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {st.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          COMIC FEATURES SECTION (COMIC PANELS GRID)
         ======================================================== */}
      <section id="fitur" className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase mb-2"
              style={{
                background: "#E8212A",
                color: "white",
                border: "2.5px solid #0a0a0a",
                boxShadow: "3px 3px 0 #0a0a0a",
                fontFamily: "'Bangers', cursive",
                letterSpacing: "0.05em",
              }}
            >
              ★ FITUR SPESIAL KELAS ★
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black uppercase text-[#0a0a0a] tracking-wide"
              style={{ fontFamily: "'Bangers', cursive" }}
            >
              SEMUA YANG KAMU BUTUHKAN UNTUK LULUS A! 💥
            </h2>
            <p className="text-slate-600 font-bold max-w-xl mx-auto text-sm sm:text-base mt-2">
              Dirancang dengan pengalaman interaktif dan visual komik yang bikin praktikum jadi jauh lebih asyik!
            </p>
          </div>

          {/* Feature Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 relative flex flex-col justify-between transition-all"
                style={{
                  background: f.bg,
                  border: "4px solid #0a0a0a",
                  boxShadow: "7px 7px 0 #0a0a0a",
                }}
              >
                {/* Comic corner sticker tag */}
                <div
                  className="absolute -top-3.5 right-6 px-3 py-1 rounded-lg text-xs font-black transform rotate-2"
                  style={{
                    border: "2.5px solid #0a0a0a",
                    boxShadow: "2.5px 2.5px 0 #0a0a0a",
                    fontFamily: "'Bangers', cursive",
                    letterSpacing: "0.05em",
                    background: f.tagColor.includes("bg-[") ? f.tagColor.split(" ")[0].replace("bg-[", "").replace("]", "") : "#FFE033",
                    color: f.tagColor.includes("text-white") ? "white" : "#0a0a0a",
                  }}
                >
                  {f.tag}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{
                        background: f.iconBg.replace("bg-[", "").replace("]", ""),
                        border: "2.5px solid #0a0a0a",
                        boxShadow: "3px 3px 0 #0a0a0a",
                        color: f.iconBg.includes("#E8212A") ? "white" : "#0a0a0a",
                      }}
                    >
                      {i === 0 ? "📸" : i === 1 ? "📚" : i === 2 ? "⚡" : "🏆"}
                    </div>
                    <h3
                      className="text-2xl font-black text-[#0a0a0a] uppercase tracking-wide"
                      style={{ fontFamily: "'Bangers', cursive" }}
                    >
                      {f.title}
                    </h3>
                  </div>

                  <p className="text-slate-700 font-bold text-sm sm:text-base leading-relaxed mb-6">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-dashed border-black/20 flex items-center justify-between">
                  <button
                    onClick={() => navigate("login")}
                    className="comic-btn text-xs py-2 px-3.5"
                    style={{
                      background: "#FFE033",
                      color: "#0a0a0a",
                      border: "2px solid #0a0a0a",
                      boxShadow: "3px 3px 0 #0a0a0a",
                    }}
                  >
                    {f.action} →
                  </button>
                  <span className="text-xs font-black text-slate-500 uppercase" style={{ fontFamily: "'Bangers', cursive" }}>
                    PRAKTIKUM BASDAT P5
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          HOW IT WORKS (COMIC STRIP STORYBOARD)
         ======================================================== */}
      <section id="cara-kerja" className="py-16 px-4 sm:px-6" style={{ background: "#fffdf5" }}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase mb-2"
              style={{
                background: "#18B5D8",
                color: "#0a0a0a",
                border: "2.5px solid #0a0a0a",
                boxShadow: "3px 3px 0 #0a0a0a",
                fontFamily: "'Bangers', cursive",
                letterSpacing: "0.05em",
              }}
            >
              ★ STRIP KOMIK TUTORIAL ★
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black uppercase text-[#0a0a0a] tracking-wide"
              style={{ fontFamily: "'Bangers', cursive" }}
            >
              CARA KERJA DALAM 4 PANEL SERU! 📖
            </h2>
            <p className="text-slate-600 font-bold max-w-xl mx-auto text-sm sm:text-base mt-2">
              Ikuti alur praktikum mudah dari login hingga raih nilai sempurna di akhir semester!
            </p>
          </div>

          {/* Comic Storyboard 4 Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div
                key={st.num}
                className="relative rounded-2xl p-5 flex flex-col justify-between transition-transform hover:-translate-y-1.5"
                style={{
                  background: "#fffdf5",
                  border: "4px solid #0a0a0a",
                  boxShadow: "6px 6px 0 #0a0a0a",
                }}
              >
                {/* Panel Label Ribbon */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-black uppercase"
                    style={{
                      background: st.color,
                      color: st.textColor || "#0a0a0a",
                      border: "2px solid #0a0a0a",
                      boxShadow: "2px 2px 0 #0a0a0a",
                      fontFamily: "'Bangers', cursive",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {st.panel}
                  </span>

                  <span
                    className="text-2xl font-black"
                    style={{ fontFamily: "'Bangers', cursive", color: "#0a0a0a" }}
                  >
                    #{st.num}
                  </span>
                </div>

                {/* Big Emoji Illustration */}
                <div
                  className="w-16 h-16 mx-auto my-3 rounded-2xl flex items-center justify-center text-3xl"
                  style={{
                    background: st.color,
                    border: "3px solid #0a0a0a",
                    boxShadow: "4px 4px 0 #0a0a0a",
                  }}
                >
                  {st.emoji}
                </div>

                <div className="text-center my-2">
                  <h3
                    className="text-xl font-black uppercase text-[#0a0a0a] mb-2"
                    style={{ fontFamily: "'Bangers', cursive" }}
                  >
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div
                  className="mt-4 pt-3 text-center border-t-2 border-dashed border-black/20 text-xs font-black"
                  style={{ fontFamily: "'Bangers', cursive", color: "#1B72D4" }}
                >
                  {i === 3 ? "🎉 FINISH & SUKSES!" : "LANJUT KE PANEL BERIKUTNYA ➔"}
                </div>
              </div>
            ))}
          </div>

          {/* Big Comic Call-To-Action Banner */}
          <div
            className="mt-16 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
            style={{
              background: "#FFE033",
              border: "5px solid #0a0a0a",
              boxShadow: "9px 9px 0 #0a0a0a",
            }}
          >
            <div
              className="absolute -top-6 -left-6 text-7xl font-black opacity-10 pointer-events-none select-none"
              style={{ fontFamily: "'Bangers', cursive" }}
            >
              KABOOM!
            </div>
            <div
              className="absolute -bottom-6 -right-6 text-7xl font-black opacity-10 pointer-events-none select-none"
              style={{ fontFamily: "'Bangers', cursive" }}
            >
              POW!
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <span
                className="px-3.5 py-1 rounded-full text-xs font-black uppercase inline-block mb-3"
                style={{
                  background: "#0a0a0a",
                  color: "#FFE033",
                  fontFamily: "'Bangers', cursive",
                  letterSpacing: "0.05em",
                }}
              >
                ⚡ JANGAN SAMPAI KETINGGALAN ABSEN
              </span>

              <h3
                className="text-3xl sm:text-5xl font-black uppercase text-[#0a0a0a] mb-4 leading-tight"
                style={{ fontFamily: "'Bangers', cursive" }}
              >
                SIAP UNTUK MEMULAI PRAKTIKUM HARI INI? 💥
              </h3>

              <p className="text-slate-800 font-bold text-sm sm:text-base mb-8">
                Klik tombol di bawah untuk langsung menuju halaman login dan akses semua materi serta absensi photobox!
              </p>

              <button
                onClick={() => navigate("login")}
                className="comic-btn comic-btn-danger text-xl py-4 px-10"
                style={{
                  fontSize: "1.3rem",
                  border: "4px solid #0a0a0a",
                  boxShadow: "6px 6px 0 #0a0a0a",
                }}
              >
                🚀 GAS MASUK SEKARANG! 🚀
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          COMIC FOOTER
         ======================================================== */}
      <footer
        className="py-12 px-4 sm:px-6"
        style={{
          background: "#0a0a0a",
          color: "white",
          borderTop: "5px solid #0a0a0a",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                  style={{ background: "#FFE033", color: "#0a0a0a", border: "2px solid white" }}
                >
                  🎓
                </div>
                <span
                  className="text-2xl font-black text-[#FFE033] tracking-wide"
                  style={{ fontFamily: "'Bangers', cursive" }}
                >
                  PRAKTIKUM BASDAT P5
                </span>
              </div>
              <p className="text-sm font-bold text-slate-300 leading-relaxed">
                Platform digital praktikum Basis Data dengan tema komik & fitur absensi foto 3 pose bergaya photobox untuk mahasiswa.
              </p>
            </div>

            {/* Links */}
            <div>
              <p
                className="text-lg font-black text-[#FFE033] uppercase mb-3"
                style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
              >
                ⚡ NAVIGASI CEPAT
              </p>
              <ul className="space-y-2 text-sm font-bold">
                <li>
                  <a href="#" className="hover:text-[#FFE033] transition-colors">
                    ➔ Beranda Utama
                  </a>
                </li>
                <li>
                  <a href="#fitur" className="hover:text-[#FFE033] transition-colors">
                    ➔ Fitur Unggulan
                  </a>
                </li>
                <li>
                  <a href="#cara-kerja" className="hover:text-[#FFE033] transition-colors">
                    ➔ Cara Kerja Komik
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => navigate("login")}
                    className="hover:text-[#FFE033] transition-colors font-bold text-left"
                  >
                    ➔ Masuk / Login Dashboard
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p
                className="text-lg font-black text-[#FFE033] uppercase mb-3"
                style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
              >
                💬 KONTAK ASISTEN LAB
              </p>
              <div className="space-y-2 text-sm font-bold text-slate-300">
                <p>📧 asprak.basdat@univ.ac.id</p>
                <p>💬 LINE / WA: @praktikumBasdatP5</p>
                <p>📍 Lab Komputer Terpadu, Gedung A Lt. 2</p>
              </div>
            </div>
          </div>

          <div
            className="pt-6 text-center text-xs font-bold text-slate-400 border-t-2 border-zinc-800"
            style={{ fontFamily: "'Comic Neue', sans-serif" }}
          >
            © 2024 Praktikum Basis Data P5 — Edisi Komik Superhero. Hak cipta dilindungi.
          </div>
        </div>
      </footer>
    </div>
  )
}
