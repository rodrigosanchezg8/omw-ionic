import {Component, OnInit} from '@angular/core';
import {DeliveryManService} from "../../../../services/delivery-man.service";
import {ServideRange} from "../../../models/servide-range";
import {Responses} from "../../../../traits/responses";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/user";

@Component({
    selector: 'app-delivery-mans-save-options',
    templateUrl: './delivery-mans-save-options.page.html',
    styleUrls: ['./delivery-mans-save-options.page.scss'],
})
export class DeliveryMansSaveOptionsPage implements OnInit {

    userId: number;
    available: boolean = false;
    serviceRanges: ServideRange[];
    selectedServiceRange: ServideRange;

    constructor(private responses: Responses,
                private router: Router,
                private deliveryManProvider: DeliveryManService,
                private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe((ps: any) => {
            this.userId = ps.userId;
        });
    }

    async ngOnInit() {
        this.serviceRanges = await this.deliveryManProvider.getServiceRanges() as ServideRange[];
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
