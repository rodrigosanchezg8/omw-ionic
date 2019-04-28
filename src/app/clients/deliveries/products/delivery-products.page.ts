import {Component, OnInit} from '@angular/core';
import {DeliveryProductsService} from "../../../../services/delivery-products.service";
import {DeliveryProduct} from "../../../../models/delivery-product";
import {DeliveryService} from "../../../../services/delivery.service";
import {environment} from "../../../../environments/environment.prod";
import {AlertController} from "@ionic/angular";
import {Responses} from "../../../../traits/responses";
import {Loading} from "../../../../traits/loading";
import {Router} from "@angular/router";

@Component({
    selector: 'app-delivery-products',
    templateUrl: './delivery-products.page.html',
    styleUrls: ['./delivery-products.page.scss'],
})
export class DeliveryProductsPage implements OnInit {

    storageUrl: string = environment.storageUrl;
    deliveryProducts: DeliveryProduct[];

    seeLocations: boolean;

    constructor(private deliveryService: DeliveryService,
                private deliveryProductsService: DeliveryProductsService,
                private alertController: AlertController,
                private responses: Responses,
                private loading: Loading,
                private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {

    }

    async ionViewWillEnter() {
        this.deliveryProducts = await this.deliveryProductsService.fetchAllByDelivery(this.deliveryService.delivery.id)
    }

    async delete(productId: number) {
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
                            const index = this.deliveryProducts.findIndex(delivery => delivery.id === productId);
                            this.deliveryProducts.splice(index, 1);
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    async confirmDelivery() {
        if (!this.deliveryProducts.length)
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
        const deliveryRes = await this.deliveryService
            .changeStatus(this.deliveryService.delivery.id, 'No asignado');
        this.responses.presentResponse(deliveryRes);
        if (deliveryRes.header)
            this.router.navigateByUrl('clients/tabs/deliveries');
    }

}
