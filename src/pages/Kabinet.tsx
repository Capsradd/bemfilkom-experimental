import React from "react"
import { Users } from "lucide-react"
import { Window } from "../components/Window"
import { IdCard } from "../components/IdCard"

const PENGURUS = [
  {
    id: 1,
    name: "Ahmad Fauzan",
    jabatan: "Gubernur Mahasiswa",
    departemen: "BPH",
  },
  { id: 2, name: "Siti Sarah", jabatan: "Wakil Gubernur", departemen: "BPH" },
  {
    id: 3,
    name: "Budi Santoso",
    jabatan: "Kepala Departemen",
    departemen: "PSDM",
  },
  { id: 4, name: "Rina Wati", jabatan: "Sekretaris Umum", departemen: "BPH" },
  { id: 5, name: "Dewi Lestari", jabatan: "Bendahara Umum", departemen: "BPH" },
  {
    id: 6,
    name: "Andi Rahman",
    jabatan: "Kepala Departemen",
    departemen: "KOMINFO",
  },
  {
    id: 7,
    name: "Fikri Haikal",
    jabatan: "Kepala Departemen",
    departemen: "Pendidikan",
  },
  {
    id: 8,
    name: "Nita Talia",
    jabatan: "Kepala Departemen",
    departemen: "SOSMAS",
  },
]

export function Kabinet() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Window
        id="kabinet-1"
        title="KABINET_BEM.EXE"
        icon={<Users size={14} />}
        className="w-[90%] md:w-1/2 pointer-events-auto"
      >
        <div className="p-6 bg-window-body overflow-y-auto">
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-bold border-b border-dark/20 pb-2 inline-block">
              Daftar Pengurus
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PENGURUS.map((p) => (
              <IdCard
                key={p.id}
                name={p.name}
                jabatan={p.jabatan}
                departemen={p.departemen}
              />
            ))}
          </div>
        </div>
      </Window>
    </div>
  )
}
