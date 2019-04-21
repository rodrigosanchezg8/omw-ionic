import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {ServiceRange} from "../models/service-range";
import {DeliveryMan} from "../models/delivery-man";

@Injectable({
    providedIn: 'root'
})
export class DeliveryManService {

    constructor(public http: HttpClient, public api: ApiService) {
    }


    async getServiceRanges(): Promise<ServiceRange[]> {
        return await this.api.get('delivery_men/service_ranges') as ServiceRange[];
    }

    async post(data: any) {
        return await this.api.post('delivery_men', data)
    }

    async get(userId: number) {
        return await this.api.get('delivery_men/' + userId + '/show') as DeliveryMan;
    }

}
