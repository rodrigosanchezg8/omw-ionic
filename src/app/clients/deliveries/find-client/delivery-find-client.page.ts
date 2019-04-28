import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {ClientService} from "../../../../services/client.service";
import {Responses} from "../../../../traits/responses";
import {MapService} from "../../../../services/map.service";
import {DeliveryService} from "../../../../services/delivery.service";
import {ActivatedRoute, Router} from "@angular/router";
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

    isEditMode = false;

    receiverClientEmail: string;

    constructor(private clientService: ClientService,
                private responses: Responses,
                private mapService: MapService,
                private deliveryService: DeliveryService,
                private router: Router,
                private loading: Loading,
                private storage: Storage,
                private activatedRoute: ActivatedRoute) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {

    }

    async ionViewWillEnter() {
        await this.instantiateDelivery();
    }

    async instantiateDelivery() {
        this.activatedRoute.params.subscribe(async ps => {

            if (ps.deliveryId) {

                if (!this.deliveryService.delivery || this.deliveryService.delivery.id !== Number(ps.deliveryId))
                    this.deliveryService.delivery = await this.deliveryService.fetchOne(ps.deliveryId) as Delivery;

                this.receiverClientEmail = this.deliveryService.delivery.receiver.email;
                await this.fetchClient();
                this.isEditMode = true;

            } else {
                this.deliveryService.delivery = new Delivery();
                const senderClient = await this.storage.get('user') as User;
                this.deliveryService.delivery.sender_id = senderClient.id;
            }
        });
    }

    async fetchClient() {

        this.loading.present();
        const clientRes = await this.clientService.fetchByEmail(this.receiverClientEmail) as any;
        this.loading.dismiss();
        if (clientRes.status === 'success') {
            let receiverClient = clientRes.client as User;
            this.deliveryService.delivery.receiver = receiverClient;
            this.deliveryService.delivery.receiver_id = receiverClient.id;

            if (receiverClient.location) {
                this.mapService.locationChanged(receiverClient.location.lat, receiverClient.location.lng)
            } else {
                this.responses.presentResponse({message: 'Éste cliente no tiene una localización registrada'});
                this.deliveryService.delivery.receiver_id = undefined;
                this.deliveryService.delivery.receiver = undefined;
            }
        } else {
            this.responses.presentResponse(clientRes);
            return;
        }
    }

    async createDelivery() {
        if (!this.isEditMode) {
            this.loading.present();
            const deliveryRes = await this.deliveryService.store(this.deliveryService.delivery) as any;
            this.deliveryService.delivery = deliveryRes.delivery as Delivery;

            this.loading.dismiss();

            if (deliveryRes.status === 'success') {
                return await this.router.navigate(['/clients/tabs/deliveries/send/products']);
            } else {
                this.responses.presentGenericalErrorResponse();
            }
        }
        return await this.router.navigate(['/clients/tabs/deliveries/send/products']);
    }

}
