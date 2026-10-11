import { useNav, PageName } from "../context"

interface NavItem {
  label: string
  page: PageName
  icon: React.ReactNode
  emoji: string
  role?: "student" | "admin"
}

function Icon({ d }: { d: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  )
}

const studentNavItems: NavItem[] = [
  {
    label: "Dashboard",
    page: "student-dashboard",
    emoji: "🏠",
    icon: <Icon d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" />,
  },
  {
    label: "Absensi Foto",
    page: "student-attendance-select",
    emoji: "📸",
    icon: <Icon d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8" />,
  },
  {
    label: "Riwayat Absensi",
    page: "student-attendance-history",
    emoji: "📋",
    icon: <Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
  },
  {
    label: "Materi",
    page: "student-materials",
    emoji: "📖",
    icon: <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  },
  {
    label: "LKP",
    page: "student-lkp",
    emoji: "📄",
    icon: <Icon d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6" />,
  },
  {
    label: "Kuis",
    page: "student-quiz",
    emoji: "🧠",
    icon: <Icon d="M9 9a3 3 0 115.196 2.072c-.467.464-1.196.927-1.196 1.928v1 M12 17h.01" />,
  },
  {
    label: "Leaderboard",
    page: "student-leaderboard",
    emoji: "🏆",
    icon: <Icon d="M8 21h8 M12 17V21 M7 4v8a5 5 0 0010 0V4 M5 9H3 M21 9h-2" />,
  },
  {
    label: "ERD Designer",
    page: "student-erd",
    emoji: "🗄️",
    icon: <Icon d="M4 6h16M4 12h16M4 18h16" />,
  },
  {
    label: "Profil",
    page: "student-profile",
    emoji: "👤",
    icon: <Icon d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8" />,
  },
]

const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    page: "admin-dashboard",
    emoji: "🏠",
    icon: <Icon d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" />,
  },
  {
    label: "Kelola Absensi",
    page: "admin-attendance",
    emoji: "📋",
    icon: <Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
  },
  {
    label: "Verifikasi Foto",
    page: "admin-photo-verify",
    emoji: "📸",
    icon: <Icon d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8" />,
  },
  {
    label: "Pertemuan",
    page: "admin-meetings",
    emoji: "📅",
    icon: <Icon d="M8 7V3 M16 7V3 M3 11h18 M5 3h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />,
  },
  {
    label: "Materi",
    page: "admin-materials",
    emoji: "📖",
    icon: <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  },
  {
    label: "Kuis",
    page: "admin-quiz",
    emoji: "🧠",
    icon: <Icon d="M9 9a3 3 0 115.196 2.072c-.467.464-1.196.927-1.196 1.928v1 M12 17h.01" />,
  },
  {
    label: "ERD Designer",
    page: "admin-erd",
    emoji: "🗄️",
    icon: <Icon d="M4 6h16M4 12h16M4 18h16" />,
  },
  {
    label: "Pengumuman",
    page: "admin-announcements",
    emoji: "📢",
    icon: <Icon d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: Props) {
  const { page, navigate, role, setRole } = useNav()

  const isAdmin = role === "admin"
  const navItems = isAdmin ? adminNavItems : studentNavItems

  const handleNav = (p: PageName) => {
    navigate(p)
    onClose()
  }

  const handleLogout = () => {
    setRole(null)
    navigate("landing")
    onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{
          background: "#0a0a0a",
          borderRight: "3.5px solid #0a0a0a",
        }}
      >
        {/* Logo / Brand Header */}
        <div
          className="px-4 py-4 flex items-center gap-3"
          style={{ background: "#FFE033", borderBottom: "3px solid #0a0a0a" }}
        >
          <div
            className="w-10 h-10 flex items-center justify-center text-xl rounded-lg"
            style={{ background: "#0a0a0a", border: "2px solid #0a0a0a", boxShadow: "2px 2px 0 #FFE033" }}
          >
            🎓
          </div>
          <div>
            <p
              className="leading-tight"
              style={{ fontFamily: "'Bangers', cursive", fontSize: "1.15rem", letterSpacing: "0.05em", color: "#0a0a0a" }}
            >
              Praktikum Basdat
            </p>
            <p className="text-xs font-bold" style={{ color: "#0a0a0a" }}>
              {isAdmin ? "ASISTEN PRAKTIKUM" : "PORTAL BELAJAR"}
            </p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-1 mt-2">
          {navItems.map((item) => {
            const active = page === item.page || (
              // highlight attendance pages
              item.page === "student-attendance-select" &&
              ["student-attendance-instructions", "student-attendance-camera", "student-attendance-review", "student-attendance-success"].includes(page)
            )
            return (
              <button
                key={item.page + item.label}
                onClick={() => handleNav(item.page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-bold transition-all comic-sidebar-item ${active ? "active" : ""}`}
                style={{
                  color: active ? "#0a0a0a" : "#fffdf5",
                }}
              >
                <span className="text-base">{item.emoji}</span>
                <span>{item.label}</span>
                {active && (
                  <span
                    className="ml-auto text-xs"
                    style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
                  >
                    →
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-bold transition-all"
            style={{ color: "#E8212A" }}
          >
            <span>🚪</span>
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  )
}
