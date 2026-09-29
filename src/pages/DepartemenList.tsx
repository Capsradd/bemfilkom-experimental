import React from "react"
import { useNavigate } from "react-router-dom"
import { Folder } from "lucide-react"
import { Window } from "../components/Window"
import { ExplorerRow } from "../components/ExplorerRow"

const DEPARTEMEN = [
  {
    slug: "psdm",
    name: "PSDM",
    description: "Pengembangan Sumber Daya Mahasiswa",
    count: 8,
  },
  {
    slug: "kominfo",
    name: "KOMINFO",
    description: "Komunikasi dan Informasi",
    count: 6,
  },
  {
    slug: "pendidikan",
    name: "Pendidikan",
    description: "Pengembangan Akademik dan Keilmuan",
    count: 7,
  },
  {
    slug: "sosmas",
    name: "SOSMAS",
    description: "Sosial Masyarakat dan Lingkungan",
    count: 5,
  },
]

export function DepartemenList() {
  const navigate = useNavigate()

  return (
    <div className="w-full h-full flex items-center justify-center px-4 pb-[8vh] pointer-events-none">
      <Window
        id="departemenlist-1"
        title="BEM FILKOM Explorer"
        icon={<Folder size={14} />}
        className="w-full max-w-4xl pointer-events-auto"
      >
        <div className="flex flex-col bg-white">
          {/* Toolbar */}
          <div className="p-2 border-b border-dark bg-[#E8EDF5] flex items-center gap-2 text-sm font-mono">
            <span className="font-bold">Address:</span>
            <div className="bg-white border border-dark px-2 py-1 flex-1 shadow-[inset_1px_1px_0_rgba(0,0,0,0.1)]">
              C:\BEM\Departemen
            </div>
          </div>

          {/* Headers */}
          <div className="hidden md:flex px-2 py-1 border-b border-dark/20 bg-[#E8EDF5] text-xs font-mono font-bold uppercase">
            <div className="w-1/4">Nama</div>
            <div className="flex-1 px-4">Deskripsi</div>
            <div className="w-32 text-right">Jumlah</div>
          </div>

          {/* List */}
          <div className="overflow-auto bg-white">
            {DEPARTEMEN.map((dep) => (
              <ExplorerRow
                key={dep.slug}
                name={dep.name}
                description={dep.description}
                count={dep.count}
                onClick={() => navigate(`/departemen/${dep.slug}`)}
              />
            ))}
          </div>
        </div>
      </Window>
    </div>
  )
}
