import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Api} from "./api";

@Injectable({
    providedIn: 'root'
})
export class UserProvider {

    LOGIN = "login";
    BASE_URL = "users";

    constructor(public http: HttpClient, public api: Api) {
    }

    validateUser(email, password) {
        let userData = {"email": email, "password": password};
        return this.api.post(this.LOGIN, userData);
    }

    updateFCMToken(id, token) {
        let tokenData = {"fcm_token": token, 'user_id': id};
        let url = this.BASE_URL + "/fcm";
        return this.api.put(url, tokenData);
    }

    sendResetPasswordLink(email) {
        let forgotPasswordData = {"email": email};
        let url = this.BASE_URL = "api/password/forgot";
        return this.api.post(url, forgotPasswordData);
    }

}
