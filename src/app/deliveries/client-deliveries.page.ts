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

    private origin: string;
    private status: string;
    public deliverySubtitle = '';
    private singlePendingDelivery: Delivery;
    public deliveries: Delivery[];
    public currentUser: User;

    private storageUrl = environment.storageUrl;

    constructor(private deliveryService: DeliveryService,
                private loading: Loading,
                private alertController: AlertController,
                private responses: ResponseService,
                private storage: Storage) {
    }

    async ngOnInit() {
        this.currentUser = await this.storage.get('user') as User;
        if (!this.currentUser.role)
            this.responses.presentResponse({message: 'El usuario no tiene un rol'});
        else {
            if (this.currentUser.role.name === 'admin') {
                this.status = 'Creando';
                this.origin = undefined;
            } else if (this.currentUser.role.name === 'delivery_man') {
                this.status = 'En progreso';
                this.origin = undefined;
            } else {
                this.origin = 'receiver';
                this.status = 'Creando';
            }
        }
    }

    async ionViewWillEnter() {
        this.currentUser = await this.storage.get('user') as User;
        await this.getDeliveries();
    }

    async segmentChanged(event: any) {
        if (this.currentUser.role.name !== 'client')
            return this.responses.presentResponse({message: 'Esta acción solo está disponible para clientes'});

        this.origin = event.detail.value;
        if (this.origin === 'receiver') {
            this.deliverySubtitle = 'Recibo de';
        } else if (this.origin === 'sender') {
            this.deliverySubtitle = 'Envio a';
        }
        await this.getDeliveries();
    }

    async fetchByOriginStatus(status: string) {
        this.status = status;
        await this.getDeliveries();
    }

    async getDeliveries() {
        this.loading.present();

        if (this.currentUser && this.currentUser.role && this.currentUser.role.name === 'client') {
            this.deliveries = await this.deliveryService.fetchAllByOriginStatus(this.origin, this.status);
            this.loading.dismiss();
        } else if (this.currentUser.role.name === 'admin') {
            this.deliveries = await this.deliveryService.fetchAllByStatus(this.status);
            this.loading.dismiss();
        } else if (this.currentUser.role.name === 'delivery_man') {
            const deliveries = await this.deliveryService.fetchAllByStatus(this.status) as Delivery[];

            this.loading.dismiss();
            if (deliveries.length > 1 && (this.status === this.deliveryService.statuses.notStarted ||
                this.status === this.deliveryService.statuses.inProgress)) {
                this.responses.presentResponse({
                    message: 'Un repartidor no puede tener más de dos entregas no iniciadas' +
                        'o en progreso.'
                })
            }
            this.singlePendingDelivery = deliveries[0];

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
