import { useState, useRef, useEffect, useCallback } from "react"

interface Props {
  onPhotoCaptured: (dataUrl: string) => void
  totalCapturedCount: number
}

export default function PhotoBoothLiveCamera({
  onPhotoCaptured,
  totalCapturedCount,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [cameraState, setCameraState] = useState<
    "loading" | "ready" | "denied" | "error"
  >("loading")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [countdownEnabled, setCountdownEnabled] = useState<boolean>(true)
  const [countdownNumber, setCountdownNumber] = useState<number | null>(null)
  const [isFlashing, setIsFlashing] = useState<boolean>(false)
  const countdownTimerRef = useRef<any>(null)

  // Start webcam
  const startCamera = useCallback(async () => {
    setCameraState("loading")
    setErrorMessage("")

    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          "Browser ini tidak mendukung akses webcam secara langsung.",
        )
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      setStream(mediaStream)
      setCameraState("ready")

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play().catch((e) => console.warn("Video play error:", e))
      }
    } catch (err: any) {
      console.error("Camera access error:", err)
      setCameraState("denied")
      setErrorMessage(
        err.name === "NotAllowedError" || err.name === "PermissionDeniedError"
          ? "Izin akses kamera ditolak oleh browser."
          : err.message || "Gagal membuka kamera laptop/PC.",
      )
    }
  }, [])

  useEffect(() => {
    startCamera()
    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (videoRef.current && stream && cameraState === "ready") {
      videoRef.current.srcObject = stream
      videoRef.current.play().catch(() => {})
    }
  }, [stream, cameraState])

  // Instant capture helper
  const triggerCapture = () => {
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), 200)

    const video = videoRef.current
    if (!video) return

    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Mirror horizontally so it feels natural like a selfie/mirror
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92)
    onPhotoCaptured(dataUrl)
  }

  // Handle capture click with optional countdown
  const handleCaptureClick = () => {
    if (countdownNumber !== null) return

    if (!countdownEnabled) {
      triggerCapture()
      return
    }

    let count = 3
    setCountdownNumber(count)

    countdownTimerRef.current = setInterval(() => {
      count -= 1
      if (count <= 0) {
        clearInterval(countdownTimerRef.current)
        setCountdownNumber(null)
        triggerCapture()
      } else {
        setCountdownNumber(count)
      }
    }, 1000)
  }

  // Fallback simulator for demo if camera isn't available
  const handleSimulatePhoto = (emoji = "📸") => {
    const canvas = document.createElement("canvas")
    canvas.width = 640
    canvas.height = 480
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const colors = ["#1E1B4B", "#0F172A", "#312E81", "#1E293B", "#3730A3"]
    const bg = colors[totalCapturedCount % colors.length]

    ctx.fillStyle = bg
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#FFE033"
    ctx.font = "900 120px 'Inter', sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(emoji, canvas.width / 2, canvas.height / 2 - 20)

    ctx.fillStyle = "#FFFFFF"
    ctx.font = "700 24px 'Comic Neue', sans-serif"
    ctx.fillText(
      `Foto #${totalCapturedCount + 1} · Praktikum Basdat`,
      canvas.width / 2,
      canvas.height / 2 + 80,
    )

    onPhotoCaptured(canvas.toDataURL("image/jpeg", 0.9))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        if (ev.target?.result) {
          onPhotoCaptured(ev.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ""
  }

  return (
    <div
      className="p-5 rounded-3xl relative overflow-hidden"
      style={{
        background: "#fffdf5",
        border: "4px solid #0a0a0a",
        boxShadow: "8px 8px 0 #0a0a0a",
      }}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b-2 border-black/15">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📸</span>
          <span
            className="text-xl font-black uppercase text-[#0a0a0a]"
            style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
          >
            LIVE WEBCAM PHOTO BOOTH
          </span>
        </div>

        {/* Countdown switch toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCountdownEnabled(!countdownEnabled)}
            className="comic-btn text-xs py-1.5 px-3"
            style={{
              background: countdownEnabled ? "#FFE033" : "#f1f5f9",
              color: "#0a0a0a",
              border: "2px solid #0a0a0a",
              boxShadow: "2px 2px 0 #0a0a0a",
            }}
          >
            ⏱️ Countdown: {countdownEnabled ? "ON (3s)" : "OFF (Langsung)"}
          </button>

          <label className="comic-btn text-xs py-1.5 px-3 cursor-pointer bg-white">
            📁 Upload Foto
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div
        className="relative w-full aspect-video max-h-[440px] rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center"
        style={{
          border: "3.5px solid #0a0a0a",
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.6)",
        }}
      >
        {/* Flash Effect overlay */}
        {isFlashing && (
          <div className="absolute inset-0 bg-white z-40 pointer-events-none transition-opacity duration-150" />
        )}

        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transform -scale-x-100 ${
            cameraState === "ready" ? "block" : "hidden"
          }`}
        />

        {/* Loading state */}
        {cameraState === "loading" && (
          <div className="text-center p-6 text-white space-y-3">
            <div className="w-12 h-12 border-4 border-[#FFE033] border-t-transparent rounded-full animate-spin mx-auto" />
            <p
              className="text-lg font-black"
              style={{ fontFamily: "'Bangers', cursive" }}
            >
              MENGHUBUNGKAN KE KAMERA...
            </p>
            <p className="text-xs text-slate-400">
              Izinkan browser mengakses webcam Anda.
            </p>
          </div>
        )}

        {/* Error / Denied state */}
        {(cameraState === "denied" || cameraState === "error") && (
          <div className="text-center p-6 text-white max-w-md space-y-3">
            <div className="text-4xl">📷❌</div>
            <h4
              className="text-xl font-black text-red-400"
              style={{ fontFamily: "'Bangers', cursive" }}
            >
              KAMERA TIDAK DAPAT DIAKSES
            </h4>
            <p className="text-xs text-slate-300">{errorMessage}</p>
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              <button
                type="button"
                onClick={startCamera}
                className="comic-btn comic-btn-primary text-xs py-2 px-4"
              >
                🔄 Coba Lagi
              </button>
              <button
                type="button"
                onClick={() => handleSimulatePhoto("🤪")}
                className="comic-btn text-xs py-2 px-4 bg-white text-black"
              >
                ✨ Simulasi Foto
              </button>
            </div>
          </div>
        )}

        {/* Live Countdown big number banner */}
        {countdownNumber !== null && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-30">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-7xl font-black animate-comic-pop"
              style={{
                background: "#FFE033",
                color: "#0a0a0a",
                border: "5px solid #0a0a0a",
                boxShadow: "6px 6px 0 #0a0a0a",
                fontFamily: "'Bangers', cursive",
              }}
            >
              {countdownNumber}
            </div>
          </div>
        )}

        {/* Top-right corner live recording indicator */}
        {cameraState === "ready" && (
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black flex items-center gap-2 z-20"
            style={{
              background: "rgba(0,0,0,0.75)",
              color: "#FFE033",
              border: "2px solid #FFE033",
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            LIVE CAM
          </div>
        )}
      </div>

      {/* Action bar under camera */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="px-4 py-2 rounded-xl text-sm font-black"
            style={{
              background: "#FFE033",
              border: "2.5px solid #0a0a0a",
              boxShadow: "3px 3px 0 #0a0a0a",
              fontFamily: "'Bangers', cursive",
              letterSpacing: "0.05em",
            }}
          >
            📸 FOTO TERSIMPAN: {totalCapturedCount}
          </div>

          <span className="text-xs font-bold text-slate-600 hidden md:inline">
            (Bebas ambil foto sebanyak yang kamu mau!)
          </span>
        </div>

        {/* Big Capture button */}
        <button
          type="button"
          onClick={handleCaptureClick}
          disabled={countdownNumber !== null}
          className="w-full sm:w-auto comic-btn comic-btn-danger text-lg sm:text-xl py-3 px-8 shadow-lg active:scale-95"
          style={{
            fontSize: "1.25rem",
            border: "3.5px solid #0a0a0a",
            boxShadow: "5px 5px 0 #0a0a0a",
          }}
        >
          {countdownNumber !== null ? (
            <span>MENGAMBIL FOTO ({countdownNumber})...</span>
          ) : (
            <span>📸 AMBIL FOTO SEKARANG!</span>
          )}
        </button>
      </div>
    </div>
  )
}
