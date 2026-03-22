import { NextResponse } from "next/server";


export  async  function GET() {
    const response = NextResponse.rewrite('/login');
     response.cookies.delete('next-auth.session-token');
    return response
}