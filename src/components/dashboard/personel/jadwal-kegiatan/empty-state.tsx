import { Calendar } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-200 mb-4">
        <Calendar className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        Tidak ada kegiatan yang dijadwalkan
      </h3>
      <p className="text-sm text-slate-600">
        Silakan ubah filter Anda atau periksa kembali nanti.
      </p>
    </div>
  );
}
