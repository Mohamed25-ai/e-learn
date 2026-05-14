// components/auth/SessionGuard.tsx
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/next-auth/nextauth.config";
import { redirect } from "next/navigation";

interface Props {
    locale: string;
}

export default async function CheckSession({ locale }: Props) {
    const session = await getServerSession(nextAuthConfig);

    if (session?.tokenError) {
        const reason = session.tokenErrorMessage ?? "SessionExpired";
        redirect(`/${locale}/login?reason=${reason}`);
    }

    return null;
}