import {Role} from "./role";
import {City} from "./city";
import {Company} from "./company";

export class User {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: number;
    city: City;
    city_id: number;
    password: string;
    status: boolean;
    profile_photo: string;
    birth_date: string;
    role: Role;
    company: Company;

    constructor() {
        this.role = new Role();
    }

}
