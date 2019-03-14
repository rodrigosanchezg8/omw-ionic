import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import {NavController} from "ionic-angular";

@Injectable({
    providedIn: 'root'
})
export class Api {

    guestHeaders: object;
    authHeaders: object;
    API: string;

    constructor(public http?: HttpClient,
                private nativeStorage?: NativeStorage,
                protected injector?: Injector) {
        this.API = "";
    }

    get(url) {
        return new Promise((resolve, reject) => {
            resolve(this.http.get(this.API + url));
        });
    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            resolve(this.http.post(this.API + url, data));
        });
    }

    put(url, data) {
        return new Promise((resolve, reject) => {
            resolve(this.http.put(this.API + url, data));
        });
    }

    delete(url) {
        return new Promise((resolve, reject) => {
            resolve(this.http.delete(this.API + url));
        });
    }

    get navCtrl(): NavController {
        return this.injector.get(NavController);
    }

}
