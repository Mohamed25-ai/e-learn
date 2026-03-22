
import * as z from 'zod'


const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const registerSchema = z
    .object({
        FullName: z
            .string().nonempty("Full Name Is Required")
            .min(3, "Full name must be at least 3 characters")
            .max(80, "Full name is too long"),

        UserName: z
            .string().nonempty("User Name Is Required")
            .min(3, "Username must be at least 3 characters")
            .max(30, "Username is too long")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscore"),

        Email: z
            .email("Invalid email address").nonempty("Email  Is Required"),

        Password: z
            .string().nonempty("Password  Is Required")
            .min(8, "Password must be at least 8 characters")
            .max(64, "Password is too long")
            .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
            .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
            .regex(/[0-9]/, "Password must contain at least 1 number"),

        ConfirmPassword: z.string().nonempty("Confirm Password  Is Required"),
        ProfilePicture: z.instanceof(File).nullable().optional(),
    })
    .refine(
        (zoddata) => {
            return zoddata.Password === zoddata.ConfirmPassword;
        },
        {
            message: "Passwords do not match",
            path: ["ConfirmPassword"],
        }
    );

export type RegisterFormValues = z.infer<typeof registerSchema>;