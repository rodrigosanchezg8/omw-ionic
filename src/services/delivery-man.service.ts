import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {ServiceRange} from "../app/models/service-range";
import {DeliveryManServiceOptions} from "../app/models/delivery-man-service-options";

@Injectable({
    providedIn: 'root'
})
export class DeliveryManService {

    constructor(public http: HttpClient, public api: ApiService) {
    }


    async getServiceRanges(): Promise<ServiceRange[]> {
        return await this.api.get('delivery_man/service_ranges') as ServiceRange[];
    }

    async post(data: any) {
        return await this.api.post('delivery_man', data)
    }

    async get(userId: number) {
        return await this.api.get('delivery_man/' + userId) as DeliveryManServiceOptions;
    }

}
