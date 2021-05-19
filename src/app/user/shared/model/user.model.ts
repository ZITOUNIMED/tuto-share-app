import { Role } from './role.model';

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    roles: Role[];
    enable: boolean;
    email: string;
}
