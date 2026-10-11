
import { useEffect, useState } from "react";

const photos = [
  { src: "/images/asprak/1.png", name: "@alfatrazs" },
  { src: "/images/asprak/2.png", name: "@nanananadiine" },
];

const VISIBLE_CARDS = 5;
const CENTER = Math.floor(VISIBLE_CARDS / 2);
const GAP = 16;

export default function AsprakCarousel() {
  const [active, setActive] = useState(0);
  const [preview, setPreview] =
    useState<(typeof photos)[number] | null>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => current + 1);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: number) => {
    setActive((current) => current + direction);
  };

  const getPhoto = (index: number) =>
    photos[((index % photos.length) + photos.length) % photos.length];

  // Dua kartu cadangan membantu track bergerak tanpa langsung
  // mengganti susunan visual lima kartu yang terlihat.
  const cards = Array.from({ length: VISIBLE_CARDS + 2 }, (_, index) => ({
    key: index,
    photo: getPhoto(active + index - CENTER - 1),
    featured: index === CENTER + 1,
  }));

  return (
    <section className="w-full overflow-hidden py-12">
      <div className="mb-8 px-4 text-center">
        <span className="inline-block -rotate-2 border-2 border-black bg-[#FFE033] px-4 py-1 font-bold uppercase shadow-[3px_3px_0_#000]">
          Meet the Asprak
        </span>

        <h2 className="mt-4 text-3xl font-black uppercase text-black sm:text-4xl">
          Your Learning Buddies!
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Kenalan dengan asisten praktikum kamu.
        </p>
      </div>

      <div
        className="w-full touch-pan-y select-none"
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest("button")) return;

          setDragStart(event.clientX);
          setDragOffset(0);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (dragStart !== null) {
            setDragOffset(event.clientX - dragStart);
          }
        }}
        onPointerUp={() => {
          if (dragStart === null) return;

          if (Math.abs(dragOffset) > 40) {
            move(dragOffset < 0 ? 1 : -1);
          }

          setDragStart(null);
          setDragOffset(0);
        }}
        onPointerCancel={() => {
          setDragStart(null);
          setDragOffset(0);
        }}
      >
        <div className="w-full overflow-hidden px-1 py-4">
          <div
            className="flex items-center gap-2 sm:gap-3 lg:gap-4"
            style={{
              transform: `translateX(calc(-${100 / 7}% - 0.25rem + ${dragOffset}px))`,
              transition:
                dragStart !== null
                  ? "none"
                  : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {cards.map(({ key, photo, featured }) => (
              <button
                key={key}
                type="button"
                onClick={() => setPreview(photo)}
                aria-label={`Lihat ${photo.name}`}
                className={`relative shrink-0 overflow-hidden border-4 border-black bg-white shadow-[4px_4px_0_#000] transition-transform duration-700 ${
                  featured ? "z-10 scale-105" : "scale-90 opacity-70"
                }`}
                style={{ width: "14.2857%" }}
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-[#fffdf5]">
                  <img
                    src={photo.src}
                    alt={photo.name}
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="border-t-4 border-black bg-[#FFE033] px-1 py-2 text-center">
                  <p className="truncate text-[10px] font-black normal-case sm:text-xs">
                    {photo.name}
                  </p>
                </div>

                {featured && (
                  <span className="absolute left-1 top-1 -rotate-6 border-2 border-black bg-[#ff6b6b] px-1 py-1 text-[9px] font-black uppercase text-white sm:left-2">
                    Featured!
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Foto sebelumnya"
            className="relative z-20 border-2 border-black bg-white px-6 py-3 font-black shadow-[3px_3px_0_#000] transition-all hover:-translate-y-0.5"
          >
            ←
          </button>

          <span className="text-xs font-bold text-gray-600 sm:text-sm">
            Geser untuk menjelajah
          </span>

          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Foto berikutnya"
            className="relative z-20 border-2 border-black bg-[#FFE033] px-6 py-3 font-black shadow-[3px_3px_0_#000] transition-all hover:-translate-y-0.5"
          >
            →
          </button>
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreview(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={preview.name}
            className="relative w-full max-w-lg border-4 border-black bg-[#fffdf5] p-3 shadow-[8px_8px_0_#FFE033]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreview(null)}
              aria-label="Tutup preview"
              className="absolute right-2 top-2 z-10 border-2 border-black bg-[#FFE033] px-3 py-1 font-black"
            >
              ✕
            </button>

            <img
              src={preview.src}
              alt={preview.name}
              className="max-h-[70vh] w-full object-contain"
            />

            <h3 className="mt-3 text-center text-xl font-black uppercase">
              {preview.name}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
}
