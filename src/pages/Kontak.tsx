import React from "react"
import { Mail, Phone, MapPin, AtSign, Clock, Building2, Send } from "lucide-react"
import { Window } from "../components/Window"
import { Button } from "../components/Button"

type Kanal = {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  label: string
  value: string
  note: string
  href: string
}

const KANAL: Kanal[] = [
  {
    icon: Mail,
    label: "Email",
    value: "bem.filkom@unida.ac.id",
    note: "Umum & surat resmi",
    href: "mailto:bem.filkom@unida.ac.id",
  },
  {
    icon: Phone,
    label: "Telepon / WhatsApp",
    value: "+62 812-3456-7890",
    note: "Senin - Jumat, 08.00 - 16.00 WIB",
    href: "tel:+6281234567890",
  },
  {
    icon: AtSign,
    label: "Instagram",
    value: "@bemfilkomunida",
    note: "Pengumuman & dokumentasi",
    href: "https://instagram.com/bemfilkomunida",
  },
]

export function Kontak() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Window
        id="kontak-window"
        title="HUBUNGI_KAMI.ADDRESS"
        icon={<Mail size={14} />}
        className="w-[90%] md:w-1/2 pointer-events-auto"
        footer={
          <div className="flex w-full items-center justify-between gap-2 font-mono text-[10px] uppercase font-semibold text-dark/80">
            <span>Balas 1x24 jam kerja</span>
            <Button variant="primary" onClick={() => window.location.href = "mailto:bem.filkom@unida.ac.id"}>
              <span className="flex items-center gap-1.5">
                <Send size={12} />
                Kirim Email
              </span>
            </Button>
          </div>
        }
      >
        <div className="p-6 bg-window-body">
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-bold border-b border-dark/20 pb-2 inline-block">
              Kontak BEM FILKOM UNIDA
            </h2>
            <p className="font-body text-sm text-dark/70 mt-3 max-w-[52ch]">
              Punya pertanyaan, pengajuan, atau ingin volunteering? Hubungi kami
              lewat salah satu kanal di bawah ini.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {KANAL.map((k) => (
              <a
                key={k.label}
                href={k.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 bg-white border border-dark rounded-sm p-3 shadow-[2px_2px_0_0_var(--color-dark)] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-dark)] active:-translate-y-0.5 active:shadow-[4px_4px_0_0_var(--color-dark)]"
              >
                <div className="w-11 h-11 flex items-center justify-center bg-titlebar text-white border border-dark shrink-0">
                  <k.icon size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-heading font-bold text-base leading-tight text-dark">
                    {k.label}
                  </h3>
                  <p className="font-mono text-xs font-semibold text-selected truncate group-hover:underline">
                    {k.value}
                  </p>
                  <p className="font-body text-[11px] text-dark/60 truncate">
                    {k.note}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 bg-white border border-dark rounded-sm p-3">
              <Building2
                size={18}
                strokeWidth={1.5}
                className="text-dark/70 shrink-0 mt-0.5"
              />
              <div>
                <h3 className="font-heading font-bold text-sm text-dark">
                  KantorSekreteriat
                </h3>
                <p className="font-body text-xs text-dark/70 leading-relaxed">
                  Gedung Rektorat Lantai 2, Kampus Universitas Djuanda Bogor,
                  Jl. Ir. H. Juanda, Bogor, Jawa Barat
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-dark rounded-sm p-3">
              <Clock
                size={18}
                strokeWidth={1.5}
                className="text-dark/70 shrink-0 mt-0.5"
              />
              <div>
                <h3 className="font-heading font-bold text-sm text-dark">
                  Jam Layanan
                </h3>
                <p className="font-body text-xs text-dark/70 leading-relaxed">
                  Senin - Jumat, 08.00 - 16.00 WIB
                  <br />
                  Sabtu - Minggu, Closed
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase text-dark/60 border-t border-dark/15 pt-3">
            <MapPin size={12} strokeWidth={2} />
            <span>Periode 2025 / 2026</span>
          </div>
        </div>
      </Window>
    </div>
  )
}
