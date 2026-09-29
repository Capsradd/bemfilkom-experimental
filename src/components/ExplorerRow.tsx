import React from "react"
import { Folder } from "lucide-react"

interface ExplorerRowProps {
  name: string
  description: string
  count: number
  onClick: () => void
}

export function ExplorerRow({
  name,
  description,
  count,
  onClick,
}: ExplorerRowProps) {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col md:flex-row md:items-center gap-1 md:gap-0 p-3 md:p-2 border-b border-dark/10 cursor-pointer active:bg-selected active:text-white hover:bg-selected hover:text-white transition-colors text-dark"
    >
      <div className="flex items-center gap-3 w-full md:w-1/4">
        <Folder
          size={18}
          className="text-selected group-hover:text-white shrink-0"
        />
        <span className="font-semibold text-sm">{name}</span>
      </div>
      <div className="flex-1 text-sm md:truncate md:px-4 opacity-80 group-hover:opacity-100">
        {description}
      </div>
      <div className="w-full md:w-32 md:text-right text-xs font-mono opacity-70">
        {count} anggota
      </div>
    </div>
  )
}
