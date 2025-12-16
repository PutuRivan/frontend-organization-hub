export type TStatus = "Aktif" | "Tidak_Aktif";

export type TUser = {
  id: string;
  nrp: string;
  name: string;
  email: string;
  image: string | null;
  jabatan: string;
  role: string;
  position: string;
  status?: TStatus;
  created_at: string;
  update_at: string;
  attendance: TAttandance;
};

export type TAttendanceStatus = "Hadir" | "Kurang";
export type TAttendanceAbsentReason = "Dinas" | "DIK" | "Izin" | "Cuti" | "Sakit" | "Hamil" | "BKO" | "TK" | "Terlambat";

export type TAttandance = {
  id: string;
  date: string;
  time_in: string | null;
  time_out: string | null;
  status: TAttendanceStatus;
  AbsentReason: TAttendanceAbsentReason;
  note: string | null;
  created_at: string;
  updated_at: string;
  user: TUser;
};

export type TItemCondition = "Baik" | "Rusak" | "Hilang";

export type TInventory = {
  id: string;
  item_name: string;
  quantity: number;
  quantity_description: string;
  category: TItemCondition;
  location: string;
  description: string;
  image: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
};

export type TEvent = {
  id: string;
  name: string;
  place: string;
  leader: string | null;
  category: string | null;
  dress_code: string | null;
  created_by: string;
  start_datetime: string | Date;
  end_datetime: string | Date;
};

export type TTokenCheckResponse = {
  dataToken: {
    ID_User: string;
    role: string;
  };
  message?: string;
};
