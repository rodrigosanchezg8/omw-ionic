import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Api} from "./Api";

@Injectable({
    providedIn: 'root'
})
export class AuthProvider {

    constructor(public http: HttpClient, public api: Api) {
    }

    validateUser(email, password) {
        return this.api.post('auth/login', {"email": email, "password": password});
    }

    updateFCMToken(id, token) {
        return this.api.put('fcm', {"fcm_token": token, 'user_id': id});
    }

    sendResetPasswordLink(email) {
        return this.api.post('api/password/forgot', {"email": email});
    }

}
