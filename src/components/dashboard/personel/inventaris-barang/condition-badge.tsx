interface ConditionBadgeProps {
  condition: "Baik" | "Perlu Perbaikan" | "Rusak"
}

const getConditionColor = (condition: string) => {
  switch (condition) {
    case "Baik":
      return "bg-green-100 text-green-800"
    case "Perlu Perbaikan":
      return "bg-yellow-100 text-yellow-800"
    case "Rusak":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ConditionBadge({ condition }: ConditionBadgeProps) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 font-medium ${getConditionColor(condition)}`}>
      {condition}
    </span>
  )
}
