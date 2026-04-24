import createMiddleware from "next-intl/middleware";
import { nextAuthConfig } from "./next-auth/nextauth.config";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";
import { getServerSession } from "next-auth";

const intlMiddleware = createMiddleware(routing);

const PROTECTED = ["/cart", "/courses", "/settings", "/createcourse", "/categories",
    "/create-course", "/profile", "/edit-password"];
const AUTH_PAGES = ["/login", "/confirmemail", "/forgot-password"];

export default async function proxy(req: NextRequest) {
    const cookieName = process.env.NODE_ENV === "production" ? '__Secure-next-auth.session-token' : 'next-auth.session-token';
    const { pathname } = req.nextUrl;
    const token = await getToken({ req, cookieName });
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
    const isProtected = PROTECTED.some((p) => restPath === p || restPath.startsWith(p));
    const isAuthPage = AUTH_PAGES.some((p) => restPath === p || restPath.startsWith(p));

    const isLoggedIn = !!token?.userToken;


    if (token?.error) {
        const response = NextResponse.redirect(new URL(`/${locale}/login?error=${token.tokenErrorMessage}`, req.url));
        response.cookies.delete('next-auth.session-token') || response.cookies.delete('__Secure-next-auth.session-token');
        return response;
    }

    // protected + logged in
    if (isLoggedIn && isProtected) {
        return intlMiddleware(req); // 👈 let intl handle it, not just next()
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
        // return NextResponse.rewrite(new URL(`/${locale}/404`, req.url));
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


// import createMiddleware from "next-intl/middleware";
// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { routing } from "./i18n/routing";

// const intlMiddleware = createMiddleware(routing);

// const PROTECTED = ["/cart", "/cources", "/settings"];
// const AUTH_PAGES = ["/login", "/confirmemail"];

// export default async function proxy(req: NextRequest) {
//     const { pathname } = req.nextUrl;

//     const segments = pathname.split("/").filter(Boolean);
//     const firstSegment = segments[0];
//     const restPath = "/" + segments.slice(1).join("/");

//     // 1) Locale guard (preserve full path)
//     if (!routing.locales.includes(firstSegment as typeof routing.locales[number])) {
//         return NextResponse.redirect(
//             new URL(`/${routing.defaultLocale}`, req.url)
//         );
//     }

//     const locale = firstSegment;

//     // 2) auth/protected checks
//     const isProtected = PROTECTED.some((p) => restPath.startsWith(p));
//     const isAuthPage =AUTH_PAGES.some((p) => restPath.startsWith(p));

//     const token = await getToken({ req });
//     const isLoggedIn = !!token?.userToken;

//     // 3) Not logged in + protected => localized login
//     if (isLoggedIn && isProtected) {
//         return NextResponse.next();
//     }
//     if (!isLoggedIn && isProtected) {
//         return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
//     }
//     if(isLoggedIn&&isAuthPage){
//         return NextResponse.redirect(new URL(`/${locale}`, req.url));
//     }
//     if(!isProtected){
//         if(restPath==='/'){
//             return intlMiddleware(req);
//         }
//         if(isAuthPage){
//         return NextResponse.next();
//         }
//         return NextResponse.rewrite(new URL(`/${locale}/404`, req.url));
//     }

//     // 4) Let next-intl handle the rest
//     return intlMiddleware(req);
// }

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
// };



// import createMiddleware from "next-intl/middleware";
// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { routing } from "./i18n/routing";
// const intlMiddleware = createMiddleware(routing);
// const PROTECTED = ["/cart", "/cources", "/settings"];
// const AUTH_PAGES = ["/login", "/confirmemail","/forgot-password"];
// export default async function proxy(req: NextRequest) {
//     const { pathname } = req.nextUrl;
//     const segments = pathname.split("/").filter(Boolean);

//     const firstSegment = segments[0];
//     const restPath = "/" + segments.slice(1).join("/");
//     if (!routing.locales.includes(firstSegment as typeof routing.locales[number])) {
//         const newUrl = new URL(`/${routing.defaultLocale}`, req.url);
//         return NextResponse.redirect(newUrl);
//     }

//     const locale = firstSegment;
//     const isProtected = PROTECTED.some((p) => restPath.startsWith(p));
//     const isAuthPage = AUTH_PAGES.some((p) => restPath.startsWith(p));
//     const token = await getToken({ req });
//     const isLoggedIn = !!token?.userToken;
//     if (isLoggedIn && isProtected) {
//         return intlMiddleware(req);
//     } else {
//         if (!isLoggedIn && isAuthPage) {
//             console.log('confirmemail',restPath)

//             if(restPath==='/confirmemail'){
//             return NextResponse.rewrite(new URL(`/${locale}/404`, req.url));
//             }
//             return NextResponse.next();
//         }
//         if (isLoggedIn && isAuthPage) {
//             const loginUrl = new URL(`/${locale}/`, req.url);
//             return NextResponse.redirect(loginUrl);
//         }
//         if (!isLoggedIn && isProtected) {
//             const loginUrl = new URL(`/${locale}/login`, req.url);
//             return NextResponse.redirect(loginUrl);
//         }
//         if (!isProtected) {
//             if (restPath === '/') {
//                 return intlMiddleware(req);
//             }
//             if (isAuthPage) {
//                 return NextResponse.next();
//             }
//             return NextResponse.rewrite(new URL(`/${locale}/404`, req.url));
//         }
//     }
//     return intlMiddleware(req);
// }
// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",],
// };