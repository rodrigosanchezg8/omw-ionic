import {Injectable} from '@angular/core';
import {Message} from "../models/message";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';

@Injectable({
    providedIn: 'root'
})
export class DeliveryMessagesService {

    public messages: Message[] = [];

    constructor(public httpClient: HttpClient, public api: ApiService) {
    }

    async requestByDelivery(deliveryId: number) {
        return Observable.of(this.api.get(`messages/delivery/${deliveryId}/start/1`));
    }

    async store(deliveryId: number, message: Message) {
        return await this.api.post(`messages/delivery/${deliveryId}`, message);
    }

}
