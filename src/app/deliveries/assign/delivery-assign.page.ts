import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/user";
import {Delivery} from "../../../models/delivery";
import {DeliveryService} from "../../../services/delivery.service";
import {DeliveryMan} from "../../../models/delivery-man";
import {environment} from "../../../environments/environment.prod";

@Component({
    selector: 'app-delivery-assign',
    templateUrl: './delivery-assign.page.html',
    styleUrls: ['./delivery-assign.page.scss'],
})
export class DeliveryAssignPage implements OnInit {

    private deliveryMan: DeliveryMan;
    private storageUrl = environment.storageUrl;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private deliveryService: DeliveryService) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.deliveryMan = this.deliveryService.delivery.delivery_man as DeliveryMan;
    }

}
