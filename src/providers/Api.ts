import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import {NavController} from "ionic-angular";
import {Responses} from "../app/traits/Responses";

@Injectable({
    providedIn: 'root'
})
export class Api {

    guestHeaders: object;
    authHeaders: object;
    API: string;

    constructor(
        private responses: Responses,
        public http?: HttpClient,
        private nativeStorage?: NativeStorage,
        protected injector?: Injector) {
        this.API = "http://192.168.1.127:8000/api/";
    }

    async get(url): Promise<any> {
        try {
            return await (this.http.get(this.API + url).toPromise());
        } catch (e) {
            if (e.status === 422)
                return e;
            this.responses.presentGenericalErrorResponse();
        }
    }

    async post(url, data): Promise<any> {
        try {
            return await (this.http.post(this.API + url, data).toPromise());
        } catch (e) {
            if (e.status === 422 || e.status === 400)
                return e;
            this.responses.presentGenericalErrorResponse();
        }
    }

    async put(url, data): Promise<any> {
        try {
            return await (this.http.put(this.API + url, data).toPromise());
        } catch (e) {
            if (e.status === 422)
                return e;
            this.responses.presentGenericalErrorResponse();
        }
    }

    async delete(url): Promise<any> {
        try {
            return await (this.http.delete(this.API + url).toPromise());
        } catch (e) {
            if (e.status === 422)
                return e;
            this.responses.presentGenericalErrorResponse();
        }
    }

    get navCtrl(): NavController {
        return this.injector.get(NavController);
    }

}
