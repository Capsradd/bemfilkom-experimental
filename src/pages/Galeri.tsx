import React from "react"
import { ImageIcon } from "lucide-react"
import { Window } from "../components/Window"

const PHOTOS = [
  {
    id: 1,
    rot: "-rotate-2",
    title: "IMG_8932.JPG",
    desc: "Pelantikan Pengurus BEM",
  },
  {
    id: 2,
    rot: "rotate-1",
    title: "IMG_9104.JPG",
    desc: "Rapat Kerja Nasional",
  },
  {
    id: 3,
    rot: "-rotate-1",
    title: "IMG_0234.JPG",
    desc: "LDK Mahasiswa Baru",
  },
  {
    id: 4,
    rot: "rotate-2",
    title: "IMG_1120.JPG",
    desc: "FILKOM Fest Penutupan",
  },
]

export function Galeri() {
  return (
    <div className="w-full h-full flex items-center justify-center pt-8 overflow-y-auto overflow-x-hidden">
      <div className="relative w-full max-w-4xl min-h-[500px] flex flex-col md:flex-row flex-wrap items-center justify-center gap-12 p-8 pointer-events-auto">
        {PHOTOS.map((photo, i) => (
          <div
            key={photo.id}
            className={`w-64 md:w-72 transform ${photo.rot} transition-transform hover:rotate-0 hover:scale-105 active:scale-105 hover:z-50 z-${i * 10}`}
          >
            <Window
              id={`galeri-${photo.id}`}
              title={photo.title}
              icon={<ImageIcon size={14} />}
            >
              <div className="p-2 bg-white">
                {/* Photo Placeholder Navy Duotone */}
                <div className="w-full aspect-4/3 bg-titlebar border border-dark flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-titlebar mix-blend-multiply z-10 opacity-60 group-hover:opacity-30 transition-opacity"></div>
                  {/* Geometric shapes representing photo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/40 blur-sm absolute top-4 left-4"></div>
                    <div className="w-24 h-24 bg-white/30 rotate-45 absolute bottom-4 right-2"></div>
                  </div>
                </div>
                <div className="mt-3 mb-1 px-1 font-mono text-[10px] text-center font-bold">
                  {photo.desc}
                </div>
              </div>
            </Window>
          </div>
        ))}
      </div>
    </div>
  )
}
