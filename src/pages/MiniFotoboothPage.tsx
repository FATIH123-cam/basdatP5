import { useState } from "react"
import PhotoBoothLiveCamera from "../components/photobooth/PhotoBoothLiveCamera"
import AppLayout from "../components/AppLayout"
import PhotoStripPreview from "../components/PhotoStripPreview"

export default function MiniFotoboothPage() {
  const [photos, setPhotos] = useState<string[]>([])
  const [showStrip, setShowStrip] = useState(false)
  
  const handlePhotoCaptured = (dataUrl: string) => {
    setPhotos(prev => [...prev, dataUrl])
  }

  const handleDeletePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <AppLayout>
      <div className="space-y-6">
      <div className="bg-[#FFE033] p-6 rounded-3xl border-[4px] border-[#0a0a0a] shadow-[8px_8px_0_#0a0a0a]">
        <h2 className="text-3xl font-black uppercase" style={{ fontFamily: "'Bangers', cursive" }}>📸 Mini Fotobooth</h2>
        <p className="font-bold text-slate-800">Yuk foto-foto seru! Kamu bebas ambil foto sebanyak-banyaknya di sini.</p>
      </div>

      <PhotoBoothLiveCamera 
        onPhotoCaptured={handlePhotoCaptured} 
        totalCapturedCount={photos.length} 
      />

      {photos.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border-[4px] border-[#0a0a0a] shadow-[8px_8px_0_#0a0a0a]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-black uppercase" style={{ fontFamily: "'Bangers', cursive" }}>Gallery Foto</h3>
            {photos.length >= 3 && (
              <button 
                onClick={() => setShowStrip(true)}
                className="comic-btn bg-[#22C55E] text-white border-2 border-black font-bold px-4 py-2 rounded-xl shadow-[3px_3px_0_#0a0a0a] hover:translate-y-1 hover:shadow-none transition-all"
              >
                🎞️ Lihat Photo Strip
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo, idx) => (
              <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border-4 border-black">
                <img src={photo} alt={`Photo ${idx}`} className="w-full h-full object-cover" />
                <button 
                  onClick={() => handleDeletePhoto(idx)}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500 text-white border-2 border-black rounded-lg hover:bg-red-600 font-bold"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showStrip && (
        <PhotoStripPreview photos={photos.slice(Math.max(photos.length - 3, 0))} onClose={() => setShowStrip(false)} />
      )}
    </div>
    </AppLayout>
  )
}
