import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(public http: HttpClient, public api: ApiService) {
    }

}
