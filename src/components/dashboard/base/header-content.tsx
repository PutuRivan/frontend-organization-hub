interface HeaderContentProps {
  title: string
  description: string
}

export default function HeaderContent({ title, description }: HeaderContentProps) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground">{description}
      </p>
    </div>
  )
}
