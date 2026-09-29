import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary"
}

export function Button({
  variant = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const isPrimary = variant === "primary"

  return (
    <button
      className={`
        px-4 py-1.5 font-mono text-xs uppercase font-semibold
        border border-dark shadow-[2px_2px_0_0_var(--color-dark)]
        active:shadow-[0px_0px_0_0_var(--color-dark)] active:translate-x-[2px] active:translate-y-[2px]
        transition-all
        ${
          isPrimary
            ? "bg-accent text-dark hover:bg-yellow-400"
            : "bg-[#E8EDF5] text-dark hover:bg-white"
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
