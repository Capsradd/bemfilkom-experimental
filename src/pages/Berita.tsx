import React, { useState } from "react"
import { FileText } from "lucide-react"
import { Window } from "../components/Window"

const BERITA_DATA = [
  {
    id: 1,
    title: "Pemilu Raya Mahasiswa FILKOM UNIDA 2025 Berlangsung Damai",
    date: "12 Nov 2025",
    content:
      "Pemilihan Umum Raya (PEMIRA) Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda Bogor tahun 2025 telah sukses diselenggarakan. Acara yang merupakan agenda tahunan ini bertujuan untuk memilih Gubernur dan Wakil Gubernur BEM FILKOM periode berikutnya...\n\nAcara berlangsung lancar dan damai dengan tingkat partisipasi mahasiswa mencapai 85%.",
  },
  {
    id: 2,
    title: "BEM FILKOM Gelar Seminar Nasional AI dan Masa Depan Pekerjaan",
    date: "05 Nov 2025",
    content:
      'Dalam rangka merespons perkembangan teknologi yang pesat, BEM FILKOM UNIDA menyelenggarakan Seminar Nasional dengan tema "Artificial Intelligence dan Masa Depan Pekerjaan". Seminar ini mengundang pakar dari industri teknologi terkemuka.\n\nPeserta sangat antusias mengikuti sesi tanya jawab yang berlangsung interaktif.',
  },
  {
    id: 3,
    title: "Open Recruitment Kepanitiaan FILKOM Fest Dibuka",
    date: "28 Okt 2025",
    content:
      "Kabar gembira bagi seluruh mahasiswa FILKOM! Pendaftaran kepanitiaan untuk acara terbesar kita, FILKOM Fest 2025 resmi dibuka. Tersedia berbagai divisi yang bisa kamu pilih sesuai dengan minat dan bakatmu.\n\nSegera daftarkan dirimu dan jadilah bagian dari sejarah!",
  },
]

export function Berita() {
  const [selected, setSelected] = useState(BERITA_DATA[0])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Window
        id="berita-1"
        title="INBOX - BERITA BEM"
        icon={<FileText size={14} />}
        className="w-[90%] md:w-1/2 pointer-events-auto"
      >
        <div className="flex flex-col md:flex-row">
          {/* List Sidebar */}
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-dark bg-white overflow-y-auto flex-shrink-0">
            {BERITA_DATA.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelected(b)}
                className={`p-4 border-b border-dark/10 cursor-pointer transition-colors ${
                  selected.id === b.id
                    ? "bg-selected text-white"
                    : "hover:bg-[#E8EDF5] active:bg-[#E8EDF5]"
                }`}
              >
                <h4 className="font-heading font-bold text-sm mb-1 line-clamp-2">
                  {b.title}
                </h4>
                <p
                  className={`font-mono text-[10px] ${
                    selected.id === b.id ? "text-white/80" : "text-dark/50"
                  }`}
                >
                  {b.date}
                </p>
              </div>
            ))}
          </div>

          {/* Article View */}
          <div className="flex-1 bg-[#E8EDF5] overflow-y-auto relative">
            {/* Toolbar */}
            <div className="border-b border-dark p-2 bg-[#d4dae5] flex gap-2 font-mono text-xs shadow-sm sticky top-0 z-10">
              <span className="px-2 py-1 bg-white border border-dark">
                Balas
              </span>
              <span className="px-2 py-1 bg-white border border-dark">
                Teruskan
              </span>
            </div>

            <div className="p-6 md:p-8">
                <div className="bg-white border border-dark p-6 md:p-8 shadow-[4px_4px_0_0_var(--color-dark)]">
                <div className="border-b-2 border-dark pb-4 mb-6">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark leading-tight">
                    {selected.title}
                  </h2>
                  <p className="font-mono text-xs text-dark/60 mt-3 uppercase">
                    Dipublikasikan pada: {selected.date}
                  </p>
                </div>
                <div className="font-body text-base text-dark leading-relaxed whitespace-pre-wrap">
                  {selected.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Window>
    </div>
  )
}
