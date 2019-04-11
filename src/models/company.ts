import {User} from "./user";
import {City} from "./city";

export class Company {
    id: number;
    user: User;
    user_id: number;
    name: string;
    description: string;
    city: City;
    city_id: number;
    profile_photo: string;
    status: boolean;
}
