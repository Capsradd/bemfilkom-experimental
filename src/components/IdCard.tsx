import React from "react"

interface IdCardProps {
  name: string
  jabatan: string
  departemen: string
}

export function IdCard({ name, jabatan, departemen }: IdCardProps) {
  return (
    <div className="bg-white border border-dark rounded-sm p-3 shadow-[2px_2px_0_0_var(--color-dark)] flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--color-dark)] active:-translate-y-0.5">
      {/* Photo Placeholder - Navy Duotone style */}
      <div className="w-16 h-20 bg-titlebar border border-dark flex-shrink-0 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-titlebar mix-blend-multiply z-10"></div>
        <div className="w-full h-full opacity-50 flex flex-col items-center justify-end pb-2 gap-1">
          <div className="w-6 h-6 rounded-full bg-white"></div>
          <div className="w-10 h-6 bg-white rounded-t-lg"></div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <h3 className="font-heading font-bold text-lg leading-tight truncate text-dark">
          {name}
        </h3>
        <p className="font-mono text-[10px] uppercase font-bold text-selected mt-1 truncate">
          {jabatan}
        </p>
        <p className="font-body text-xs text-dark/70 mt-0.5 truncate">
          {departemen}
        </p>
      </div>
    </div>
  )
}
