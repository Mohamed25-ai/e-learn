import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const PROTECTED = ["/cart", "/courses", "/settings", "/createcourse", "/categories",
    "/createcourse", "/profile", "/edit-password", "/categorized-course"
    ,"/course-learn", "/become-instructor"];
const AUTH_PAGES = ["/login", "/confirmemail", "/forgot-password"];

export default async function proxy(req: NextRequest) {
    const cookieName = process.env.NODE_ENV === "production" ? '__Secure-next-auth.session-token' : 'next-auth.session-token';
    const { pathname } = req.nextUrl;
    const token = await getToken({ req, cookieName, secret: process.env.NEXTAUTH_SECRET });
    const segments = pathname.split("/").filter(Boolean);
    const firstSegment = segments[0];
    const restPath = "/" + segments.slice(1).join("/");
    // 👇 Fix: preserve full path when redirecting to default locale
    if (!routing.locales.includes(firstSegment as typeof routing.locales[number])) {
        return NextResponse.redirect(
            new URL(`/${routing.defaultLocale}`, req.url)
        );
    }
    const locale = firstSegment;
    const isProtected = PROTECTED.some(
        (p) => restPath === p || restPath.startsWith(`${p}/`));
    const isAuthPage = AUTH_PAGES.some((p) => restPath === p || restPath.startsWith(`${p}/`));
    const isLoggedIn = !!token?.token && !token?.error;

    // protected + logged in
    if (isLoggedIn && isProtected) {
        return intlMiddleware(req); //  let intl handle it, not just next()
    }
    // protected + not logged in
    if (!isLoggedIn && isProtected) {
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }
    // auth page + logged in
    if (isLoggedIn && isAuthPage) {
        return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
    // confirmemail without token
    if (!isLoggedIn && restPath === '/confirmemail') {
        return intlMiddleware(req);
    }
    // auth pages + not logged in
    if (!isLoggedIn && isAuthPage) {
        return intlMiddleware(req);
    }
    // known public routes => let intl handle
    // unknown routes => 404
    const PUBLIC_PAGES = ['/', '/home']; // 👈 add your public routes
    const isPublic = PUBLIC_PAGES.some((p) => restPath === p || restPath.startsWith(p));

    if (isPublic || restPath === '/') {
        return intlMiddleware(req);
    }

    return NextResponse.rewrite(new URL(`/${locale}/404`, req.url));
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",],
};

