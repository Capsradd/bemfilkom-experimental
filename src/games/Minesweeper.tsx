import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { Bomb, Flag, RefreshCw } from "lucide-react"
import { Window } from "../components/Window"
import { Button } from "../components/Button"
import { DesktopContext } from "../contexts/DesktopContext"
import {
  COLS,
  MINES,
  createBoard,
  reveal,
  toggleFlag,
  chord,
  type Board,
} from "../games/minesweeper"

const NUM_COLOR: Record<number, string> = {
  1: "text-[#1a4fd6]",
  2: "text-[#1d7a32]",
  3: "text-[#c62828]",
  4: "text-[#4a148c]",
  5: "text-[#8d3b00]",
  6: "text-[#00838f]",
  7: "text-black",
  8: "text-[#6b7280]",
}

export function Minesweeper() {
  const context = useContext(DesktopContext)
  const isOpen = context?.openWindows.includes("minesweeper-1") ?? true

  const boardRef = useRef<Board>(createBoard())
  const [tick, setTick] = useState(0)
  const [mode, setMode] = useState<"reveal" | "flag">("reveal")
  const [seconds, setSeconds] = useState(0)
  const forceRender = useCallback(() => setTick((t) => t + 1), [])

  const board = boardRef.current
  const finished = board.status === "won" || board.status === "lost"

  useEffect(() => {
    if (!isOpen || board.status !== "playing") return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, board.status])

  const act = useCallback(
    (index: number, viaChord: boolean) => {
      if (boardRef.current.status === "won" || boardRef.current.status === "lost") return
      const before = boardRef.current
      let next = before
      if (viaChord) next = chord(before, index)
      else if (mode === "flag") next = toggleFlag(before, index)
      else next = reveal(before, index)
      if (next === before) return
      boardRef.current = next
      forceRender()
    },
    [mode, forceRender],
  )

  const reset = useCallback(() => {
    boardRef.current = createBoard()
    setSeconds(0)
    setMode("reveal")
    forceRender()
  }, [forceRender])

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")

  return (
    <Window
      id="minesweeper-1"
      title="MINESWEEPER.EXE"
      icon={<Bomb size={14} />}
      className="w-[94%] md:w-[340px] pointer-events-auto"
    >
      <div className="p-3 bg-window-body flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 bg-[#060E20] border-2 border-dark px-2 py-1 font-mono text-sm font-bold text-accent tabular-nums">
            <Bomb size={12} />
            {String(MINES - board.flags).padStart(2, "0")}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMode((m) => (m === "flag" ? "reveal" : "flag"))}
              aria-label={mode === "flag" ? "Mode: tandai" : "Mode: buka"}
              className={`w-9 h-9 flex items-center justify-center border border-dark shadow-[2px_2px_0_0_var(--color-dark)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all ${
                mode === "flag" ? "bg-accent text-dark" : "bg-[#E8EDF5] text-dark"
              }`}
            >
              {mode === "flag" ? <Flag size={15} /> : <Bomb size={15} />}
            </button>
            <button
              type="button"
              onClick={reset}
              aria-label="Mulai ulang"
              className="w-9 h-9 flex items-center justify-center bg-[#E8EDF5] text-dark border border-dark shadow-[2px_2px_0_0_var(--color-dark)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <RefreshCw size={15} />
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-[#060E20] border-2 border-dark px-2 py-1 font-mono text-sm font-bold text-accent tabular-nums">
            {mm}:{ss}
          </div>
        </div>

        <div
          className="grid border-2 border-dark bg-[#C0C0C0] p-1 gap-px w-full"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        >
          {board.cells.map((cell, i) => {
            const content = cell.revealed
              ? cell.mine
                ? "mine"
                : cell.adjacent || "blank"
              : cell.flagged
                ? "flag"
                : "hidden"
            return (
              <button
                key={i}
                type="button"
                onClick={() => act(i, false)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  act(i, true)
                }}
                aria-label={`Kotak ${i + 1}`}
                className={`aspect-square flex items-center justify-center font-mono font-bold text-[13px] leading-none transition-colors ${
                  cell.revealed
                    ? "bg-[#C0C0C0] border border-[#8A8A8A]"
                    : "bg-[#E4E4E4] border border-white active:bg-[#BDBDBD]"
                }`}
              >
                {content === "mine" && <Bomb size={15} className="text-[#060E20]" />}
                {content === "flag" && <Flag size={15} className="text-[#c62828]" />}
                {content !== "mine" && content !== "flag" && content !== "hidden" && (
                  <span className={NUM_COLOR[cell.adjacent]}>
                    {cell.adjacent || ""}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="min-h-[18px] text-center font-mono text-[10px] uppercase font-bold">
          {board.status === "ready" && <span className="text-dark/60">Klik kotak untuk mulai</span>}
          {board.status === "playing" && mode === "flag" && (
            <span className="text-selected">Mode tandai</span>
          )}
          {board.status === "won" && <span className="text-[#1d7a32]">Menang! 🎉</span>}
          {board.status === "lost" && <span className="text-[#c62828]">Boom!</span>}
        </div>
      </div>
    </Window>
  )
}
