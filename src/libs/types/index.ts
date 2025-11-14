export type TUser = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
};

export type TTokenCheckResponse = {
  dataToken: {
    ID_User: string;
    role: string;
  };
  message?: string;
};
