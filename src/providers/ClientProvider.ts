import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Api} from "./Api";
import {User} from "../app/models/User";

@Injectable({
    providedIn: 'root'
})
export class ClientProvider {

    constructor(public http: HttpClient, public api: Api) {
    }

    signUp(client: User, others: any) {
        return this.api.post('auth/signup_client', {...client, ...others})
    }

}
