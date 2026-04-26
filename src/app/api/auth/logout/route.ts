import { NextResponse } from "next/server";


export async function GET() {
    const response = NextResponse.redirect('/login');
    response.cookies.delete('next-auth.session-token') || response.cookies.delete('__Secure-next-auth.session-token');
    return response
};