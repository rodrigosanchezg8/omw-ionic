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
        const fetchOne = await this.api.get(`deliveries/${deliveryId}/show`) as any;
        return fetchOne.delivery as Delivery;
    }

    async fetchAllByOriginStatus(origin: string, status: string): Promise<Delivery[]> {
        const fetch = await this.api.get(`deliveries?origin=${origin}&status=${status}`) as any;
        return fetch.list as Delivery[];
    }

    async store(delivery: Delivery) {
        return await this.api.post('deliveries', delivery) as any;
    }

    async update(delivery: Delivery) {
        return await this.api.put(`deliveries/${delivery.id}`, delivery) as any;
    }

    async delete(deliveryId: number) {
        return await this.api.delete(`deliveries/${deliveryId}`) as any;
    }

    async changeStatus(deliveryId: number, targetStatus: string) {
        return await this.api.put(`deliveries/${deliveryId}/change_status`, {
            delivery_status: targetStatus
        })
    }

}
