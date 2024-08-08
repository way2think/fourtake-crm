import { Center } from './center.entity';
import { Role } from './role.entity';

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    username: string;
    email: string;
    is_active: boolean;
    is_logged_in: boolean;
    role: Role;
    address: string;
    center?: Center;
    created_at: string;
}
