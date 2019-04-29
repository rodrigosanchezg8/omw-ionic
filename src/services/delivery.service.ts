import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {Delivery} from "../models/delivery";

@Injectable({
    providedIn: 'root'
})
export class DeliveryService {

    public delivery: Delivery;
    public statuses = {
        making: 'Creando',
        notAssigned: 'No Asignado',
        notStarted: 'No Iniciado',
        inProgress: 'En Progreso',
        finished: 'Entregado',
        cancelled: 'Cancelado'
    };

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

    async fetchAllByStatus(status: string): Promise<Delivery[]> {
        const fetch = await this.api.get(`deliveries?status=${status}`) as any;
        return fetch.list as Delivery[];
    }

    async store(delivery: Delivery) {
        return await this.api.post('deliveries', delivery) as any;
    }

    async update(deliveryId: number, data: any) {
        return await this.api.put(`deliveries/${deliveryId}`, data) as any;
    }

    async delete(deliveryId: number) {
        return await this.api.delete(`deliveries/${deliveryId}`) as any;
    }

    async changeStatus(deliveryId: number, targetStatus: string) {
        return await this.api.put(`deliveries/${deliveryId}/change_status`, {
            delivery_status: targetStatus
        })
    }

    async assign(deliveryId: number) {
        return await this.api.put(`deliveries/${deliveryId}/set_not_started_protocol`);
    }

    clientCanNotUpdate() {
        if (!this.delivery || !this.delivery.delivery_status)
            return false;

        return this.delivery.delivery_status.status !== this.statuses.making &&
            this.delivery.delivery_status.status !== this.statuses.notAssigned
    }

    clientCanConfirm() {
        if (!this.delivery)
            return false;

        return !this.delivery.delivery_status || this.delivery.delivery_status.status === this.statuses.making
    }

}
