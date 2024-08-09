import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { jwtDecode } from 'jwt-decode';
import { isAccessDenied, normalizePathname, roleAccessMap } from './utils';

export async function middleware(request: NextRequest, response: NextResponse) {
    const session = await auth();

    // console.log('sess', session);
    const { pathname } = request.nextUrl;

    const accessToken = session?.user?.accessToken;

    if (!accessToken && !pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', request.url));
    } else if (accessToken && pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Normalize the pathname to remove any query parameters or trailing slashes

    if (accessToken) {
        const { role } = jwtDecode<{ role: string }>(accessToken);

        // Check if the pathname exists in the roleAccessMap and if the user's role is allowed

        // if (isAccessDenied(pathname, role)) {
        //     return NextResponse.redirect(new URL('/access-denied', request.url)); // Redirect to a 403 Forbidden page
        // }
        const normalizedPathname = normalizePathname(pathname);
        const allowedRoles = roleAccessMap[normalizedPathname as keyof typeof roleAccessMap];

        // console.log('isAcccessGranted', normalizedPathname, role, allowedRoles);

        if (allowedRoles && !allowedRoles.includes(role)) {
            return NextResponse.redirect(new URL('/access-denied', request.url)); // Redirect to a 403 Forbidden page
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
