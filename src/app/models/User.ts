import {Role} from "./Role";
import {City} from "./City";

export class User {
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: number;
    city: City;
    city_id: number;
    password: string;
    status: boolean;
    profile_image: string;
    birth_date: string;
    role: Role;
    profile_photo: string;

    constructor() {
        this.role = new Role();
    }
}
