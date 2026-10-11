interface Props {
  initials: string
  size?: "sm" | "md" | "lg" | "xl"
  color?: string
}

const sizes = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-20 h-20 text-2xl",
}

export default function Avatar({
  initials,
  size = "md",
  color = "bg-indigo-100 text-indigo-700",
}: Props) {
  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold flex-shrink-0 ${sizes[size]} ${color}`}
    >
      {initials}
    </div>
  )
}
