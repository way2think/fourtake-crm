import { parse } from 'cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import NextAuth, { CredentialsSignin } from 'next-auth';
// import { JWT } from 'next-auth/jwt';
import { signOut as nextAuthSignOut } from 'next-auth/react';
import { cookies } from 'next/headers';

class InvalidLoginError extends CredentialsSignin {
    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

class AlreadyLoggedInError extends CredentialsSignin {
    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

class CustomError extends CredentialsSignin {
    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

interface CustomUser {
    id: string;
    username: string;
    access_token: string;
    role: string;
    // Add any other fields you expect
}

export async function signOut() {
    // console.log('signout');
    try {
        // Call your backend API to log out
        const response = await fetch(`${process.env.API_BASE_URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include', // This is important to include cookies
        });

        if (response.ok) {
            // Call NextAuth's signOut to clear the session on the frontend
            const res = await nextAuthSignOut();
            console.log('res', res);
        } else {
            console.error('Failed to sign out from backend');
            return false;
        }
    } catch (error) {
        console.error('Error during sign out:', error);
        return false;
    }
}

export const { handlers, auth, signIn } = NextAuth({
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            // console.log('user', user);
            // console.log('token', token);
            const customUser = user as CustomUser;
            if (customUser) {
                token.accessToken = customUser.access_token;
                // // We don't store the refresh token in the JWT
                // // as it's in an HTTP-only cookie
                // token.refreshToken = user.refresh_token;
            }

            // Check if the access token is expired
            if (token.accessToken) {
                const decodedToken = jwtDecode(token.accessToken as string) as JwtPayload;
                // console.log('check refresh', decodedToken);
                if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
                    // console.log('Token is expired, try to refresh', decodedToken.exp * 1000 < Date.now());
                    // Token is expired, try to refresh
                    try {
                        // console.log(cookies().get('jwt-refresh-token')?.value);
                        const response = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
                            method: 'GET',
                            credentials: 'include', // This is important to include cookies
                            headers: {
                                Cookie: `jwt-refresh-token=${cookies().get('jwt-refresh-token')?.value}`,
                            },
                        });

                        console.log('refresh: ', response.status, response.statusText);

                        if (response.ok) {
                            console.log('refresh1: ', response.ok);
                            const refreshedTokens = await response.json();
                            token.accessToken = refreshedTokens.access_token;
                        } else {
                            // If refresh fails, clear the token
                            console.log('refresh2: ', response.ok);
                            return null;
                        }
                    } catch (error) {
                        console.error('Failed to refresh token', error);
                        return null;
                    }
                }
            }

            return token;
        },
        async session({ session, token }) {
            // console.log('token-sess', session, token);
            session.user.accessToken = token.accessToken;

            // const decodedToken = jwtDecode(token.accessToken as string) as JwtPayload;
            // console.log('doec', decodedToken);
            if (token?.sub) session.user.id = token?.sub;

            return session;
        },
    },
    providers: [
        {
            id: 'local',
            name: 'NestJS',
            type: 'credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
                type: { label: 'type', type: 'text' },
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.API_BASE_URL}/auth/local/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', // This is important to include cookies
                });

                // console.log('auth-res-headers', res.headers, res.headers.get('set-cookie'));
                // const apiCookies = res.headers.getSetCookie();
                // console.log('auth-res', apiCookies);

                // if (apiCookies && apiCookies.length > 0) {
                //     apiCookies.forEach((cookie) => {

                //     });
                // }
                const cookie = res.headers.get('set-cookie');
                if (cookie) {
                    const parsedCookie = parse(cookie);
                    const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];
                    const httpOnly = cookie.includes('HttpOnly;') || cookie.includes('httponly;');

                    // console.log('parse', parsedCookie, cookieName, cookieValue, httpOnly);
                    // cookies().set({
                    //     // name: cookieName,
                    //     // value: cookieValue,
                    //     // httpOnly: httpOnly,
                    //     // maxAge: parseInt(parsedCookie['Max-Age']),
                    //     // path: parsedCookie.path,
                    //     // sameSite: parsedCookie.samesite,
                    //     // expires: new Date(parsedCookie.expires),
                    //     // secure: true,
                    // });

                    cookies().set({
                        name: cookieName,
                        value: cookieValue,
                        httpOnly: httpOnly,
                        path: parsedCookie.Path || parsedCookie.path,
                        sameSite: 'strict',
                        // secure: true,
                        // maxAge: parseInt(parsedCookie['Max-Age']),
                        // expires: new Date(parsedCookie.expires),
                    });
                }

                const user = await res.json();

                if (res.ok && user) {
                    return user;
                } else {
                    console.log('res.ok', user);
                    // throw new Error(user.message || 'Authentication failed');
                    if (user.statusCode === 409) {
                        // conflict
                        throw new AlreadyLoggedInError(user.message, user.message);
                    } else if (user.statusCode === 400) {
                        // conflict
                        throw new InvalidLoginError(user.message || 'Invalid identifier or password', 'Invalid Credentials');
                    } else {
                        throw new CustomError(user.error, user.message);
                    }
                    // return { error: user.message };
                }

                // return null;
            },
        },
    ],
});
