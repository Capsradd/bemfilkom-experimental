import React, { useContext } from "react"
import { Info } from "lucide-react"
import { Window } from "../components/Window"
import { Button } from "../components/Button"
import { DesktopContext } from "../contexts/DesktopContext"

const MISI_ITEMS = [
  {
    title: "Memperkuat internalisasi dan solidaritas BEM",
    desc: "Membangun organisasi yang solid, profesional, dan suportif melalui komunikasi, koordinasi, dan evaluasi yang berkelanjutan.",
  },
  {
    title: "Mendorong pengembangan potensi mahasiswa",
    desc: "Menciptakan ruang yang mendukung mahasiswa untuk berkembang sesuai potensi, minat, dan kebutuhannya.",
  },
  {
    title: "Mendorong sikap progresif dan adaptif",
    desc: "Membangun lingkungan yang mendorong mahasiswa untuk terus berkembang, berinovasi, dan mampu beradaptasi dengan perubahan.",
  },
  {
    title: "Memperluas kolaborasi dan kontribusi",
    desc: "Membangun hubungan dan kolaborasi positif dengan berbagai pihak untuk menciptakan manfaat dan dampak yang berkelanjutan.",
  },
  {
    title: "Menjunjung nilai keilmuan dan 21 Karakter Bertauhid",
    desc: "Menjadikan nilai-nilai keilmuan dan 21 Karakter Bertauhid sebagai landasan dalam menjalankan kehidupan organisasi dan setiap bentuk kontribusi.",
  },
]

export function Tentang() {
  const context = useContext(DesktopContext)

  return (
    <div className="w-full h-full overflow-y-auto">
      {/* Centered container: max 1200px, 48px top padding, 80px bottom padding */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-0 pt-[48px] pb-[80px] md:pb-0 pointer-events-auto">
        {/* 12-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Visi Window (Cols 1-5, sticky) */}
          <div className="md:col-span-5 md:sticky md:top-[48px]">
            <Window
              id="tentang-visi"
              title="C:\BEM\VISI_BEM.TXT"
              icon={<Info size={14} />}
              footer={
                <Button onClick={() => context?.closeWindow("tentang-visi")}>
                  OK
                </Button>
              }
            >
              <div className="p-6 bg-white min-h-[150px]">
                <p className="font-body text-[22px] leading-[1.5] text-dark">
                  Menjadikan BEM Fakultas Ilmu Komputer yang solid dalam
                  mendorong perkembangan mahasiswa yang progresif, adaptif, dan
                  kolaboratif di tengah perkembangan teknologi, serta memberikan
                  kontribusi nyata berlandaskan nilai-nilai keilmuan dan 21
                  Karakter Bertauhid.
                </p>
              </div>
            </Window>
          </div>

          {/* Misi Window (Cols 6-12) */}
          <div className="md:col-span-7">
            <Window
              id="tentang-misi"
              title="C:\BEM\MISI_BEM.TXT"
              icon={<Info size={14} />}
              footer={
                <Button
                  variant="primary"
                  onClick={() => context?.closeWindow("tentang-misi")}
                >
                  OK
                </Button>
              }
            >
              <div className="px-6 py-2 bg-white">
                {MISI_ITEMS.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 py-6 border-b border-[#C5CFE0] last:border-b-0"
                  >
                    {/* Number Column */}
                    <div className="font-mono text-selected font-bold text-lg w-8 shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    {/* Content Column */}
                    <div className="flex flex-col">
                      <strong className="font-heading text-lg mb-1 text-dark">
                        {item.title}
                      </strong>
                      <p className="font-body text-sm text-dark/80">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Window>
          </div>
        </div>
      </div>
    </div>
  )
}
