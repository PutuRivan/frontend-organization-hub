interface HeaderContentProps {
  title: string
  description: string
  children?: React.ReactNode // untuk button atau aksi lainnya
}

export default function HeaderContent({ title, description, children }: HeaderContentProps) {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Area untuk button/aksi tambahan */}
      {children && (
        <div className="w-full md:w-auto">
          {children}
        </div>
      )}
    </div>
  )
}
