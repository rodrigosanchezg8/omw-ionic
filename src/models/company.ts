import {User} from "./user";
import {Location} from "./location";

export class Company {
    id: number;
    user: User;
    user_id: number;
    name: string;
    description: string;
    profile_photo: string;
    status: boolean;
    location: Location;

    constructor() {
        this.location = new Location();
    }
}
