import { Session, User } from 'next-auth';

interface UserAuth extends User {
    accessToken?: string;
}

interface SessionAuth extends Session {
    user?: UserAuth;
}

export type { UserAuth, SessionAuth };
