import {Component, OnInit} from '@angular/core';
import {DeliveryManProvider} from "../../../../providers/DeliveryManProvider";
import {ServiceRange} from "../../../models/ServiceRange";
import {Responses} from "../../../traits/Responses";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/User";

@Component({
    selector: 'app-delivery-mans-save-options',
    templateUrl: './delivery-mans-save-options.page.html',
    styleUrls: ['./delivery-mans-save-options.page.scss'],
})
export class DeliveryMansSaveOptionsPage implements OnInit {

    userId: number;
    available: boolean = false;
    serviceRanges: ServiceRange[];
    selectedServiceRange: ServiceRange;

    constructor(private responses: Responses,
                private router: Router,
                private deliveryManProvider: DeliveryManProvider,
                private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe((ps: any) => {
            this.userId = ps.userId;
        });
    }

    async ngOnInit() {
        this.serviceRanges = await this.deliveryManProvider.getServiceRanges() as ServiceRange[];
    }

    async save() {
        const data = {
            user_id: this.userId,
            service_range_id: this.selectedServiceRange ? this.selectedServiceRange.id : null,
            available: this.available
        };

        try {
            const deliveryRes = await this.deliveryManProvider.post(data);
            this.responses.presentResponse(deliveryRes, () => {
                if (deliveryRes.status === 200) {
                    this.router.navigateByUrl('admin/tabs/delivery-mans');
                }
            });
        } catch (e) {
            this.responses.presentGenericalErrorResponse();
        }
    }

}
