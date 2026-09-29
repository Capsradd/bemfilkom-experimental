import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Folder } from "lucide-react"
import { Window } from "../components/Window"
import { Button } from "../components/Button"

export function DepartemenDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  // Placeholder data
  const dep = {
    name: slug?.toUpperCase() || "DEPARTEMEN",
    kepala: "Budi Santoso",
    description:
      "Bertanggung jawab dalam pengelolaan dan pengembangan sumber daya mahasiswa secara komprehensif.",
    programKerja: ["Latihan Kepemimpinan", "Upgrading Pengurus", "BEM Awards"],
    anggota: [
      "Siti Aminah",
      "Andi Rahman",
      "Dewi Lestari",
      "Ahmad Fauzi",
      "Rina Wati",
    ],
  }

  return (
    <div className="w-full h-full flex items-center justify-center px-4 pb-[8vh] pointer-events-none">
      <Window
        id="departemendetail-1"
        title={`C:\\BEM\\Departemen\\${slug}.exe`}
        icon={<Folder size={14} />}
        className="w-full max-w-2xl pointer-events-auto"
        footer={
          <Button onClick={() => navigate("/departemen")}>Kembali</Button>
        }
      >
        <div className="p-6 bg-white">
          <div className="mb-6 border-b-2 border-dark pb-4">
            <h2 className="font-heading text-3xl font-extrabold mb-2">
              {dep.name}
            </h2>
            <p className="font-body text-sm text-dark/80">
              Kepala: <strong className="text-dark">{dep.kepala}</strong>
            </p>
          </div>

          <div className="mb-6">
            <p className="font-body">{dep.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-mono text-sm font-bold uppercase mb-3 bg-dark text-white px-2 py-1 inline-block">
                Program Kerja
              </h3>
              <ol className="list-decimal pl-5 space-y-2 font-body text-sm">
                {dep.programKerja.map((pk, i) => (
                  <li key={i}>{pk}</li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="font-mono text-sm font-bold uppercase mb-3 bg-dark text-white px-2 py-1 inline-block">
                Anggota
              </h3>
              <ul className="grid grid-cols-2 gap-2 font-body text-sm">
                {dep.anggota.map((nama, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent border border-dark rounded-full"></span>
                    {nama}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Window>
    </div>
  )
}
