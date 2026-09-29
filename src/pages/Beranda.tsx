import React from "react"
import { useNavigate } from "react-router-dom"
import { Home, ChevronRight } from "lucide-react"
import { Window } from "../components/Window"
import { Button } from "../components/Button"

export function Beranda() {
  const navigate = useNavigate()

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-0 pointer-events-none">
      {/* Centered Group Container */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-[1144px] items-stretch">
        {/* 1. HERO WINDOW (720px) */}
        <div className="w-full md:w-[720px] flex flex-col pointer-events-auto shrink-0">
          <Window
            id="beranda-1"
            title="BERANDA — BEM_FILKOM_UNIDA.EXE"
            icon={<Home size={14} />}
            footer={
              <div className="flex w-full justify-between items-center px-1 font-mono text-[10px] text-dark/80 uppercase font-semibold">
                <span>BOGOR, JAWA BARAT</span>
                <Button variant="default" onClick={() => navigate("/tentang")}>
                  OK
                </Button>
              </div>
            }
          >
            <div className="flex flex-col bg-white justify-between">
              <div className="p-6 md:p-10 flex flex-col gap-4">
                <span className="font-mono text-[10px] md:text-xs uppercase text-dark/70 font-semibold tracking-wider">
                  FAKULTAS ILMU KOMPUTER / UNIVERSITAS DJUANDA BOGOR
                </span>

                <h1 className="font-heading text-4xl md:text-5xl lg:text-[52px] font-extrabold text-dark leading-[1.05] line-clamp-2">
                  BEM FILKOM UNIDA
                </h1>

                <p className="font-body text-base md:text-lg text-dark/80 leading-relaxed mt-1 mb-2">
                  Badan Eksekutif Mahasiswa yang menjadi wadah aspirasi dan
                  pengembangan diri mahasiswa Fakultas Ilmu Komputer.
                </p>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mt-4">
                  <Button
                    variant="primary"
                    onClick={() => navigate("/tentang")}
                    className="text-sm px-6 py-2 w-full md:w-auto"
                  >
                    Lihat Profil
                  </Button>
                  <button
                    onClick={() => navigate("/program-kerja")}
                    className="font-mono text-xs uppercase text-selected hover:underline font-bold transition-all shrink-0 w-full md:w-auto py-2 md:py-0 text-center md:text-left"
                  >
                    Lihat Program Kerja
                  </button>
                </div>
              </div>

              {/* Text-only Meta Row */}
              <div className="w-full border-t border-dark grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-dark bg-[#F4F7FB]">
                <div className="p-4 flex flex-col gap-1 hover:bg-[#E8EDF5] transition-colors">
                  <span className="font-mono text-[10px] uppercase text-dark/60 font-bold tracking-wider">
                    Fakultas
                  </span>
                  <span className="font-mono text-xs font-semibold text-dark">
                    Ilmu Komputer
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-1 hover:bg-[#E8EDF5] transition-colors">
                  <span className="font-mono text-[10px] uppercase text-dark/60 font-bold tracking-wider">
                    Universitas
                  </span>
                  <span className="font-mono text-xs font-semibold text-dark">
                    Djuanda Bogor
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-1 hover:bg-[#E8EDF5] transition-colors">
                  <span className="font-mono text-[10px] uppercase text-dark/60 font-bold tracking-wider">
                    Periode
                  </span>
                  <span className="font-mono text-xs font-semibold text-dark">
                    2025 / 2026
                  </span>
                </div>
              </div>
            </div>
          </Window>
        </div>

        {/* 2. RIGHT COLUMN (400px Desktop Only) */}
        <div className="hidden md:flex flex-col gap-6 w-[400px] shrink-0 pointer-events-auto">
          {/* STATISTIK.EXE */}
          <Window id="beranda-2" title="STATISTIK.EXE">
            <div className="flex flex-col bg-white">
              {[
                { label: "Program Kerja", count: 42 },
                { label: "Anggota Aktif", count: 128 },
                { label: "Departemen", count: 5 },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center px-5 py-3 border-b border-dark last:border-0 hover:bg-[#E8EDF5]/30 transition-colors"
                >
                  <span className="font-mono text-xs uppercase font-bold text-dark/70 tracking-wide">
                    {stat.label}
                  </span>
                  <span className="font-heading text-[32px] font-extrabold text-dark leading-none">
                    {stat.count}
                  </span>
                </div>
              ))}
            </div>
          </Window>

          {/* BERITA_TERBARU.TXT */}
          <Window
            id="beranda-3"
            title="BERITA_TERBARU.TXT"
            footer={
              <button
                onClick={() => navigate("/berita")}
                className="font-mono text-[10px] uppercase text-dark hover:text-selected hover:underline font-bold w-full text-center py-1"
              >
                Semua berita
              </button>
            }
          >
            <div className="flex flex-col bg-white justify-start">
              {[
                {
                  date: "12 Nov",
                  title: "Open Recruitment Kepanitiaan Dibuka",
                },
                {
                  date: "05 Nov",
                  title: "Rapat Kerja BEM FILKOM Periode Baru",
                },
                { date: "28 Okt", title: "Kegiatan Bakti Sosial Mahasiswa" },
              ].map((news, i) => (
                <div
                  key={i}
                  onClick={() => navigate("/berita")}
                  className="group flex items-center gap-3 px-4 py-4 border-b border-dark last:border-0 cursor-pointer hover:bg-selected active:bg-selected transition-colors"
                >
                  <span className="font-mono text-[10px] uppercase text-dark/50 group-hover:text-white/70 whitespace-nowrap shrink-0">
                    {news.date}
                  </span>
                  <span className="font-body text-sm font-semibold text-dark group-hover:text-white truncate flex-1">
                    {news.title}
                  </span>
                  <ChevronRight
                    size={14}
                    className="text-dark/30 group-hover:text-white shrink-0"
                  />
                </div>
              ))}
            </div>
          </Window>
        </div>
      </div>
    </div>
  )
}
