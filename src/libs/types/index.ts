export type TUser = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
};

export type TItemCondition = "Baik" | "Rusak" | "Hilang";

export type TInventory = {
  id: string
  item_name: string
  quantity: number
  quantity_description: string
  category: TItemCondition
  location: string
  description: string
  image: string
  updated_by: string
  created_at: Date
  updated_at: Date
}

export type TTokenCheckResponse = {
  dataToken: {
    ID_User: string;
    role: string;
  };
  message?: string;
};
