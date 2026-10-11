interface Props {
  icon?: React.ReactNode
  title: string
  desc?: string
  action?: React.ReactNode
}

export default function EmptyState({ icon, title, desc, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-slate-700">{title}</h3>
      {desc && <p className="text-sm text-slate-500 mt-1 max-w-xs">{desc}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
