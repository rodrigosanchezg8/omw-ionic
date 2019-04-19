import {User} from "./user";

export class Company {
    id: number;
    user: User;
    user_id: number;
    name: string;
    description: string;
    profile_photo: string;
    status: boolean;
}
