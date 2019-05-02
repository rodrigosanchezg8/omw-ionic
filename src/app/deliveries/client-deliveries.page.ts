import {Component, OnInit} from '@angular/core';
import {DeliveryService} from "../../services/delivery.service";
import {Delivery} from "../../models/delivery";
import {environment} from "../../environments/environment.prod";
import {AlertController} from "@ionic/angular";
import {Loading} from "../../traits/loading";
import {ResponseService} from "../../services/response.service";
import {User} from "../../models/user";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'app-client-deliveries',
    templateUrl: './client-deliveries.page.html',
    styleUrls: ['./client-deliveries.page.scss'],
})
export class ClientDeliveriesPage implements OnInit {

    private deliverySubtitle: string;
    private origin: string;
    private status: string;
    private deliveries: Delivery[];
    private singlePendingDelivery: Delivery;
    private currentUser: User;

    private storageUrl = environment.storageUrl;

    constructor(private deliveryService: DeliveryService,
                private loading: Loading,
                private alertController: AlertController,
                private responses: ResponseService,
                private storage: Storage) {
    }

    async ngOnInit() {
        this.origin = 'receiver';
        this.status = 'Creando';
    }

    async ionViewWillEnter() {
        this.currentUser = await this.storage.get('user') as User;

        if (this.currentUser.role.name === 'admin') {
            this.deliverySubtitle = 'Entrega'
            this.origin = undefined;
        } else if (this.origin === 'receiver') {
            this.deliverySubtitle = 'Recibo de';
        } else if (this.origin === 'sender') {
            this.deliverySubtitle = 'Envio a';
        }

        await this.getDeliveries();
    }

    async segmentChanged(event: any) {
        if (this.currentUser.role.name !== 'client')
            return this.responses.presentResponse({message: 'Esta acción solo está disponible para clientes'});

        this.origin = event.detail.value;
        await this.getDeliveries();
    }

    async fetchByOriginStatus(status: string) {
        this.status = status;
        await this.getDeliveries();
    }

    async getDeliveries() {
        this.loading.present();

        if (this.currentUser.role.name === 'client') {
            this.deliveries = await this.deliveryService.fetchAllByOriginStatus(this.origin, this.status);
            this.loading.dismiss();
        } else if (this.currentUser.role.name === 'admin') {
            this.deliveries = await this.deliveryService.fetchAllByStatus(this.status);
            this.loading.dismiss();
        } else if (this.currentUser.role.name === 'delivery_man') {
            this.singlePendingDelivery = new Delivery();
            this.loading.dismiss();
        } else {
            this.responses.presentResponse({
                message: 'El rol del usuario no es correcto'
            });
        }
    }

    async remove(deliveryId: number) {
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
