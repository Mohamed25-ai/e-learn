import * as z from 'zod'

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

export type LoginFormType=z.infer<ReturnType<typeof loginSchema>>;