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
  quantity: z.coerce.number().min(1, "Quantity harus lebih dari 0"),
  quantity_description: z.string(),
  category: z.string(),
  location: z.string(),
  description: z.string().optional(),
  image: z.array(z.instanceof(File)).optional(),
});

export type TCreateInventory = z.infer<typeof createInventory>;

export const attendanceSchema = z.object({
  attendanceType: z.enum(["present", "permission", "sick", "alfa"], {
    required_error: "Pilih jenis absensi",
  }),
  remarks: z.string().optional(),
});

export type TAttendanceSchema = z.infer<typeof attendanceSchema>;