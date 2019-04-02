import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {ServideRange} from "../app/models/servide-range";

@Injectable({
    providedIn: 'root'
})
export class DeliveryManService {

    constructor(public http: HttpClient, public api: ApiService) {
    }


    async getServiceRanges(): Promise<ServideRange[]> {
        return await this.api.get('auth/delivery_man/service_ranges') as ServideRange[];
    }

    async post(data: any) {
        return await this.api.post('auth/delivery_man', data)
    }

}
