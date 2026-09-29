import React, { useState, useEffect, useCallback, useRef } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  Menu,
  Home,
  Info,
  Folder,
  CalendarDays,
  Contact,
  FileText,
  Image as ImageIcon,
  Phone,
  Mail,
  ChevronRight,
  Power,
  XSquare,
  Gamepad2,
  Volume2,
  MonitorSmartphone,
  ChevronUp,
  type LucideIcon,
} from "lucide-react"
import { DesktopContext } from "../contexts/DesktopContext"
import { Window } from "../components/Window"
import { BootScreen } from "../components/BootScreen"
import logoBem from "../assets/logo-bem.png"
import { Snake } from "../games/Snake"
import { Minesweeper } from "../games/Minesweeper"
import { TrayCalendar } from "../components/TrayCalendar"
import { TrayIcons } from "../components/TrayIcons"
import { formatDateCompact } from "../lib/tanggal"

type App = {
  path: string
  label: string
  icon: LucideIcon
  badge: string | null
  onDesktop?: boolean
}

const APPS: App[] = [
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
  {
    path: "/snake",
    label: "Snake",
    icon: Gamepad2,
    badge: null,
    onDesktop: false,
  },
  {
    path: "/minesweeper",
    label: "Minesweeper",
    icon: Gamepad2,
    badge: null,
    onDesktop: false,
  },
]

const DESKTOP_APPS = APPS.filter((app) => app.onDesktop !== false)

const DesktopAppIcon = ({
  app,
  onLaunch,
}: {
  app: App
  onLaunch?: () => void
}) => {
  const navigate = useNavigate()
  const context = React.useContext(DesktopContext)
  return (
    <button
      onClick={() => {
        context?.openPageWindows(resolveDefaultWindows(app.path))
        navigate(app.path)
        onLaunch?.()
      }}
      className="group relative flex flex-col items-center justify-start gap-2 w-full md:w-[96px] p-2 rounded-sm hover:bg-[#3E6FD8]/40 hover:border-dotted hover:border hover:border-white focus:outline-none focus:bg-[#3E6FD8]/40 focus:border-dotted focus:border focus:border-white border border-transparent transition-all min-h-[72px]"
    >
      <div className="relative text-[#E8EDF5] flex items-center justify-center w-12 h-12 pointer-events-none">
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
      <span className="font-mono text-xs uppercase text-[#E8EDF5] text-center [text-shadow:1px_1px_0_#060E20,0_1px_2px_#060E20] pointer-events-none">
        {app.label}
      </span>
    </button>
  )
}

const ROUTE_DEFAULT_WINDOWS: Record<string, string[]> = {
  "/": ["beranda-1", "beranda-2", "beranda-3"],
  "/tentang": ["tentang-visi", "tentang-misi"],
  "/departemen": ["departemenlist-1"],
  "/program-kerja": ["programkerja-1"],
  "/kabinet": ["kabinet-1"],
  "/berita": ["berita-1"],
  "/galeri": ["galeri-1", "galeri-2", "galeri-3", "galeri-4"],
  "/kontak": ["kontak-window"],
  "/snake": ["snake-1"],
  "/minesweeper": ["minesweeper-1"],
}

const resolveDefaultWindows = (pathname: string) =>
  pathname.startsWith("/departemen/") && pathname !== "/departemen"
    ? ["departemendetail-1"]
    : ROUTE_DEFAULT_WINDOWS[pathname] || []

const WINDOW_META: Record<string, { label: string; icon: LucideIcon }> = {
  "beranda-1": { label: "Beranda", icon: Home },
  "beranda-2": { label: "Statistik", icon: Home },
  "beranda-3": { label: "Berita Terbaru", icon: Mail },
  "tentang-visi": { label: "Visi", icon: FileText },
  "tentang-misi": { label: "Misi", icon: FileText },
  "departemenlist-1": { label: "Explorer", icon: Folder },
  "departemendetail-1": { label: "Departemen", icon: Folder },
  "programkerja-1": { label: "Program Kerja", icon: CalendarDays },
  "kabinet-1": { label: "Kabinet", icon: Contact },
  "berita-1": { label: "Berita", icon: Mail },
  "galeri-1": { label: "Galeri 1", icon: ImageIcon },
  "galeri-2": { label: "Galeri 2", icon: ImageIcon },
  "galeri-3": { label: "Galeri 3", icon: ImageIcon },
  "galeri-4": { label: "Galeri 4", icon: ImageIcon },
  "kontak-window": { label: "Hubungi Kami", icon: Phone },
  "snake-1": { label: "Snake", icon: Gamepad2 },
  "minesweeper-1": { label: "Minesweeper", icon: Gamepad2 },
}

