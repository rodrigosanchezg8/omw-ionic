import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {Delivery} from "../models/delivery";

@Injectable({
    providedIn: 'root'
})
export class DeliveryService {

    delivery: Delivery;

    constructor(public httpClient: HttpClient,
                public api: ApiService) {
    }

    async fetchOne(deliveryId: number): Promise<Delivery> {
        const fetchOne = await this.api.get(`{deliveries/${deliveryId}/show`) as any;
        return fetchOne.delivery as Delivery;
    }

    async fetchAll(): Promise<Delivery[]> {
        const fetchAll = await this.api.get('deliveries') as any;
        return fetchAll.list as Delivery[];
    }

    async store(delivery: Delivery) {
        return await this.api.post('deliveries', delivery) as any;
    }

    async update(delivery: Delivery) {
        return await this.api.put(`deliveries/${delivery.id}`, delivery) as any;
    }

}
