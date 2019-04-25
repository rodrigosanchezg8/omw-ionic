import {Component, OnInit} from '@angular/core';
import {DeliveryProductsService} from "../../../../services/delivery-products.service";
import {DeliveryProduct} from "../../../../models/delivery-product";
import {DeliveryService} from "../../../../services/delivery.service";

@Component({
    selector: 'app-delivery-products',
    templateUrl: './delivery-products.page.html',
    styleUrls: ['./delivery-products.page.scss'],
})
export class DeliveryProductsPage implements OnInit {

    deliveryProducts: DeliveryProduct[];

    constructor(private deliveryService: DeliveryService,
                private deliveryProductsService: DeliveryProductsService) {
    }

    async ngOnInit() {
        await this.getDeliveryProducts();
    }

    async ionViewWillEnter() {
        await this.getDeliveryProducts();
    }

    async getDeliveryProducts() {
        this.deliveryProducts = await this.deliveryProductsService
            .fetchAllByDelivery(this.deliveryService.delivery.id)
    }

}