const RESIDENT_WINDOWS = ["snake-1", "minesweeper-1"]

const RESIDENT_OFFSETS: Record<
  string,
  { x: number; y: number; anchorRight?: boolean }
> = {
  "snake-1": { x: 24, y: 24 },
  "minesweeper-1": { x: 560, y: 48 },
}

export function DesktopLayout() {
  const [time, setTime] = useState(new Date())
  const [menuOpen, setMenuOpen] = useState(false)
  const [calOpen, setCalOpen] = useState(false)
  const [trayOpen, setTrayOpen] = useState(false)
  const trayRef = useRef<HTMLDivElement>(null)
  const [showSubmenu, setShowSubmenu] = useState(false)
  const [powerState, setPowerState] = useState<
    "boot" | "desktop" | "shutdown" | "off"
  >("boot")
  const location = useLocation()
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)

  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([])
  const [windowStates, setWindowStates] =
    useState<Record<string, import("../contexts/DesktopContext").WindowState>>(
      {},
    )
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)

  const openPageWindows = useCallback((ids: string[]) => {
    setOpenWindows((prev) => {
      const kept = RESIDENT_WINDOWS.filter(
        (id) => prev.includes(id) && !ids.includes(id),
      )
      return [...kept, ...ids]
    })
    setMinimizedWindows((prev) => prev.filter((id) => !ids.includes(id)))
    setActiveWindowId(ids[ids.length - 1] || null)
    if (ids.length > 0) {
      const wide =
        typeof window !== "undefined" && window.innerWidth >= 1024
      setWindowStates((prev) => {
        const next = { ...prev }
        ids.forEach((id) => {
          if (next[id]) return
          const off = wide ? RESIDENT_OFFSETS[id] : undefined
          next[id] = {
            x: off?.anchorRight
              ? Math.max(16, window.innerWidth - 250)
              : (off?.x ?? 0),
            y: off?.y ?? 0,
            zIndex: 10,
          }
        })
        return next
      })
    }
  }, [])

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id))
    setMinimizedWindows((prev) => prev.filter((w) => w !== id))
    setWindowStates((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    setActiveWindowId((prev) => (prev === id ? null : prev))
  }, [])

  const isMinimized = useCallback(
    (id: string) => minimizedWindows.includes(id),
    [minimizedWindows],
  )

  const toggleMinimize = useCallback((id: string) => {
    setMinimizedWindows((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
    )
  }, [])

  const focusWindow = useCallback((id: string) => {
    setActiveWindowId(id)
    setWindowStates((prev) => {
      const maxZ = Math.max(10, ...Object.values(prev).map((s) => s.zIndex))
      if (prev[id]?.zIndex === maxZ && maxZ > 10) return prev
      return {
        ...prev,
        [id]: { ...(prev[id] || { x: 0, y: 0 }), zIndex: maxZ + 1 },
      }
    })
  }, [])

  const updateWindowState = useCallback(
    (
      id: string,
      state: Partial<import("../contexts/DesktopContext").WindowState>,
    ) => {
      setWindowStates((prev) => ({
        ...prev,
        [id]: { ...(prev[id] || { x: 0, y: 0, zIndex: 10 }), ...state },
      }))
    },
    [],
  )

  useEffect(() => {
    openPageWindows([
      ...resolveDefaultWindows(location.pathname),
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const lastPath = useRef(location.pathname)
  useEffect(() => {
    if (lastPath.current !== location.pathname) {
      openPageWindows(resolveDefaultWindows(location.pathname))
      lastPath.current = location.pathname
    }
  }, [location.pathname, openPageWindows])
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (menuOpen) setMenuOpen(false)
        else if (calOpen) setCalOpen(false)
        else if (trayOpen) setTrayOpen(false)
        else if (activeWindowId) {
          window.dispatchEvent(
            new CustomEvent("os-close-window", {
              detail: { id: activeWindowId },
            }),
          )
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeWindowId, menuOpen, calOpen, trayOpen])

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        // Also don't close if they clicked the Mulai button
        const target = e.target as HTMLElement
        if (!target.closest("#btn-mulai")) {
          setMenuOpen(false)
        }
      }
    }
    document.addEventListener("pointerdown", handleClickOutside)
    return () => document.removeEventListener("pointerdown", handleClickOutside)
  }, [menuOpen])

  useEffect(() => {
    const handleOutside = (e: PointerEvent) => {
      if (!trayRef.current || trayRef.current.contains(e.target as Node)) return
      if (calOpen) setCalOpen(false)
      if (trayOpen) setTrayOpen(false)
    }
    document.addEventListener("pointerdown", handleOutside)
    return () => document.removeEventListener("pointerdown", handleOutside)
  }, [calOpen, trayOpen])

  const finishBoot = useCallback(() => setPowerState("desktop"), [])
  const finishShutdown = useCallback(() => setPowerState("off"), [])

  const minimizeAll = useCallback(() => {
    setMinimizedWindows((prev) => Array.from(new Set([...prev, ...openWindows])))
  }, [openWindows])

  if (powerState === "boot" || powerState === "shutdown") {
    return (
      <BootScreen
        mode={powerState}
        onDone={powerState === "boot" ? finishBoot : finishShutdown}
      />
    )
  }

  if (powerState === "off") {
    return (
      <div className="fixed inset-0 bg-desktop flex flex-col items-center justify-center z-[100]">
        <h1 className="font-heading text-4xl text-white mb-8">
          Terima kasih telah berkunjung
        </h1>
        <button
          onClick={() => setPowerState("boot")}
          className="bg-accent text-dark font-mono text-sm uppercase font-bold px-6 py-3 border border-dark shadow-[4px_4px_0_0_var(--color-dark)] hover:bg-yellow-400 active:translate-x-1 active:translate-y-1 active:shadow-[0_0_0_0_var(--color-dark)] transition-all"
        >
          Nyalakan
        </button>
      </div>
    )
  }

  return (
    <DesktopContext.Provider
      value={{
        openWindows,
        minimizedWindows,
        windowStates,
        openPageWindows,
        closeWindow,
        focusWindow,
        updateWindowState,
        toggleMinimize,
        isMinimized,
        activeWindowId,
      }}
    >
      <div className="flex flex-col h-dvh w-full overflow-hidden relative">
        {/* Background Overlay done via CSS in index.css */}

        <div className="flex-1 min-h-0 relative z-10 pointer-events-none pb-[calc(3rem+env(safe-area-inset-bottom))]">
          <Outlet />
          <div className="absolute inset-0">
            <Snake />
          </div>
          <div className="absolute inset-0">
            <Minesweeper />
          </div>
        </div>

        {/* Desktop Icons (Always visible on Desktop, Left Grid) */}
        <div className="hidden md:flex absolute top-8 left-8 flex-col gap-2 z-0 flex-nowrap">
          {DESKTOP_APPS.map((app) => (
            <DesktopAppIcon key={app.path} app={app} />
          ))}
        </div>

        {/* Windows XP Style Start Menu (Desktop only) */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="flex flex-col absolute bottom-[calc(3rem+env(safe-area-inset-bottom))] left-0 w-full md:w-[440px] max-h-[calc(100dvh-4rem-env(safe-area-inset-bottom))] bg-white border border-dark shadow-[4px_4px_0_0_var(--color-dark)] z-50 animate-in slide-in-from-bottom-2 fade-in duration-120"
            style={{ borderRadius: "2px" }}
          >
            {/* Header Bar */}
            <div className="h-14 bg-titlebar flex items-center px-2 text-white shadow-sm border-b border-dark/20 shrink-0">
              <img
                src={logoBem}
                alt="BEM FILKOM UNIDA"
                className="w-10 h-10 object-contain rounded-full bg-white/95 border border-white/30 shrink-0"
              />
              <div className="ml-3 flex flex-col">
                <span className="font-heading font-bold text-lg leading-tight">
                  BEM FILKOM UNIDA
                </span>
                <span className="font-mono text-[10px] text-white/70">
                  Fakultas Ilmu Komputer
                </span>
              </div>
            </div>

            {/* Two Columns */}
            <div className="flex flex-col md:flex-row bg-[#F4F7FB] md:min-h-[360px] flex-1 md:flex-none min-h-0 overflow-y-auto">
              {/* Left Column (55%) */}
              <div className="w-full md:w-[55%] flex flex-col border-b md:border-b-0 md:border-r border-dark/10 py-2 relative shrink-0">
                {[
                  {
                    path: "/",
                    label: "Beranda",
                    desc: "Halaman utama",
                    icon: Home,
                  },
                  {
                    path: "/tentang",
                    label: "Tentang",
                    desc: "Visi dan misi",
                    icon: FileText,
                  },
                  {
                    path: "/departemen",
                    label: "Departemen",
                    desc: "Daftar departemen",
                    icon: Folder,
                  },
                  {
                    path: "/program-kerja",
                    label: "Program Kerja",
                    desc: "Agenda dan status",
                    icon: CalendarDays,
                  },
                ].map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      openPageWindows(resolveDefaultWindows(item.path))
                      navigate(item.path)
                      setMenuOpen(false)
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2 hover:bg-selected hover:text-white active:bg-selected active:text-white transition-colors group text-left"
                  >
                    <item.icon
                      size={32}
                      strokeWidth={1.5}
                      className="text-dark group-hover:text-white shrink-0"
                    />
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-heading font-bold text-sm text-dark group-hover:text-white truncate">
                        {item.label}
                      </span>
                      <span className="font-body text-[10px] text-dark/60 group-hover:text-white/80 truncate">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                ))}

                <div className="my-2 border-t border-dark/10 mx-2"></div>

                <button
                  onClick={() => {
                    navigate("/berita")
                    setMenuOpen(false)
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 hover:bg-selected hover:text-white active:bg-selected active:text-white transition-colors group text-left relative"
                >
                  <Mail
                    size={32}
                    strokeWidth={1.5}
                    className="text-dark group-hover:text-white shrink-0"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-heading font-bold text-sm text-dark group-hover:text-white truncate">
                      Berita
                    </span>
                    <span className="font-body text-[10px] text-dark/60 group-hover:text-white/80 truncate">
                      Kabar terbaru
                    </span>
                  </div>
                  <span className="absolute top-2 right-2 bg-accent text-dark text-[9px] font-bold px-1 border border-dark transform rotate-12 shadow-sm">
                    BARU
                  </span>
                </button>

                <div className="mt-auto pt-2 border-t border-dark/10">
                  <button
                    onMouseEnter={() => setShowSubmenu(true)}
                    onMouseLeave={() => setShowSubmenu(false)}
                    onClick={() => setShowSubmenu(!showSubmenu)}
                    className="flex items-center justify-between w-full px-4 py-2 font-mono text-[11px] font-bold uppercase text-dark hover:bg-selected hover:text-white active:bg-selected active:text-white transition-colors group"
                  >
                    <span>Semua Halaman</span>
                    <ChevronRight
                      size={14}
                      className="text-dark group-hover:text-white"
                    />
                  </button>
                </div>

                {/* Submenu Flyout */}
                {showSubmenu && (
                  <div
                    onMouseEnter={() => setShowSubmenu(true)}
                    onMouseLeave={() => setShowSubmenu(false)}
                    className="relative md:absolute md:bottom-0 md:left-[100%] w-full md:w-48 bg-[#F4F7FB] border border-dark shadow-[4px_4px_0_0_var(--color-dark)] py-1 z-[60]"
                  >
                    {APPS.map((app) => (
                      <button
                        key={app.path}
                        onClick={() => {
                          openPageWindows(resolveDefaultWindows(app.path))
                          navigate(app.path)
                          setMenuOpen(false)
                          setShowSubmenu(false)
                        }}
                        className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-selected hover:text-white active:bg-selected active:text-white transition-colors text-left group"
                      >
                        <app.icon
                          size={16}
                          className="text-dark group-hover:text-white shrink-0"
                        />
                        <span className="font-mono text-[10px] uppercase text-dark group-hover:text-white truncate">
                          {app.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column (45%) */}
              <div className="w-full md:w-[45%] flex flex-col bg-[#C9D6EC] py-2 shrink-0">
                {[
                  { label: "Visi BEM", icon: FileText, path: "/tentang" },
                  { label: "Misi BEM", icon: FileText, path: "/tentang" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      openPageWindows(resolveDefaultWindows(item.path))
                      navigate(item.path)
                      setMenuOpen(false)
                    }}
                    className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-selected hover:text-white active:bg-selected active:text-white transition-colors group text-left"
                  >
                    <item.icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-dark/80 group-hover:text-white shrink-0"
                    />
                    <span className="font-mono text-xs text-dark group-hover:text-white truncate font-semibold">
                      {item.label}
                    </span>
                  </button>
                ))}

                <div className="my-1 border-t border-dark/10 mx-2"></div>

                {[
                  { label: "Kabinet", icon: Contact, path: "/kabinet" },
                  { label: "Galeri", icon: ImageIcon, path: "/galeri" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      openPageWindows(resolveDefaultWindows(item.path))
                      navigate(item.path)
                      setMenuOpen(false)
                    }}
                    className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-selected hover:text-white active:bg-selected active:text-white transition-colors group text-left"
                  >
                    <item.icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-dark/80 group-hover:text-white shrink-0"
                    />
                    <span className="font-mono text-xs text-dark group-hover:text-white truncate font-semibold">
                      {item.label}
                    </span>
                  </button>
                ))}

                <div className="my-1 border-t border-dark/10 mx-2"></div>

                <button
                  onClick={() => {
                    navigate("/kontak")
                    setMenuOpen(false)
                  }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-selected hover:text-white active:bg-selected active:text-white transition-colors group text-left"
                >
                  <Phone
                    size={20}
                    strokeWidth={1.5}
                    className="text-dark/80 group-hover:text-white shrink-0"
                  />
                  <span className="font-mono text-xs text-dark group-hover:text-white truncate font-semibold">
                    Hubungi Kami
                  </span>
                </button>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="h-12 bg-titlebar flex items-center justify-end px-3 gap-3 border-t border-dark/20 shrink-0">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("os-close-all-windows"))
                  setMenuOpen(false)
                }}
                className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 px-2 py-1 transition-colors group"
              >
                <XSquare
                  size={14}
                  className="text-white/70 group-hover:text-white"
                />
                <span className="font-mono text-[10px] uppercase">
                  Tutup Semua Jendela
                </span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false)
                  setPowerState("shutdown")
                }}
                className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-[#C0392B] px-2 py-1 transition-colors group"
              >
                <Power
                  size={14}
                  className="text-white/70 group-hover:text-white"
                />
                <span className="font-mono text-[10px] uppercase font-bold">
                  Matikan
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Taskbar */}
        <footer className="fixed bottom-0 left-0 w-full h-[calc(3rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-[#d4dae5] border-t-2 border-white flex items-center justify-between px-2 z-50 shadow-[0_-2px_0_0_var(--color-dark)]">
          <div className="flex items-center gap-2 h-full py-1.5 min-w-0 flex-1">
            <button
              id="btn-mulai"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`
                flex items-center gap-2 px-3 h-full font-heading font-bold text-sm uppercase tracking-wider
                border border-dark shadow-[2px_2px_0_0_var(--color-dark)] transition-all
                ${
                  menuOpen
                    ? "bg-selected text-white shadow-[0_0_0_0_var(--color-dark)] translate-x-[2px] translate-y-[2px]"
                    : "bg-accent text-dark hover:bg-yellow-400"
                }
              `}
            >
              <Menu size={16} strokeWidth={2.5} />
              <span>Mulai</span>
            </button>

            <div className="w-[2px] h-full bg-dark/20 mx-1 shrink-0"></div>

            <div className="flex items-center gap-1.5 h-full min-w-0 flex-1 overflow-x-auto">
              {openWindows.map((id) => {
                const meta = WINDOW_META[id]
                if (!meta) return null
                const Icon = meta.icon
                const minimized = minimizedWindows.includes(id)
                const active = !minimized && activeWindowId === id
                return (
                  <button
                    key={id}
                    onClick={() => toggleMinimize(id)}
                    aria-label={meta.label}
                    aria-pressed={!minimized}
                    title={meta.label}
                    className={`flex items-center gap-1.5 h-full px-2 md:px-3 shrink-0 border border-dark font-mono text-xs uppercase font-semibold transition-colors ${
                      minimized
                        ? "bg-[#E8EDF5] text-dark/70 hover:bg-white"
                        : active
                          ? "bg-selected text-white"
                          : "bg-[#C9D6EC] text-dark hover:bg-[#B7C9E6]"
                    }`}
                    style={{
                      boxShadow: minimized
                        ? "inset 1px 1px 0 rgba(0,0,0,0.15)"
                        : "inset 1px 1px 0 rgba(255,255,255,0.35)",
                    }}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span className="hidden md:inline max-w-[10ch] truncate">
                      {meta.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div ref={trayRef} className="h-full pr-2 shrink-0 flex items-stretch">
            {/* System tray */}
            <div className="flex items-center gap-2 pl-2 pr-3 h-full border-l border-dark/20">
              <div className="relative group h-full flex items-center">
                <button
                  type="button"
                  onClick={() => setTrayOpen((o) => !o)}
                  aria-expanded={trayOpen}
                  aria-label="Show hidden icons"
                  className={`flex items-center justify-center w-6 h-6 transition-colors ${
                    trayOpen
                      ? "bg-[#3E6FD8]/20"
                      : "text-dark/70 hover:text-dark hover:bg-black/[0.06]"
                  }`}
                >
                  <ChevronUp size={15} strokeWidth={2.5} />
                </button>
                {!trayOpen && (
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-[#F4F7FB] border border-dark px-2 py-1 font-mono text-[9px] uppercase text-dark shadow-[2px_2px_0_0_var(--color-dark)] z-[70] pointer-events-none">
                    Show hidden icons
                  </span>
                )}
                {trayOpen && <TrayIcons />}
              </div>

              <Volume2 size={14} className="text-dark/60" />
              <MonitorSmartphone size={14} className="text-dark/60" />
            </div>

            {/* Clock + date -> opens calendar flyout */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCalOpen((o) => !o)}
                aria-expanded={calOpen}
                aria-label="Buka kalender"
                className={`flex flex-col items-end justify-center pl-3 pr-3 h-full transition-colors ${
                  calOpen
                    ? "bg-[#3E6FD8]/20"
                    : "text-dark hover:bg-black/[0.06] active:bg-black/10"
                }`}
              >
                <span className="font-mono text-sm font-bold tabular-nums leading-none whitespace-nowrap text-dark">
                  {time.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="font-mono text-[10px] uppercase font-bold leading-none whitespace-nowrap text-dark/80 mt-1">
                  {formatDateCompact(time)}
                </span>
              </button>

              {calOpen && <TrayCalendar today={time} />}
            </div>
          </div>

          {/* Show Desktop */}
          <button
            type="button"
            aria-label="Tampilkan desktop"
            title="Tampilkan desktop"
            onClick={minimizeAll}
            className="w-3 self-stretch bg-[#d4dae5] border-l border-dark/30 hover:bg-white active:bg-[#b9c0cc] transition-colors"
          />
        </footer>
      </div>
    </DesktopContext.Provider>
  )
}
