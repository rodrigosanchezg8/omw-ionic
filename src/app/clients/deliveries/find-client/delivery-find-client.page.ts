import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {ClientService} from "../../../../services/client.service";
import {Responses} from "../../../../traits/responses";
import {MapService} from "../../../../services/map.service";
import {DeliveryService} from "../../../../services/delivery.service";
import {Router} from "@angular/router";
import {Delivery} from "../../../../models/delivery";
import {Loading} from "../../../../traits/loading";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'app-delivery-find-client',
    templateUrl: './delivery-find-client.page.html',
    styleUrls: ['./delivery-find-client.page.scss'],
})
export class DeliveryFindClientPage implements OnInit {

    delivery: Delivery;

    receiverClient: User;
    senderClient: User;

    receiverClientEmail: string;

    constructor(private clientService: ClientService,
                private responses: Responses,
                private mapService: MapService,
                private deliveryService: DeliveryService,
                private router: Router,
                private loading: Loading,
                private storage: Storage) {
    }

    async ngOnInit() {
        this.senderClient = await this.storage.get('user') as User;

        this.deliveryService.delivery = new Delivery();
        this.deliveryService.delivery.sender_id = this.senderClient.id;
    }

    async fetchClient() {
        this.loading.present();
        const clientRes = await this.clientService.fetchByEmail(this.receiverClientEmail) as any;
        this.loading.dismiss();
        if (clientRes.status === 'success') {
            this.receiverClient = clientRes.client as User;
            this.deliveryService.delivery.receiver_id = this.receiverClient.id;

            if (this.receiverClient.location) {
                this.mapService.locationChanged(this.receiverClient.location.lat,
                    this.receiverClient.location.lng)
            } else {
                this.responses.presentResponse({message: 'Éste cliente no tiene una localización registrada'});
                this.receiverClient = undefined;
            }
        } else {
            this.responses.presentResponse(clientRes);
            return;
        }
    }

    async createDelivery() {
        this.loading.present();
        const deliveryRes = await this.deliveryService.store(this.deliveryService.delivery) as any;
        this.deliveryService.delivery = deliveryRes.delivery as Delivery;

        this.loading.dismiss();
        if (deliveryRes.status === 'success') {
            await this.router.navigateByUrl('/clients/tabs/deliveries/send/products');
        } else {
            this.responses.presentGenericalErrorResponse();
        }
    }

}
