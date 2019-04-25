import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {DeliveryProduct} from "../models/delivery-product";

@Injectable({
    providedIn: 'root'
})
export class DeliveryProductsService {

    constructor(public http: HttpClient, public api: ApiService) {
    }

    async fetchAllByDelivery(deliveryId: number): Promise<DeliveryProduct[]> {
        return await this.api.get(`delivery_products/delivery/${deliveryId}`) as DeliveryProduct[];
    }

    async fetchOne(productId: number): Promise<DeliveryProduct> {
        return await this.api.get(`delivery_products/${productId}`) as DeliveryProduct;
    }

    async create(product: DeliveryProduct): Promise<any> {
        return await this.api.post('delivery_products', product);
    }

    async update(product: DeliveryProduct): Promise<any> {
        return await this.api.put(`delivery_products/${product.id}`, product)
    }

    async delete(productId: number): Promise<any> {
        return await this.api.delete(`delivery_products/${productId}`);
    }

}
