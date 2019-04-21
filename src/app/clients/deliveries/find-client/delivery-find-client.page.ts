import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user.service";
import {ClientService} from "../../../../services/client.service";
import {Responses} from "../../../../traits/responses";
import {MapService} from "../../../../services/map.service";

@Component({
    selector: 'app-delivery-find-client',
    templateUrl: './delivery-find-client.page.html',
    styleUrls: ['./delivery-find-client.page.scss'],
})
export class DeliveryFindClientPage implements OnInit {

    receiverClientEmail: string;
    receiverClient: User;

    constructor(private clientService: ClientService,
                private responses: Responses,
                private mapService: MapService) {
    }

    ngOnInit() {
    }

    async fetchClient() {

        const clientRes = await this.clientService.fetchByEmail(this.receiverClientEmail) as any;
        if (clientRes.status === 'success') {
            this.receiverClient = clientRes.client as User;
            if (this.receiverClient.location) {
                this.mapService.locationChanged(this.receiverClient.location.lat,
                    this.receiverClient.location.lng)
            } else {
                this.responses.presentResponse({message: 'Éste cliente no tiene una localización registrada'});
                this.receiverClient = undefined;
            }
        } else {
            this.responses.presentResponse(clientRes);
            return;
        }
    }

}
