export type TStatus = "Aktif" | "Tidak_Aktif";

export type TUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  jabatan: string;
  role: string;
  position: string;
  status?: TStatus;
  created_at: string;
  update_at: string;
};

export type TAttendanceStatus = "Hadir" | "Izin" | "Alfa" | "Sakit";

export type TAttandance = {
  id: string;
  date: string;
  time_in: string | null;
  time_out: string | null;
  status: TAttendanceStatus;
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
  leader: string;
  category: string;
  dress_code: string;
  start_datetime: string;
  end_datetime: string;
};

export type TTokenCheckResponse = {
  dataToken: {
    ID_User: string;
    role: string;
  };
  message?: string;
};
