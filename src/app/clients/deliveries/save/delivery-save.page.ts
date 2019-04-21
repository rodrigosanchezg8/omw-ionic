import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {environment} from "../../../../environments/environment.prod";
import {ActivatedRoute} from "@angular/router";
import {Responses} from "../../../../traits/responses";
import {MapService} from "../../../../services/map.service";
import {Delivery} from "../../../../models/delivery";
import {DeliveryService} from "../../../../services/delivery.service";

@Component({
    selector: 'app-delivery-save',
    templateUrl: './delivery-save.page.html',
    styleUrls: ['./delivery-save.page.scss'],
})
export class DeliverySavePage implements OnInit {

    isEditMode: boolean;
    delivery: Delivery;

    constructor(private route: ActivatedRoute,
                private responses: Responses,
                private mapService: MapService,
                private deliveryService: DeliveryService) {
    }

    ngOnInit() {
        try {
            this.route.params.subscribe(async ps => {
                if (ps.deliveryId) {
                    this.isEditMode = true;
                    this.delivery = await this.deliveryService.fetchOne(ps.deliveryId) as Delivery;
                } else
                    this.delivery = new Delivery();
            });

        } catch (e) {
            this.responses.presentResponse({message: 'Error! no se pudieron obtener los parámetros.'});
        }
    }

}
