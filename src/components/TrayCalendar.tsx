import React, { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MONTHS, WEEKDAYS_SHORT, isSameDay } from "../lib/tanggal"

const buildGrid = (view: Date) => {
  const year = view.getFullYear()
  const month = view.getMonth()
  const startWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()

  return Array.from({ length: 42 }, (_, i) => {
    const day = i - startWeekday + 1
    if (day < 1) {
      const d = daysInPrev + day
      return { day: d, inMonth: false, date: new Date(year, month - 1, d) }
    }
    if (day > daysInMonth) {
      const d = day - daysInMonth
      return { day: d, inMonth: false, date: new Date(year, month + 1, d) }
    }
    return { day, inMonth: true, date: new Date(year, month, day) }
  })
}

export function TrayCalendar({ today }: { today: Date }) {
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  )
  const [picked, setPicked] = useState<string | null>(null)

  const monthKey = `${today.getFullYear()}-${today.getMonth()}`

  useEffect(() => {
    const [year, month] = monthKey.split("-").map(Number)
    setCursor(new Date(year, month, 1))
  }, [monthKey])

  const shift = (delta: number) =>
    setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1))

  return (
    <div className="absolute bottom-full right-0 mb-1 w-[248px] bg-[#F4F7FB] border-2 border-dark shadow-[4px_4px_0_0_var(--color-dark)] p-2 z-[60]">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          aria-label="Bulan sebelumnya"
          onClick={() => shift(-1)}
          className="w-6 h-6 flex items-center justify-center bg-[#E8EDF5] border border-dark shadow-[1px_1px_0_0_var(--color-dark)] active:translate-y-px transition-all"
        >
          <ChevronLeft size={13} />
        </button>
        <p className="font-mono text-[11px] uppercase font-bold text-dark">
          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
        </p>
        <button
          type="button"
          aria-label="Bulan berikutnya"
          onClick={() => shift(1)}
          className="w-6 h-6 flex items-center justify-center bg-[#E8EDF5] border border-dark shadow-[1px_1px_0_0_var(--color-dark)] active:translate-y-px transition-all"
        >
          <ChevronRight size={13} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px mb-1">
        {WEEKDAYS_SHORT.map((d) => (
          <span
            key={d}
            className="text-center font-mono text-[8px] uppercase font-bold text-dark/50"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px">
        {buildGrid(cursor).map((cell, i) => {
          const isToday = isSameDay(cell.date, today)
          const isPicked = picked === cell.date.toDateString()
          return (
            <button
              key={i}
              type="button"
              onClick={() => setPicked(cell.date.toDateString())}
              className={`aspect-square flex items-center justify-center font-mono text-[10px] border transition-colors ${
                isPicked
                  ? "bg-selected text-white border-selected"
                  : isToday
                    ? "bg-[#C0392B] text-white border-[#C0392B] font-bold"
                    : `border-transparent ${
                        cell.inMonth ? "text-dark" : "text-dark/25"
                      }`
              }`}
            >
              {cell.day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
