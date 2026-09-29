import React, { useCallback, useContext, useEffect, useReducer, useRef } from "react"
import { Gamepad2, RotateCcw, Pause, Play, Trophy } from "lucide-react"
import { Window } from "../components/Window"
import { Button } from "../components/Button"
import { DesktopContext } from "../contexts/DesktopContext"
import { Minesweeper } from "../games/Minesweeper"
import { SIZE, freshGame, turn as turnGame, step, type Game } from "../games/snake"

const TICK = 140

export function Snake() {
  const context = useContext(DesktopContext)
  const isOpen = context?.openWindows.includes("snake-1") ?? true

  const gameRef = useRef<Game>(freshGame())
  const [, rerender] = useReducer((x: number) => x + 1, 0)
  const forceRender = useCallback(() => rerender(), [])

  useEffect(() => {
    if (isOpen) return
    const g = gameRef.current
    if (g.status !== "running") return
    g.status = "paused"
    forceRender()
  }, [isOpen, forceRender])

  const turn = useCallback(
    (dx: number, dy: number) => {
      if (turnGame(gameRef.current, dx, dy)) forceRender()
    },
    [forceRender],
  )

  const reset = useCallback(() => {
    gameRef.current = freshGame()
    forceRender()
  }, [forceRender])

  const togglePause = useCallback(() => {
    const g = gameRef.current
    if (g.status === "running") g.status = "paused"
    else if (g.status === "paused") g.status = "running"
    forceRender()
  }, [forceRender])

  useEffect(() => {
    const id = setInterval(() => {
      const result = step(gameRef.current)
      if (result !== "idle") forceRender()
    }, TICK)
    return () => clearInterval(id)
  }, [forceRender])

  useEffect(() => {
    const KEYS: Record<string, [number, number]> = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      w: [0, -1],
      s: [0, 1],
      a: [-1, 0],
      d: [1, 0],
    }
    const onKey = (e: KeyboardEvent) => {
      const g = gameRef.current
      if (g.status !== "running" && g.status !== "ready") return
      const move = KEYS[e.key] ?? KEYS[e.key.toLowerCase()]
      if (!move) return
      e.preventDefault()
      turn(move[0], move[1])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [turn])

  const g = gameRef.current
  const segments = new Map<string, number>()
  g.snake.forEach((p, i) => segments.set(`${p.x},${p.y}`, i))
  const foodKey = `${g.food.x},${g.food.y}`
  const won = g.status === "over" && g.snake.length === SIZE * SIZE

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Window
        id="snake-1"
        title="SNAKE.EXE"
        icon={<Gamepad2 size={14} />}
        className="w-[90%] md:w-auto pointer-events-auto"
      >
        <div className="p-4 md:p-5 bg-window-body flex flex-col items-center gap-4">
          <div className="w-full flex items-center justify-between font-mono text-xs uppercase font-bold">
            <span className="flex items-center gap-1.5 text-dark/70">
              Skor
              <span className="text-dark text-base">{g.score}</span>
            </span>
            <span className="flex items-center gap-1.5 text-dark/70">
              Panjang
              <span className="text-dark text-base">{g.snake.length}</span>
            </span>
          </div>

          <div className="relative w-full max-w-[440px]">
            <div
              className="w-full aspect-square grid bg-[#060E20] border-2 border-dark shadow-[4px_4px_0_0_var(--color-dark)]"
              style={{
                gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${SIZE}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: SIZE * SIZE }, (_, i) => {
                const key = `${i % SIZE},${(i / SIZE) | 0}`
                const idx = segments.get(key)
                let cls = "border border-white/[0.04]"
                if (idx === 0) cls = "m-[1px] rounded-sm bg-white"
                else if (idx !== undefined) cls = "m-[1px] rounded-sm bg-selected"
                else if (key === foodKey) cls = "m-[2px] rounded-full bg-accent"
                return <div key={i} className={cls} />
              })}
            </div>

            {(g.status === "ready" || g.status === "over") && (
              <div className="absolute inset-0 bg-[#060E20]/85 flex flex-col items-center justify-center gap-3 p-4 text-center">
                {g.status === "over" ? (
                  <>
                    <Trophy size={28} className="text-accent" strokeWidth={1.5} />
                    <p className="font-heading font-bold text-lg text-white uppercase">
                      {won ? "Juara!" : "Game Over"}
                    </p>
                    <p className="font-mono text-[11px] text-white/60">
                      Skor {g.score} - panjang {g.snake.length}
                    </p>
                    <Button variant="primary" onClick={reset}>
                      Main Lagi
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="font-heading font-bold text-lg text-white uppercase">
                      Snake
                    </p>
                    <p className="font-mono text-[11px] text-white/60">
                      <span className="md:hidden">Gunakan tombol di bawah</span>
                      <span className="hidden md:inline">Panah / WASD</span>
                    </p>
                    <Button variant="primary" onClick={() => turn(1, 0)}>
                      Mulai
                    </Button>
                  </>
                )}
              </div>
            )}

            {g.status === "paused" && (
              <div className="absolute inset-0 bg-[#060E20]/85 flex flex-col items-center justify-center gap-3">
                <p className="font-heading font-bold text-lg text-white uppercase">
                  Dijeda
                </p>
                <Button onClick={togglePause}>Lanjut</Button>
              </div>
            )}
          </div>

          <div className="w-full max-w-[440px] flex items-center justify-center gap-2">
            <Button onClick={togglePause} disabled={g.status === "ready" || g.status === "over"}>
              {g.status === "paused" ? (
                <Play size={12} className="inline" />
              ) : (
                <Pause size={12} className="inline" />
              )}
              <span className="ml-1.5">
                {g.status === "paused" ? "Lanjut" : "Jeda"}
              </span>
            </Button>
            <Button onClick={reset}>
              <RotateCcw size={12} className="inline" />
              <span className="ml-1.5">Ulang</span>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full max-w-[240px] md:hidden">
            <span />
            <PadButton label="Atas" onClick={() => turn(0, -1)}>
              &#9650;
            </PadButton>
            <span />
            <PadButton label="Kiri" onClick={() => turn(-1, 0)}>
              &#9664;
            </PadButton>
            <span />
            <PadButton label="Kanan" onClick={() => turn(1, 0)}>
              &#9654;
            </PadButton>
            <span />
            <PadButton label="Bawah" onClick={() => turn(0, 1)}>
              &#9660;
            </PadButton>
          </div>
        </div>
      </Window>
    </div>
  )
}

function PadButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="h-12 bg-[#E8EDF5] border border-dark shadow-[2px_2px_0_0_var(--color-dark)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-dark text-sm flex items-center justify-center transition-all"
    >
      {children}
    </button>
  )
}
