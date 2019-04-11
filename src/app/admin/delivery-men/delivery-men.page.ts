import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {environment} from "../../../environments/environment.prod";

@Component({
    selector: 'app-delivery-men',
    templateUrl: './delivery-men.page.html',
    styleUrls: ['./delivery-men.page.scss'],
})
export class DeliveryMenPage implements OnInit {

    storageUrl: string = environment.storageUrl;
    deliveryMen: User[];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    async ionViewWillEnter() {
        await this.getDeliveryMen();
    }

    async getDeliveryMen(event = null) {
        this.deliveryMen = await this.userService.getAll('delivery_man') as User[];
        if (event)
            event.target.complete();
    }

}
