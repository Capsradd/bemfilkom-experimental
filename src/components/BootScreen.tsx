import React, { useCallback, useEffect, useRef, useState } from "react"
import logoBem from "../assets/logo-bem.png"

type Mode = "boot" | "shutdown"

export function BootScreen({
  mode,
  onDone,
}: {
  mode: Mode
  onDone: () => void
}) {
  const [progress, setProgress] = useState(0)
  const [showSafe, setShowSafe] = useState(false)
  const doneRef = useRef(false)
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    onDoneRef.current()
  }, [])

  useEffect(() => {
    if (mode === "shutdown") {
      const t1 = setTimeout(() => setProgress(100), 300)
      const t2 = setTimeout(() => setShowSafe(true), 2100)
      const t3 = setTimeout(finish, 4700)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    }
    const t1 = setTimeout(() => setProgress(100), 400)
    const t2 = setTimeout(finish, 3400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [mode, finish])

  if (showSafe) {
    return (
      <div
        className="fixed inset-0 bg-accent z-[200] flex items-center justify-center p-6 cursor-pointer"
        onClick={finish}
      >
        <p className="font-heading text-xl md:text-3xl font-bold text-dark text-center uppercase tracking-wide boot-fade-in">
          It's now safe to turn off
          <br />
          your computer.
        </p>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center select-none cursor-pointer"
      onClick={finish}
    >
      <div className="flex flex-col items-center boot-fade-in">
        <img
          src={logoBem}
          alt=""
          aria-hidden="true"
          className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.28)]"
        />
        <p className="mt-6 font-heading text-2xl md:text-3xl font-bold tracking-tight">
          <span className="text-white">Filkom</span>
          <span className="text-selected">OS</span>
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">
          BEM FILKOM UNIDA
        </p>
      </div>

      <div className="absolute bottom-20 md:bottom-24 w-[min(340px,78vw)]">
        <div className="h-2.5 border border-white/30 p-[2px]">
          <div
            className="h-full bg-selected"
            style={{
              width: `${progress}%`,
              transition: `width ${mode === "boot" ? 2600 : 1500}ms linear`,
            }}
          />
        </div>
        <p className="mt-3 text-center font-mono text-[10px] uppercase text-white/50">
          {mode === "boot" ? "Starting Filkom OS..." : "Shutting down..."}
        </p>
      </div>

      <p className="absolute bottom-4 font-mono text-[9px] text-white/25 text-center px-4">
        Copyright © BEM FILKOM UNIDA
      </p>
    </div>
  )
}
