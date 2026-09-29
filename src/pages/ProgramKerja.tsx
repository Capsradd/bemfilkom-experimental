import React from "react"
import { Briefcase } from "lucide-react"
import { Window } from "../components/Window"
import { Tag } from "../components/Tag"

const PROKER = [
  {
    id: 1,
    nama: "FILKOM Festival 2025",
    tanggal: "12 Nov 2025",
    status: "Selesai" as const,
  },
  {
    id: 2,
    nama: "Latihan Dasar Kepemimpinan",
    tanggal: "05 Des 2025",
    status: "Berjalan" as const,
  },
  {
    id: 3,
    nama: "Seminar Teknologi Nasional",
    tanggal: "10 Jan 2026",
    status: "Rencana" as const,
  },
  {
    id: 4,
    nama: "Bakti Sosial Mahasiswa",
    tanggal: "22 Feb 2026",
    status: "Rencana" as const,
  },
  {
    id: 5,
    nama: "Pekan Olahraga FILKOM",
    tanggal: "15 Okt 2025",
    status: "Selesai" as const,
  },
]

export function ProgramKerja() {
  return (
    <div className="w-full h-full flex items-center justify-center px-4 pb-[8vh] pointer-events-none">
      <Window
        id="programkerja-1"
        title="PROGRAM_KERJA.XLS"
        icon={<Briefcase size={14} />}
        className="w-full max-w-4xl pointer-events-auto"
      >
        <div className="flex flex-col bg-white">
          <div className="hidden md:flex px-4 py-2 border-b border-dark bg-[#E8EDF5] text-xs font-mono font-bold uppercase shadow-[0_1px_0_0_var(--color-dark)] relative z-10">
            <div className="flex-1 cursor-pointer hover:bg-dark/5 px-1">
              Nama Program ▾
            </div>
            <div className="w-40 cursor-pointer hover:bg-dark/5 px-1">
              Tanggal ▾
            </div>
            <div className="w-32 cursor-pointer hover:bg-dark/5 px-1">
              Status ▾
            </div>
          </div>

          <div className="overflow-auto bg-white">
            {PROKER.map((pk) => (
              <div
                key={pk.id}
                className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 px-4 py-3 border-b border-dark/10 active:bg-selected active:text-white hover:bg-[#E8EDF5]/50 transition-colors font-body text-sm"
              >
                <div className="flex-1 font-semibold text-dark">{pk.nama}</div>
                <div className="flex items-center gap-4 md:gap-0">
                  <div className="w-28 md:w-40 text-dark/70 font-mono text-xs">
                    {pk.tanggal}
                  </div>
                  <div className="w-20 md:w-32">
                    <Tag status={pk.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Window>
    </div>
  )
}
