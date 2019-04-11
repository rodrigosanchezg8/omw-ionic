import {Component, OnInit} from '@angular/core';
import {DeliveryManService} from "../../../services/delivery-man.service";
import {ServiceRange} from "../../../models/service-range";
import {Responses} from "../../../traits/responses";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {User} from "../../../models/user";
import {DeliveryManServiceOptions} from "../../../models/delivery-man-service-options";

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
    deliveryManServiceOptions: DeliveryManServiceOptions;

    constructor(private responses: Responses,
                private router: Router,
                private deliveryManService: DeliveryManService,
                private storage: Storage) {
    }

    async ngOnInit() {
        const storageUser = await this.storage.get('user') as User;
        this.userId = storageUser.id;
        this.serviceRanges = await this.deliveryManService.getServiceRanges() as ServiceRange[];
        this.deliveryManServiceOptions = await this.deliveryManService.get(this.userId) as DeliveryManServiceOptions;
        if (this.deliveryManServiceOptions) {
            this.selectedServiceRange = this.deliveryManServiceOptions.service_range_id;
            this.available = this.deliveryManServiceOptions.available;
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
