import * as z from 'zod'

export const loginSchema = z.object({
    Email: z
        .email("Invalid email address").nonempty("Email  Is Required"),
    Password: z
        .string().nonempty("Password  Is Required")
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password is too long")
        .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
        .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
        .regex(/[0-9]/, "Password must contain at least 1 number"),
});
export type LoginFormType=z.infer<typeof loginSchema>;