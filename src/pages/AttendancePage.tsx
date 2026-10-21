import { useState } from "react"
import { useNav } from "../context"
import { useDatabase } from "../context/DatabaseContext"
import AppLayout from "../components/AppLayout"

type Step = "select" | "instructions" | "camera" | "review" | "success"

export default function AttendancePage() {
  const { page, navigate } = useNav()
  const { currentUser, pertemuanList, getStudentAbsensiList, setStudentMeetingAttendance } = useDatabase()

  // Determine step from page context
  const stepFromPage: Record<string, Step> = {
    "student-attendance-select": "select",
    "student-attendance-instructions": "instructions",
    "student-attendance-camera": "camera",
    "student-attendance-review": "review",
    "student-attendance-success": "success",
  }
  const [step, setStep] = useState<Step>(stepFromPage[page] ?? "select")
  const [selectedMeeting, setSelectedMeeting] = useState<number | null>(null)
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([])

  const studentRecords = getStudentAbsensiList(currentUser.id)
  const unsubmittedMeetings = studentRecords
    .filter((r) => r.status !== "Hadir")
    .map((r) => r.pertemuan)

  const goTo = (s: Step) => setStep(s)

  if (step === "select") {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <div
            className="p-6 rounded-2xl"
            style={{ background: "#FFE033", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
          >
            <h2 className="text-3xl" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
              📅 PILIH PERTEMUAN
            </h2>
            <p className="font-bold text-sm mt-1">Pilih pertemuan yang ingin kamu absen fotonya</p>
          </div>

          <div className="space-y-3">
            {unsubmittedMeetings.length === 0 && (
              <div
                className="p-6 text-center rounded-xl"
                style={{ border: "3px solid #0a0a0a", background: "#f0fdf4" }}
              >
                <div className="text-4xl mb-2">🎉</div>
                <p className="font-black">Semua absensi sudah selesai!</p>
              </div>
            )}
            {unsubmittedMeetings.map((m) => (
              <button
                key={m.id}
                className="w-full text-left comic-card p-4 flex items-center gap-4"
                onClick={() => {
                  setSelectedMeeting(m.id)
                  goTo("instructions")
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0"
                  style={{ background: "#FFE033", border: "2.5px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                >
                  {m.id}
                </div>
                <div className="flex-1">
                  <p className="font-black text-sm">{m.title}</p>
                  <p className="text-xs text-[#0a0a0a]/60 font-bold">{m.date} · {m.topic}</p>
                </div>
                <span className="text-[#0a0a0a]/40 text-xl">→</span>
              </button>
            ))}
          </div>

          <button
            className="comic-btn comic-btn-white w-full"
            onClick={() => navigate("student-dashboard")}
          >
            ← Kembali ke Dashboard
          </button>
        </div>
      </AppLayout>
    )
  }

  if (step === "instructions") {
    const meeting = meetings.find(m => m.id === selectedMeeting)
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <div
            className="p-6 rounded-2xl"
            style={{ background: "#18B5D8", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
          >
            <h2 className="text-3xl text-white" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
              📸 INSTRUKSI ABSENSI
            </h2>
            <p className="font-bold text-white/80 text-sm mt-1">Pertemuan {meeting?.id}: {meeting?.title}</p>
          </div>

          <div className="space-y-4">
            {[
              { num: "01", title: "Izinkan Akses Kamera", desc: "Saat diminta, izinkan browser untuk mengakses kameramu.", icon: "📷" },
              { num: "02", title: "Ambil Minimal 3 Foto", desc: "Ambil foto dengan 3 pose berbeda: biasa, lucu, dan serius.", icon: "🤳" },
              { num: "03", title: "Pilih Foto Terbaik", desc: "Dari semua foto yang diambil, pilih 3 foto terbaik.", icon: "🖼️" },
              { num: "04", title: "Generate Photo Strip", desc: "Sistem akan membuat photo strip ala photobox dari pilihanmu.", icon: "🎞️" },
            ].map((step) => (
              <div
                key={step.num}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ border: "3px solid #0a0a0a", background: "#fffdf5", boxShadow: "3px 3px 0 #0a0a0a" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-black shrink-0"
                  style={{ background: "#FFE033", border: "2px solid #0a0a0a", fontFamily: "'Bangers', cursive" }}
                >
                  {step.num}
                </div>
                <div>
                  <p className="font-black text-sm flex items-center gap-2">{step.icon} {step.title}</p>
                  <p className="text-xs text-[#0a0a0a]/60 font-bold mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="comic-btn comic-btn-white flex-1" onClick={() => goTo("select")}>← Kembali</button>
            <button className="comic-btn comic-btn-primary flex-[2]" onClick={() => goTo("camera")}>
              🚀 Mulai Absensi Foto!
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (step === "camera") {
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto space-y-6">
          <div
            className="p-4 rounded-2xl"
            style={{ background: "#0a0a0a", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #FFE033" }}
          >
            <h2 className="text-3xl text-[#FFE033]" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
              📸 SESI FOTO KAMU
            </h2>
            <p className="font-bold text-white/70 text-sm">Ambil foto sebanyak yang kamu mau, lalu pilih 3 terbaik!</p>
          </div>

          <CameraCapture
            capturedPhotos={capturedPhotos}
            onCapture={(photo) => setCapturedPhotos(prev => [...prev, photo])}
            onDelete={(i) => setCapturedPhotos(prev => prev.filter((_, idx) => idx !== i))}
            onNext={() => goTo("review")}
            onBack={() => goTo("instructions")}
          />
        </div>
      </AppLayout>
    )
  }

  if (step === "review") {
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto space-y-6">
          <div
            className="p-4 rounded-2xl"
            style={{ background: "#22C55E", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
          >
            <h2 className="text-3xl text-white" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
              🖼️ REVIEW FOTO
            </h2>
            <p className="font-bold text-white/80 text-sm">Pilih tepat 3 foto untuk photo strip kamu!</p>
          </div>

          <PhotoReview
            photos={capturedPhotos}
            onBack={() => goTo("camera")}
            onSubmit={() => {
              if (selectedMeeting) {
                setStudentMeetingAttendance(currentUser.id, selectedMeeting, "Hadir")
              }
              goTo("success")
            }}
            meetingId={selectedMeeting}
          />
        </div>
      </AppLayout>
    )
  }

  // Success
  return (
    <AppLayout>
      <div className="max-w-xl mx-auto text-center space-y-6 py-10">
        <div className="text-8xl animate-comic-bounce inline-block">🎉</div>
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#FFE033", border: "4px solid #0a0a0a", boxShadow: "6px 6px 0 #0a0a0a" }}
        >
          <h2 className="text-4xl" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}>
            ABSENSI BERHASIL!
          </h2>
          <p className="font-bold mt-2 text-[#0a0a0a]/70">
            Photo strip kamu sudah dikirim ke asisten praktikum untuk diverifikasi.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            className="comic-btn comic-btn-primary"
            onClick={() => navigate("student-attendance-history")}
          >
            📋 Lihat Riwayat
          </button>
          <button
            className="comic-btn comic-btn-white"
            onClick={() => navigate("student-dashboard")}
          >
            🏠 Ke Dashboard
          </button>
        </div>
      </div>
    </AppLayout>
  )
}

// Camera capture sub-component
function CameraCapture({
  capturedPhotos,
  onCapture,
  onDelete,
  onNext,
  onBack,
}: {
  capturedPhotos: string[]
  onCapture: (url: string) => void
  onDelete: (i: number) => void
  onNext: () => void
  onBack: () => void
}) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)
  const [cameraOn, setCameraOn] = useState(false)
  const [flash, setFlash] = useState(false)

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
      setStream(s)
      setCameraOn(true)
      if (videoRef) {
        videoRef.srcObject = s
        videoRef.play()
      }
    } catch {
      alert("Gagal mengakses kamera. Pastikan izin kamera diberikan.")
    }
  }

  const stopCamera = () => {
    stream?.getTracks().forEach(t => t.stop())
    setStream(null)
    setCameraOn(false)
  }

  const takePhoto = () => {
    if (!videoRef) return
    const canvas = document.createElement("canvas")
    canvas.width = videoRef.videoWidth || 640
    canvas.height = videoRef.videoHeight || 480
    const ctx = canvas.getContext("2d")
    ctx?.drawImage(videoRef, 0, 0)
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9)
    onCapture(dataUrl)
    setFlash(true)
    setTimeout(() => setFlash(false), 300)
  }

  return (
    <div className="space-y-4">
      {/* Camera viewfinder */}
      <div
        className="relative rounded-2xl overflow-hidden aspect-video"
        style={{ border: "4px solid #0a0a0a", boxShadow: "5px 5px 0 #0a0a0a", background: "#1a1a1a" }}
      >
        {flash && <div className="absolute inset-0 bg-white z-20 opacity-80 pointer-events-none" />}
        {!cameraOn && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
            <span className="text-5xl">📷</span>
            <p className="font-black">Kamera belum aktif</p>
          </div>
        )}
        <video
          ref={(el) => {
            setVideoRef(el)
            if (el && stream) { el.srcObject = stream; el.play() }
          }}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          style={{ display: cameraOn ? "block" : "none", transform: "scaleX(-1)" }}
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-10">
          {!cameraOn ? (
            <button className="comic-btn comic-btn-primary" onClick={startCamera}>
              📷 Aktifkan Kamera
            </button>
          ) : (
            <>
              <button
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black"
                style={{ background: "#FFE033", border: "4px solid #0a0a0a", boxShadow: "3px 3px 0 #0a0a0a" }}
                onClick={takePhoto}
              >
                📸
              </button>
              <button className="comic-btn comic-btn-danger text-sm" onClick={stopCamera}>
                ⏹ Stop
              </button>
            </>
          )}
        </div>
      </div>

      {/* Photo gallery */}
      {capturedPhotos.length > 0 && (
        <div>
          <p className="font-black text-sm mb-3">📸 {capturedPhotos.length} Foto Diambil:</p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {capturedPhotos.map((p, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden" style={{ border: "2.5px solid #0a0a0a" }}>
                <img src={p} alt="" className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
                <button
                  className="absolute top-1 right-1 w-5 h-5 text-xs font-black rounded flex items-center justify-center"
                  style={{ background: "#E8212A", color: "#fff", border: "1.5px solid #0a0a0a" }}
                  onClick={() => onDelete(i)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button className="comic-btn comic-btn-white flex-1" onClick={onBack}>← Kembali</button>
        <button
          className="comic-btn comic-btn-primary flex-[2]"
          disabled={capturedPhotos.length < 3}
          onClick={() => { stopCamera(); onNext() }}
          style={{ opacity: capturedPhotos.length < 3 ? 0.5 : 1 }}
        >
          {capturedPhotos.length < 3
            ? `📸 Ambil ${3 - capturedPhotos.length} foto lagi`
            : "✅ Pilih Foto untuk Strip →"}
        </button>
      </div>
    </div>
  )
}

// Photo review / selection sub-component
function PhotoReview({
  photos,
  onBack,
  onSubmit,
  meetingId,
}: {
  photos: string[]
  onBack: () => void
  onSubmit: () => void
  meetingId: number | null
}) {
  const [selected, setSelected] = useState<number[]>([])
  const [theme, setTheme] = useState<string>("#FFE033")
  const [submitted, setSubmitted] = useState(false)

  const toggleSelect = (i: number) => {
    setSelected(prev => {
      if (prev.includes(i)) return prev.filter(x => x !== i)
      if (prev.length >= 3) return prev
      return [...prev, i]
    })
  }

  const themes = [
    { color: "#FFE033", name: "Kuning Komik" },
    { color: "#E8212A", name: "Merah Api" },
    { color: "#18B5D8", name: "Biru Langit" },
    { color: "#22C55E", name: "Hijau Segar" },
    { color: "#7C3AED", name: "Ungu Galaksi" },
    { color: "#0a0a0a", name: "Hitam Klasik" },
  ]

  const handleSubmit = () => {
    if (selected.length !== 3) {
      alert("Pilih tepat 3 foto terlebih dahulu!")
      return
    }
    setSubmitted(true)
    setTimeout(() => onSubmit(), 500)
  }

  return (
    <div className="space-y-5">
      {/* Photo grid */}
      <p className="font-black text-sm">Pilih tepat 3 foto ({selected.length}/3 dipilih):</p>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {photos.map((p, i) => {
          const sel = selected.indexOf(i)
          const isSelected = sel !== -1
          return (
            <button
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden"
              style={{
                border: isSelected ? "4px solid #22C55E" : "3px solid #0a0a0a",
                boxShadow: isSelected ? "3px 3px 0 #22C55E" : "3px 3px 0 #0a0a0a",
                transform: isSelected ? "scale(0.96)" : "scale(1)",
                transition: "all 0.1s",
              }}
              onClick={() => toggleSelect(i)}
            >
              <img src={p} alt="" className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
              {isSelected && (
                <div
                  className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center font-black text-sm"
                  style={{ background: "#22C55E", color: "#fff", border: "2px solid #0a0a0a" }}
                >
                  {sel + 1}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Theme selector */}
      {selected.length === 3 && (
        <div>
          <p className="font-black text-sm mb-3">🎨 Pilih tema warna photo strip:</p>
          <div className="flex gap-3 flex-wrap">
            {themes.map((t) => (
              <button
                key={t.color}
                className="w-10 h-10 rounded-xl"
                style={{
                  background: t.color,
                  border: theme === t.color ? "4px solid #0a0a0a" : "3px solid #0a0a0a",
                  boxShadow: theme === t.color ? "3px 3px 0 #0a0a0a" : "2px 2px 0 #0a0a0a",
                  transform: theme === t.color ? "scale(1.15)" : "scale(1)",
                }}
                onClick={() => setTheme(t.color)}
                title={t.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Photo strip preview */}
      {selected.length === 3 && (
        <div>
          <p className="font-black text-sm mb-3">🎞️ Preview Photo Strip:</p>
          <div
            className="inline-flex flex-col gap-2 p-4 rounded-xl mx-auto"
            style={{ background: theme, border: "4px solid #0a0a0a", boxShadow: "5px 5px 0 #0a0a0a" }}
          >
            {selected.map((idx, pos) => (
              <div key={pos} className="w-48 h-36 rounded-lg overflow-hidden" style={{ border: "3px solid #0a0a0a" }}>
                <img src={photos[idx]} alt="" className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
              </div>
            ))}
            <div className="text-center pt-1">
              <p
                className="text-xs font-black"
                style={{
                  fontFamily: "'Bangers', cursive",
                  letterSpacing: "0.05em",
                  color: theme === "#FFE033" || theme === "#22C55E" ? "#0a0a0a" : "#fff",
                }}
              >
                PRAKTIKUM BASDAT ✨ {new Date().toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button className="comic-btn comic-btn-white flex-1" onClick={onBack}>← Foto Ulang</button>
        <button
          className="comic-btn comic-btn-primary flex-[2]"
          disabled={selected.length !== 3 || submitted}
          style={{ opacity: selected.length !== 3 ? 0.5 : 1 }}
          onClick={handleSubmit}
        >
          {submitted ? "⏳ Mengirim..." : "📤 Kirim Absensi!"}
        </button>
      </div>
    </div>
  )
}
