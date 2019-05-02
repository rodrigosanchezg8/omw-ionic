import {Component, OnInit} from '@angular/core';
import {DeliveryManService} from "../../../services/delivery-man.service";
import {ServiceRange} from "../../../models/service-range";
import {ResponseService} from "../../../services/response.service";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {User} from "../../../models/user";
import {DeliveryMan} from "../../../models/delivery-man";

@Component({
    selector: 'app-delivery-mans-save-options',
    templateUrl: './delivery-men-save-options.page.html',
    styleUrls: ['./delivery-men-save-options.page.scss'],
})
export class DeliveryMenSaveOptionsPage implements OnInit {

    userId: number;
    available: boolean = false;
    serviceRanges: ServiceRange[];
    selectedServiceRange: number;
    deliveryMan: DeliveryMan;

    constructor(private responses: ResponseService,
                private router: Router,
                private deliveryManService: DeliveryManService,
                private storage: Storage) {
    }

    async ngOnInit() {
        const storageUser = await this.storage.get('user') as User;
        this.userId = storageUser.id;
        this.serviceRanges = await this.deliveryManService.getServiceRanges() as ServiceRange[];

        const deliveryManServiceRes = await this.deliveryManService.get(this.userId) as any;
        this.deliveryMan = deliveryManServiceRes.delivery_man as DeliveryMan;

        if (this.deliveryMan) {
            this.selectedServiceRange = this.deliveryMan.service_range_id;
            this.available = this.deliveryMan.available;
        }
    }

    async save() {
        const data = {
            user_id: this.userId,
            service_range_id: this.selectedServiceRange ? this.selectedServiceRange : null,
            available: this.available
        };

        try {
            const deliveryRes = await this.deliveryManService.post(data);
            this.responses.presentResponse(deliveryRes, () => {
                if (deliveryRes.status === 200) {
                    this.router.navigateByUrl('delivery-mens/tabs');
                }
            });
        } catch (e) {
            this.responses.presentGenericalErrorResponse();
        }
    }

}
