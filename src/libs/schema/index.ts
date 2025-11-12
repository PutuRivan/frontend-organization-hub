import z from "zod/v3";

export const userLoginSchema = z.object({
  email: z.string().min(2, {
    message: "Email",
  }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export type TUserLoginSchema = z.infer<typeof userLoginSchema>;