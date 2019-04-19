import {Role} from "./role";
import {Company} from "./company";
import {Location} from "./location";

export class User {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: number;
    password: string;
    status: boolean;
    profile_photo: string;
    birth_date: string;
    role: Role;
    company: Company;
    location: Location;

    constructor() {
        this.role = new Role();
        this.location = new Location();
    }

}
