
import * as z from 'zod'


const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
type TFunction = (key: string, values?: Record<string, any>) => string;

export const loginSchema = (t: TFunction) =>
    z.object({
        Email: z
            .email(t("errors.email.invalid"))
            .nonempty(t("errors.email.required")),

        Password: z
            .string()
            .nonempty(t("errors.password.required"))
            .min(8, t("errors.password.minLength", { min: 8 }))
            .max(64, "Password is too long")
            .regex(/[A-Z]/, t("errors.password.uppercase"))
            .regex(/[a-z]/, t("errors.password.lowercase"))
            .regex(/[0-9]/, t("errors.password.digit")),
    });

export const registerSchema = (t: TFunction) =>
    z
        .object({
            FullName: z
                .string()
                .nonempty(t("errors.fullName.required"))
                .min(3, t("errors.fullName.tooShort"))
                .max(80, "Full name is too long"),

            UserName: z
                .string()
                .nonempty(t("errors.userName.required"))
                .min(3, t("errors.userName.tooShort"))
                .max(30, "Username is too long")
                .regex(/^[a-zA-Z0-9_]+$/, t("errors.userName.invalid")),

            Email: z
                .email(t("errors.email.invalid"))
                .nonempty(t("errors.email.required")),

            Password: z
                .string()
                .nonempty(t("errors.password.required"))
                .min(8, t("errors.password.minLength", { min: 8 }))
                .max(64, "Password is too long")
                .regex(/[A-Z]/, t("errors.password.uppercase"))
                .regex(/[a-z]/, t("errors.password.lowercase"))
                .regex(/[0-9]/, t("errors.password.digit")),

            ConfirmPassword: z
                .string()
                .nonempty(t("errors.confirmPassword.required")),

            ProfilePicture: z.instanceof(File).nullable().optional(),
        })
        .refine(
            (zoddata) => {
                return zoddata.Password === zoddata.ConfirmPassword;
            },
            {
                message: t("errors.confirmPassword.mismatch"),
                path: ["ConfirmPassword"],
            }
        );
export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;