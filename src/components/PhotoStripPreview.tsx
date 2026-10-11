
import { useRef } from "react"

export default function PhotoStripPreview({
  photos,
  onClose,
}: {
  photos: string[]
  onClose: () => void
}) {
  const stripRef = useRef<HTMLDivElement>(null)

  const downloadStrip = async () => {
    if (!stripRef.current) return

    try {
      const html2canvas = (await import("html2canvas")).default
      const canvas = await html2canvas(stripRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      })

      const link = document.createElement("a")
      link.download = "mini-fotobooth.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error(error)
      alert("Gagal mengunduh photo strip.")
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-sm"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-20 rounded-full border-2 border-black bg-red-500 px-3 py-2 font-bold text-white"
        >
          ✕
        </button>

        {/* TEMPLATE ASLI */}
        <div ref={stripRef} className="relative w-full">
          <img
            src="/images/photostrip-template.png"
            alt="Template foto strip"
            className="block h-auto w-full"
          />

          {/* Foto ditempatkan di atas template */}
          {photos.slice(0, 3).map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Foto ${index + 1}`}
              className="absolute object-cover"
              style={{
                left: "12%",
                width: "76%",
                top: `${12 + index * 24}%`,
                height: "20%",
              }}
            />
          ))}
        </div>

        <button
          onClick={downloadStrip}
          className="mt-5 w-full rounded-lg border-2 border-black bg-green-500 px-4 py-3 font-black text-white"
        >
          Download Photo Strip
        </button>
      </div>
    </div>
  )
}
