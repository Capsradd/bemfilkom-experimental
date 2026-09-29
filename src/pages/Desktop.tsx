import React from "react"
import { useNavigate } from "react-router-dom"
import {
  Home,
  FileText,
  Folder,
  CalendarDays,
  Contact,
  Mail,
  Image as ImageIcon,
  Phone,
} from "lucide-react"

const APPS = [
  { path: "/", label: "Beranda", icon: Home, badge: null },
  { path: "/tentang", label: "Tentang", icon: FileText, badge: null },
  { path: "/departemen", label: "Departemen", icon: Folder, badge: null },
  {
    path: "/program-kerja",
    label: "Program Kerja",
    icon: CalendarDays,
    badge: null,
  },
  { path: "/kabinet", label: "Kabinet", icon: Contact, badge: null },
  { path: "/berita", label: "Berita", icon: Mail, badge: "BARU" },
  { path: "/galeri", label: "Galeri", icon: ImageIcon, badge: null },
  { path: "/kontak", label: "Hubungi Kami", icon: Phone, badge: null },
]

export function Desktop() {
  const navigate = useNavigate()

  return (
    <div className="w-full h-full flex flex-col md:-mt-8 pointer-events-auto">
      {/* On mobile: 3-column grid. On desktop: vertical flex columns */}
      <div className="grid grid-cols-3 gap-4 md:grid-cols-none md:flex md:flex-col md:flex-wrap md:content-start md:gap-6 md:h-full w-full md:w-auto">
        {APPS.map((app) => (
          <button
            key={app.path}
            onClick={() => navigate(app.path)}
            className="group relative flex flex-col items-center justify-start gap-2 w-full md:w-[96px] p-2 rounded-sm hover:bg-[#3E6FD8]/40 hover:border-dotted hover:border hover:border-white focus:outline-none focus:bg-[#3E6FD8]/40 focus:border-dotted focus:border focus:border-white border border-transparent transition-all min-h-[72px]"
          >
            <div className="relative text-[#E8EDF5] flex items-center justify-center w-12 h-12">
              <app.icon
                size={48}
                strokeWidth={1}
                className="drop-shadow-md group-hover:text-white"
              />
              <div className="absolute top-[10%] right-[10%] w-2 h-2 bg-accent rounded-full border border-dark opacity-80" />
              {app.badge && (
                <span className="absolute -top-2 -right-4 bg-accent text-dark text-[9px] font-bold px-1 py-0.5 border border-dark shadow-[1px_1px_0_0_var(--color-dark)] transform rotate-12">
                  {app.badge}
                </span>
              )}
            </div>
            <span className="font-mono text-xs uppercase text-[#E8EDF5] text-center [text-shadow:1px_1px_0_#060E20,0_1px_2px_#060E20]">
              {app.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
