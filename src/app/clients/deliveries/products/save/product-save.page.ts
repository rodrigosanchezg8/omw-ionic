import {Component, OnInit} from '@angular/core';
import {DeliveryProductsService} from "../../../../../services/delivery-products.service";
import {DeliveryProduct} from "../../../../../models/delivery-product";
import {LoadingController} from "@ionic/angular";
import {Loading} from "../../../../../traits/loading";
import {ImagePicker} from "@ionic-native/image-picker/ngx";
import {Responses} from "../../../../../traits/responses";
import {ActivatedRoute, Router} from "@angular/router";
import {DeliveryService} from "../../../../../services/delivery.service";

@Component({
    selector: 'app-product-save',
    templateUrl: './product-save.page.html',
    styleUrls: ['./product-save.page.scss'],
})
export class ProductSavePage implements OnInit {

    isEditMode: boolean;
    deliveryProduct: DeliveryProduct;

    constructor(private deliveryProductService: DeliveryProductsService,
                private deliveryService: DeliveryService,
                private loading: Loading,
                private imagePicker: ImagePicker,
                private responses: Responses,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    async ngOnInit() {
        await this.instantiateDeliveryProduct();
    }

    async instantiateDeliveryProduct() {
        this.activatedRoute.params.subscribe(async ps => {
            if (ps.deliveryProductId) {
                this.deliveryProduct = await this.deliveryProductService.fetchOne(ps.deliveryProductId) as DeliveryProduct;
            } else {
                this.deliveryProduct = new DeliveryProduct();
            }

            this.deliveryProduct.delivery_id = this.deliveryService.delivery.id;
        });
    }

    async pickImage() {
        const options = {
            quality: 70,
            outputType: 1,
            maximumImagesCount: 1
        };

        try {
            this.loading.present();
            const pictures = await this.imagePicker.getPictures(options);
            this.loading.dismiss();

            this.deliveryProduct.product_image = 'data:image/jpeg;base64,' + pictures[0];
        } catch (e) {
            this.responses.presentResponse(
                {message: 'La foto no se ha podido abrir, intenta con otra porfavor'})
        }
    }

    async save() {
        const productsRes = this.isEditMode ?
            await this.deliveryProductService.update(this.deliveryProduct) :
            await this.deliveryProductService.create(this.deliveryProduct);

        this.responses.presentResponse(productsRes);
        if (productsRes.status === 'success') {
            this.router.navigateByUrl('/clients/tabs/deliveries/send/products');
        }

    }

}
