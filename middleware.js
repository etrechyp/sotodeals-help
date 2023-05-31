import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    const JWT = request.cookies.get('token')

    if(JWT === undefined) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    try {
        await jwtVerify(JWT.value, new TextEncoder().encode(process.env.SECRET))
        return NextResponse.next()
    } catch(err) {
        console.error(err)
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/']
}