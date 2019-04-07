import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Storage} from "@ionic/storage";
import {NavController} from "ionic-angular";
import {Responses} from "../traits/responses";
import {environment} from "../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    headers: any;
    API: string;

    constructor(
        private responses: Responses,
        private storage: Storage,
        public http?: HttpClient,
        protected injector?: Injector) {
        this.API = environment.apiUrl;
    }

    async getHeaders() {
        if (await this.storage.get('authorization'))
            return this.headers = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': await this.storage.get('authorization')
                })
            };
        return this.headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
    }

    async get(url): Promise<any> {
        try {
            return await (this.http.get(this.API + url, await this.getHeaders()).toPromise());
        } catch (e) {
            if (e.status === 422)
                return e;
            this.responses.presentGenericalErrorResponse();
        }
    }

    async post(url, data): Promise<any> {
        try {
            return await (this.http.post(this.API + url, data, await this.getHeaders()).toPromise());
        } catch (e) {
            if (e.status === 422 || e.status === 400)
                return e;
            this.responses.presentGenericalErrorResponse();
        }
    }

    async put(url, data): Promise<any> {
        try {
            return await (this.http.put(this.API + url, data, await this.getHeaders()).toPromise());
        } catch (e) {
            if (e.status === 422)
                return e;
            this.responses.presentGenericalErrorResponse();
        }
    }

    async delete(url): Promise<any> {
        try {
            return await (this.http.delete(this.API + url, await this.getHeaders()).toPromise());
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
