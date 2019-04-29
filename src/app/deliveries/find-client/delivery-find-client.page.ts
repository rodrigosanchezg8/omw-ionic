import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {ClientService} from "../../../services/client.service";
import {ResponseService} from "../../../services/response.service";
import {MapService} from "../../../services/map.service";
import {DeliveryService} from "../../../services/delivery.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Delivery} from "../../../models/delivery";
import {Loading} from "../../../traits/loading";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'app-delivery-find-client',
    templateUrl: './delivery-find-client.page.html',
    styleUrls: ['./delivery-find-client.page.scss'],
})
export class DeliveryFindClientPage implements OnInit {

    receiverClientEmail: string;

    isEditMode = false;
    fetchedClient: User;

    currentUser: User;

    constructor(private clientService: ClientService,
                private responses: ResponseService,
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
        this.currentUser = await this.storage.get('user') as User;

        this.activatedRoute.params.subscribe(async ps => {
            if (ps.deliveryId && ps.deliveryId !== "undefined") {

                this.deliveryService.delivery = await this.deliveryService.fetchOne(ps.deliveryId) as Delivery;

                this.receiverClientEmail = this.deliveryService.delivery.receiver.email;
                await this.fetchClient();
                this.isEditMode = true;

            }

            if (this.deliveryService.delivery && ps.deliveryOrigin) {
                if (ps.deliveryOrigin === 'client') {
                    this.deliveryService.delivery.company_is_sending = 0;
                } else if (ps.deliveryOrigin === 'company') {
                    this.deliveryService.delivery.company_is_sending = 1;
                }
            }
        });
    }

    async fetchClient() {
        this.loading.present();
        const clientRes = await this.clientService.fetchByEmail(this.receiverClientEmail) as any;
        this.loading.dismiss();
        if (clientRes.status === 'success') {
            this.fetchedClient = clientRes.client as User;

            if (this.fetchedClient.location) {
                this.mapService.locationChanged(this.fetchedClient.location.lat, this.fetchedClient.location.lng)
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

    async saveNavigate() {
        this.loading.present();
        this.isEditMode ? await this.updateDelivery() : await this.storeDelivery();
        this.loading.dismiss();

        if (this.deliveryService.delivery && this.deliveryService.delivery.id)
            return this.router.navigate(['/clients/tabs/deliveries/send/products', {
                deliveryId: this.deliveryService.delivery.id
            }]);
        return this.responses.presentGenericalErrorResponse();
    }

    async storeDelivery() {
        if (!this.fetchedClient)
            return;

        this.deliveryService.delivery.receiver_id = this.fetchedClient.id;
        const deliveryRes = await this.deliveryService.store(this.deliveryService.delivery) as any;
        this.deliveryService.delivery = deliveryRes.delivery as Delivery;
    }

    async updateDelivery() {
        if (!this.fetchedClient || !this.deliveryService.delivery ||
            this.deliveryService.delivery.receiver_id === this.fetchedClient.id)
            return;

        const deliveryRes = await this.deliveryService.update(this.deliveryService.delivery.id, {
            receiver_id: this.fetchedClient.id
        });
        this.deliveryService.delivery = deliveryRes.delivery as Delivery;
    }

}
