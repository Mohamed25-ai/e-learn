// lib/auth.helper.ts
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/next-auth/nextauth.config";
import { redirect } from "next/navigation";

export async function requireSession(requiredRole?: string) {
    const session = await getServerSession(nextAuthConfig);

    if (!session) redirect("/login");
    if (session.tokenError) redirect(`/login?error=${session.tokenErrorMessage}`);

    if (requiredRole && !session.userRole?.includes(requiredRole)) {
        redirect("/unauthorized");
    }

    return session;
}
