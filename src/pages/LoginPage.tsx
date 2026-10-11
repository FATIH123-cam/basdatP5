import { useState } from "react"
import { useNav } from "../context"

export default function LoginPage() {
  const { navigate, setRole } = useNav()
  const [form, setForm] = useState({ nim: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      if (form.nim === "admin" && form.password === "admin") {
        setRole("admin")
        navigate("admin-dashboard")
      } else if (form.nim.length >= 6 && form.password.length >= 4) {
        setRole("student")
        navigate("student-dashboard")
      } else {
        setError("NIM atau password salah! Coba lagi 🔒")
      }
    }, 800)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{ background: "#fffdf5" }}
    >
      {/* Halftone dots */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Comic decorations */}
      <div
        className="absolute top-8 left-8 w-20 h-20 flex items-center justify-center text-3xl rotate-[-15deg] hidden md:flex"
        style={{ background: "#FFE033", border: "3px solid #0a0a0a", borderRadius: "12px", boxShadow: "4px 4px 0 #0a0a0a" }}
      >
        🎓
      </div>
      <div
        className="absolute bottom-12 right-10 w-16 h-16 flex items-center justify-center text-2xl rotate-[10deg] hidden md:flex"
        style={{ background: "#18B5D8", border: "3px solid #0a0a0a", borderRadius: "50%", boxShadow: "4px 4px 0 #0a0a0a" }}
      >
        📚
      </div>
      <div
        className="absolute top-16 right-20 hidden md:block"
        style={{
          fontFamily: "'Bangers', cursive",
          fontSize: "2.5rem",
          color: "#E8212A",
          letterSpacing: "0.05em",
          textShadow: "3px 3px 0 #0a0a0a",
          transform: "rotate(10deg)",
        }}
      >
        POW!
      </div>
      <div
        className="absolute bottom-20 left-16 hidden md:block"
        style={{
          fontFamily: "'Bangers', cursive",
          fontSize: "2rem",
          color: "#22C55E",
          letterSpacing: "0.05em",
          textShadow: "3px 3px 0 #0a0a0a",
          transform: "rotate(-8deg)",
        }}
      >
        ZAP!
      </div>

      {/* Login Card */}
      <div
        className="relative z-10 w-full max-w-md animate-comic-pop"
        style={{
          background: "#fffdf5",
          border: "4px solid #0a0a0a",
          borderRadius: "20px",
          boxShadow: "8px 8px 0px #0a0a0a",
        }}
      >
        {/* Card Header */}
        <div
          className="px-8 py-6 text-center"
          style={{ background: "#FFE033", borderBottom: "3.5px solid #0a0a0a", borderRadius: "16px 16px 0 0" }}
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 text-3xl mb-3"
            style={{ background: "#0a0a0a", border: "3px solid #0a0a0a", borderRadius: "50%", boxShadow: "3px 3px 0 #FFE033" }}
          >
            🔑
          </div>
          <h1
            className="text-3xl"
            style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em", color: "#0a0a0a" }}
          >
            MASUK PORTAL
          </h1>
          <p className="text-sm font-bold text-[#0a0a0a] mt-1">Praktikum Basis Data — TIF 2022</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="px-8 py-6 space-y-5">
          {/* NIM Field */}
          <div className="space-y-1">
            <label className="text-sm font-black text-[#0a0a0a] flex items-center gap-2">
              <span>🪪</span> NIM / Username
            </label>
            <input
              type="text"
              value={form.nim}
              onChange={(e) => setForm({ ...form, nim: e.target.value })}
              placeholder="Masukkan NIM kamu..."
              className="w-full px-4 py-3 text-sm font-bold"
              style={{
                border: "2.5px solid #0a0a0a",
                borderRadius: "10px",
                background: "#fffdf5",
                fontFamily: "'Comic Neue', sans-serif",
              }}
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-sm font-black text-[#0a0a0a] flex items-center gap-2">
              <span>🔒</span> Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Masukkan password..."
                className="w-full px-4 py-3 text-sm font-bold pr-12"
                style={{
                  border: "2.5px solid #0a0a0a",
                  borderRadius: "10px",
                  background: "#fffdf5",
                  fontFamily: "'Comic Neue', sans-serif",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Hint */}
          <div
            className="p-3 rounded-lg text-xs font-bold"
            style={{ background: "#f0fdf4", border: "2px solid #22C55E", color: "#166534" }}
          >
            💡 <strong>Default:</strong> Uername = NIM kamu. Password = NIM kamu.
          </div>

          {/* Error */}
          {error && (
            <div
              className="p-3 rounded-lg text-sm font-black text-center animate-comic-shake"
              style={{ background: "#FEF2F2", border: "2.5px solid #E8212A", color: "#E8212A" }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="comic-btn comic-btn-primary w-full text-lg py-3"
            style={{ fontSize: "1.15rem" }}
          >
            {loading ? (
              <span className="animate-comic-bounce inline-block">⏳ Loading...</span>
            ) : (
              "🚀 MASUK SEKARANG"
            )}
          </button>

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("landing")}
            className="w-full text-sm font-bold text-center text-[#0a0a0a] underline"
          >
            ← Kembali ke Beranda
          </button>
        </form>
      </div>
    </div>
  )
}
