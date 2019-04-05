import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../../services/user.service";
import {environment} from "../../../environments/environment.prod";

@Component({
    selector: 'app-clients',
    templateUrl: './clients.page.html',
    styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

    storageUrl: string = environment.storageUrl;
    clients: User[];

    constructor(private userProvider: UserService) {
    }

    async ngOnInit() {
        this.getClients();
    }

    async getClients(event = null) {
        this.clients = await this.userProvider.getAll('client') as User[];
        if (event)
            event.target.complete();
    }

}
