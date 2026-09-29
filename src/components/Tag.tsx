import React from "react"

type StatusType = "Selesai" | "Berjalan" | "Rencana"

interface TagProps {
  status: StatusType
}

export function Tag({ status }: TagProps) {
  let bgClass = "bg-[#E8EDF5]"
  let textClass = "text-dark"

  if (status === "Berjalan") {
    bgClass = "bg-accent"
  } else if (status === "Selesai") {
    bgClass = "bg-selected"
    textClass = "text-white"
  }

  return (
    <span
      className={`inline-block px-2 py-0.5 border border-dark font-mono text-[10px] uppercase font-bold shadow-[1px_1px_0_0_var(--color-dark)] ${bgClass} ${textClass}`}
    >
      {status}
    </span>
  )
}
