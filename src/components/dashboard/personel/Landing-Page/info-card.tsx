import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ClipboardList, Calendar } from "lucide-react"

export function InfoCards() {
  const cards = [
    {
      title: "Profil Pengguna",
      icon: "👤",
      details: [{ label: "Nama Pengguna ID:", value: "123456789" }],
    },
    {
      title: "Status Kehadiran",
      icon: <CheckCircle2 className="w-12 h-12 text-green-500" />,
      details: [
        { label: "Sudah Absen Masuk", value: "" },
        { label: "Pukul 08:00 WIB", value: "" },
      ],
    },
    {
      title: "Inventaris Dipinjam",
      icon: <ClipboardList className="w-12 h-12 text-yellow-500" />,
      details: [{ label: "3 Barang", value: "" }],
    },
    {
      title: "Jadwal Terdekat",
      icon: <Calendar className="w-12 h-12 text-blue-500" />,
      details: [{ label: "Rapat Koordinasi 10:00 WIB", value: "" }],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <Card key={idx} className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
              {typeof card.icon === "string" ? <div className="text-4xl">{card.icon}</div> : <div>{card.icon}</div>}
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            {card.details.map((detail, detailIdx) => (
              <div key={detailIdx} className="text-sm">
                {detail.value ? (
                  <>
                    <p className="text-muted-foreground">{detail.label}</p>
                    <p className="font-medium text-foreground">{detail.value}</p>
                  </>
                ) : (
                  <p className="text-muted-foreground">{detail.label}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
