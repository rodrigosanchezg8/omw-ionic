import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Api} from "./Api";
import {User} from "../app/models/User";
import {ServiceRange} from "../app/models/ServiceRange";

@Injectable({
    providedIn: 'root'
})
export class DeliveryManProvider {

    constructor(public http: HttpClient, public api: Api) {
    }


    async getServiceRanges(): Promise<ServiceRange[]> {
        return await this.api.get('auth/delivery_man/service_ranges') as ServiceRange[];
    }

    async post(data: any) {
        return await this.api.post('auth/delivery_man', data)
    }

}
