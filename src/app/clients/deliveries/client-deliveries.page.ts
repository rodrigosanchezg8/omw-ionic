import {Component, OnInit} from '@angular/core';
import {DeliveryService} from "../../../services/delivery.service";
import {Delivery} from "../../../models/delivery";
import {environment} from "../../../environments/environment.prod";
import {AlertController, LoadingController} from "@ionic/angular";
import {Loading} from "../../../traits/loading";
import {Responses} from "../../../traits/responses";

@Component({
    selector: 'app-client-deliveries',
    templateUrl: './client-deliveries.page.html',
    styleUrls: ['./client-deliveries.page.scss'],
})
export class ClientDeliveriesPage implements OnInit {

    private origin: string;
    private status: string;
    private deliveries: Delivery[];

    private storageUrl = environment.storageUrl;

    constructor(private deliveryService: DeliveryService,
                private loading: Loading,
                private alertController: AlertController,
                private responses: Responses) {
    }

    ngOnInit() {
        this.origin = 'receiver';
        this.status = 'Creando';
    }

    async ionViewWillEnter() {
        await this.getDeliveries();
    }

    async segmentChanged(event: any) {
        this.origin = event.detail.value;
        await this.getDeliveries();
    }

    async fetchByOriginStatus(status: string) {
        this.status = status;
        await this.getDeliveries();
    }

    async getDeliveries() {
        this.loading.present();
        this.deliveries = await this.deliveryService.fetchAllByOriginStatus(this.origin, this.status);
        this.loading.dismiss();
    }

    async delete(deliveryId: number) {
        const alert = await this.alertController.create({
            header: 'Confirmar',
            message: '¿Estás seguro de borrar esta entrega?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Sí',
                    handler: async () => {
                        this.loading.present();
                        const deliveryRes = await this.deliveryService.delete(deliveryId);
                        this.loading.dismiss();

                        this.responses.presentResponse(deliveryRes);

                        if (deliveryRes.header) {
                            const index = this.deliveries.findIndex(delivery => delivery.id === deliveryId);
                            this.deliveries.splice(index, 1);
                        }
                    }
                }
            ]
        });
        alert.present();
    }

}
