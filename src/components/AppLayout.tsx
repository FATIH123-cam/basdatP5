import { useState } from "react"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

interface Props {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen relative" style={{ background: "#fffdf5" }}>
      {/* Comic halftone background is handled via CSS body::before */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar onMenuClick={() => setSidebarOpen(true)} />
      <main className="lg:pl-64 pt-16 min-h-screen relative z-10">
        <div className="p-5 lg:p-8 max-w-7xl">{children}</div>
      </main>
    </div>
  )
}
