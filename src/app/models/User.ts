import {Role} from "./Role";

export class User {
    first_name: string;
    last_name: string;
    email: string;
    phone: number;
    city_id: number;
    password: string;
    status: boolean;
    profile_image: string;
    birth_date: string;
    role: Role;
}
