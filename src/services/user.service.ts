import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {User} from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(public http: HttpClient, public api: ApiService) {
    }

    async getAll(role): Promise<User[]> {
        return await this.api.get('users' + '?role=' + role) as User[];
    }

    async get(userId): Promise<User> {
        return await this.api.get('users/' + userId) as User;
    }

    async signUp(user: User, others: any): Promise<any> {
        return await this.api.post('users', {...user, ...others})
    }

    async update(user: User, others: any): Promise<any> {
        return await this.api.put('users/' + user.id, {...user, ...others});
    }

    async delete(userId: number): Promise<any> {
        return await this.api.delete('users/' + userId);
    }

}
