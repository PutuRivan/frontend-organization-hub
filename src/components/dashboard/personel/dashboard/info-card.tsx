import { Calendar, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TEvent, TUser } from "@/libs/types";
import { formatDateTime } from '@/libs/utils';

interface InfoCardsProps {
  user: TUser | null;
  events: TEvent | null;
}

export function InfoCards({ user, events }: InfoCardsProps) {
  const cards = [
    {
      title: "Profil Pengguna",
      icon: "👤",
      details: [{
        label: "Nama Pengguna ID:",
        value: user?.nrp ?? ""
      }],
    },
    {
      title: "Status Kehadiran",
      icon: <CheckCircle2 className="w-12 h-12 text-green-500" />,
      details: [
        { label: user?.attendance ? "Absen" : "Tidak Hadir", value: `${formatDateTime(user?.attendance?.time_in ?? "", "TIME")} - ${formatDateTime(user?.attendance?.time_out ?? "", "TIME")}` },
        { label: user?.attendance?.absent_reason ? "Keterangan" : "", value: user?.attendance?.absent_reason ?? "" },
      ],
    },
    {
      title: "Jadwal Terdekat",
      icon: <Calendar className="w-12 h-12 text-blue-500" />,
      details: [{ label: events?.name ?? "", value: events?.start_datetime ?? "" }],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
      {cards.map((card, idx) => (
        <Card key={idx} className="border border-border">
          <CardHeader className="">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg font-semibold">
                {card.title}
              </CardTitle>
              {typeof card.icon === "string" ? (
                <div className="text-4xl">{card.icon}</div>
              ) : (
                <div>{card.icon}</div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {card.details.map((detail, detailIdx) => (
              <div key={detailIdx} className="text-sm">
                {detail.value ? (
                  <>
                    <p className="text-muted-foreground">{detail.label}</p>
                    <p className="font-medium text-foreground">
                      {detail.value}
                    </p>
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
  );
}
