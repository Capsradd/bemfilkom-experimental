import React, { useState, useEffect, useRef, useContext } from "react"
import { X } from "lucide-react"
import { DesktopContext } from "../contexts/DesktopContext"

interface WindowProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
  footer?: React.ReactNode
  icon?: React.ReactNode
}

export function Window({
  id,
  title,
  children,
  className = "",
  footer,
  icon,
}: WindowProps) {
  const context = useContext(DesktopContext)
  const isFocused = context?.activeWindowId === id
  const isOpen = context?.openWindows.includes(id) ?? true
  const isMinimized = context?.minimizedWindows.includes(id) ?? false

  const state = context?.windowStates[id] || { x: 0, y: 0, zIndex: 10 }

  const [isClosing, setIsClosing] = useState(false)
  const [localPos, setLocalPos] = useState<{ x: number; y: number } | null>(
    null,
  )
  const [isDragging, setIsDragging] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)

  const pos = localPos || { x: state.x, y: state.y }

  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail?.id === id) handleClose()
    }
    const closeAllHandler = () => handleClose()

    window.addEventListener("os-close-window", handler)
    window.addEventListener("os-close-all-windows", closeAllHandler)
    return () => {
      window.removeEventListener("os-close-window", handler)
      window.removeEventListener("os-close-all-windows", closeAllHandler)
    }
  }, [id, context])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      context?.closeWindow(id)
      setIsClosing(false)
    }, 150)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (window.innerWidth < 1024) return
    if ((e.target as HTMLElement).closest("button")) return

    e.preventDefault()
    setIsDragging(true)
    context?.focusWindow(id)

    const startX = e.clientX - pos.x
    const startY = e.clientY - pos.y
    let finalX = pos.x
    let finalY = pos.y

    const onPointerMove = (ev: PointerEvent) => {
      let newX = ev.clientX - startX
      let newY = ev.clientY - startY

      if (windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect()
        const origTop = rect.top - pos.y
        const origLeft = rect.left - pos.x

        const maxUp = -origTop
        const maxDown = window.innerHeight - origTop - 48

        newY = Math.max(maxUp, Math.min(newY, maxDown))
      }

      finalX = newX
      finalY = newY
      setLocalPos({ x: newX, y: newY })
    }

    const onPointerUp = () => {
      setIsDragging(false)
      context?.updateWindowState(id, { x: finalX, y: finalY })
      setLocalPos(null)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
  }

  if (!isOpen || isMinimized) return null

  return (
    <div
      ref={windowRef}
      onPointerDownCapture={() => context?.focusWindow(id)}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        zIndex: state.zIndex,
      }}
      className={`flex flex-col max-h-[calc(100dvh-6rem-env(safe-area-inset-bottom))] bg-window-body border border-dark rounded-sm transition-opacity duration-150 relative ${
        isDragging
          ? "shadow-[6px_6px_0_0_var(--color-dark)]"
          : "shadow-[4px_4px_0_0_var(--color-dark)]"
      } ${
        isClosing
          ? "scale-95 opacity-0"
          : "scale-100 opacity-100 animate-in zoom-in-95"
      } ${className}`}
    >
      <div
        onPointerDown={handlePointerDown}
        className={`flex items-center justify-between px-2 py-1.5 border-b border-dark ${
          window.innerWidth >= 1024 ? "cursor-move touch-none" : ""
        } ${
          isFocused
            ? "bg-titlebar text-white"
            : "bg-titlebar-inactive text-[#E8EDF5]"
        }`}
      >
        <div className="flex items-center gap-2 overflow-hidden pointer-events-none">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <h2 className="font-mono text-xs uppercase tracking-wider truncate font-semibold">
            {title}
          </h2>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          className="flex items-center justify-center w-7 h-7 md:w-5 md:h-5 bg-[#d4dae5] border border-dark text-dark hover:bg-[#C0392B] hover:text-white focus:outline-none focus:ring-2 focus:ring-accent active:bg-yellow-500 shadow-[1px_1px_0_0_var(--color-dark)] ml-4 shrink-0 transition-colors group"
          aria-label="Close"
        >
          <X size={14} strokeWidth={3} className="currentColor" />
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-window-body text-window-text">
        {children}
      </div>

      {footer && (
        <div className="px-3 py-2 border-t border-dark bg-[#d4dae5] flex justify-end items-center gap-2">
          {footer}
        </div>
      )}
    </div>
  )
}
