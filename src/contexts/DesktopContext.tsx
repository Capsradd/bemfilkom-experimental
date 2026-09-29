import React from "react"

export interface WindowState {
  x: number
  y: number
  zIndex: number
}

export const DesktopContext = React.createContext<{
  openWindows: string[]
  minimizedWindows: string[]
  windowStates: Record<string, WindowState>
  openPageWindows: (ids: string[]) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updateWindowState: (id: string, state: Partial<WindowState>) => void
  toggleMinimize: (id: string) => void
  isMinimized: (id: string) => boolean
  activeWindowId: string | null
} | null>(null)
