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

export const createInventory = z.object({
  name: z.string(),
  quantity: z.number(),
  quantity_description: z.string(),
  category: z.string(),
  location: z.string(),
  description: z.string().optional(),
  image: z.array(z.instanceof(File)).optional(),
})

export type TCreateInventory = z.infer<typeof createInventory>