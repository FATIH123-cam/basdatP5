import React from "react"

export default function PhotoStripPreview({ photos, onClose }: { photos: string[], onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="relative bg-white p-4 pb-8 rounded-xl shadow-2xl max-h-full overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white font-bold flex items-center justify-center hover:bg-red-600 transition-colors z-10"
        >
          ✕
        </button>
        <div className="space-y-4 pt-8" id="photo-strip">
          {photos.map((src, i) => (
            <div key={i} className="border-4 border-black overflow-hidden bg-black aspect-video relative" style={{ width: "240px" }}>
              <img src={src} className="w-full h-full object-cover" alt={`Pose ${i+1}`} />
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <h3 className="font-black text-2xl uppercase tracking-widest" style={{ fontFamily: "'Bangers', cursive" }}>Praktikum Basdat</h3>
          <p className="text-xs font-bold text-gray-500 mt-1">Sistem Mini Fotobooth 📸</p>
        </div>
      </div>
    </div>
  )
}
