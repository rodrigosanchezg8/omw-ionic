import {Component, OnInit} from '@angular/core';
import {DeliveryProductsService} from "../../../services/delivery-products.service";
import {DeliveryService} from "../../../services/delivery.service";
import {environment} from "../../../environments/environment.prod";
import {AlertController} from "@ionic/angular";
import {ResponseService} from "../../../services/response.service";
import {Loading} from "../../../traits/loading";
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {User} from "../../../models/user";
import {Delivery} from "../../../models/delivery";

@Component({
    selector: 'app-delivery-products',
    templateUrl: './delivery-products.page.html',
    styleUrls: ['./delivery-products.page.scss'],
})
export class DeliveryProductsPage implements OnInit {

    currentUser: User;

    storageUrl: string = environment.storageUrl;

    seeLocations = false;
    isEditMode = false;

    constructor(private deliveryService: DeliveryService,
                private deliveryProductsService: DeliveryProductsService,
                private alertController: AlertController,
                private responses: ResponseService,
                private loading: Loading,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private storage: Storage) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {

    }

    async ionViewWillEnter() {

        this.currentUser = await this.storage.get('user') as User;

        this.activatedRoute.params.subscribe(async ps => {

            if (ps.isEditMode) {
                this.isEditMode = ps.isEditMode;
            }

            if (ps.deliveryId)
                this.deliveryService.delivery = await this.deliveryService.fetchOne(ps.deliveryId)

            this.deliveryProductsService.deliveryProducts =
                await this.deliveryProductsService.fetchAllByDelivery(this.deliveryService.delivery.id)

        });
    }

    async remove(productId: number) {
        const alert = await this.alertController.create({
            header: 'Confirmar',
            message: '¿Estás seguro de borrar éste producto?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Sí',
                    handler: async () => {
                        this.loading.present();
                        const deliveryProductRes = await this.deliveryProductsService.delete(productId)
                        this.loading.dismiss();

                        this.responses.presentResponse(deliveryProductRes);

                        if (deliveryProductRes.header) {
                            const index = this.deliveryProductsService.deliveryProducts.findIndex(delivery => delivery.id === productId);
                            this.deliveryProductsService.deliveryProducts.splice(index, 1);
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    async confirmDelivery() {
        if (!this.deliveryProductsService.deliveryProducts.length)
            this.responses.presentResponse({message: 'Debes añadir productos. '});

        const alert = await this.alertController.create({
            header: '¿Estás seguro de CONFIRMAR esta entrega?',
            message: `Si tu entrega es aceptable, se le asignará a un repartidor para que éste acuda a tu sitio de   
             localización para recoger los productos y a continuación, llevarlos al lugar de localización del cliente al
             que los envias. De no ser aceptable, se te enviará un mensaje explicando las razones para que realices 
             modificaciones. 
             Puedes estar al tanto de todo en el módulo de Seguidor de entrega y con la mensajería hacia nuestra 
             administración.`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Sí',
                    handler: async () => {
                        await this.changeStatus();
                    }
                }
            ]
        });
        alert.present();
    }

    async changeStatus() {
        this.loading.present();
        const deliveryRes = await this.deliveryService
            .changeStatus(this.deliveryService.delivery.id, 'No asignado');
        this.loading.dismiss();

        this.responses.presentResponse(deliveryRes);
        if (deliveryRes.header) {
            this.deliveryService.delivery = undefined;
            this.deliveryProductsService.deliveryProducts = undefined;
            this.router.navigateByUrl('clients/tabs/deliveries');
        }
    }

    canAddOrUpdate() {
        return !this.deliveryService.delivery || !this.deliveryService.delivery.sender ||
            !this.currentUser || this.deliveryService.delivery.sender.id === this.currentUser.id;
    }

    async assignDelivery() {
        if (!this.deliveryService.delivery.delivery_man) {
            this.loading.present();
            const deliveryRes = await this.deliveryService.assign(this.deliveryService.delivery.id) as any;
            this.loading.dismiss();

            if (deliveryRes.message)
                this.responses.presentResponse(deliveryRes);
            else {
                this.deliveryService.delivery = deliveryRes.delivery as Delivery;
                this.router.navigateByUrl('/admin/tabs/deliveries/send/assign')
            }
        } else {
            this.responses.presentResponse({
                message: 'No se puede asignar de nuevo. ' +
                    'Esta entrega ya tiene un repartidor asignado'
            });
        }
    }

}
