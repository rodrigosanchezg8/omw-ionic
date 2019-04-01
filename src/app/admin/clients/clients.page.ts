import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {ClientProvider} from "../../../providers/ClientProvider";
import {environment} from "../../../environments/environment.prod";

@Component({
    selector: 'app-clients',
    templateUrl: './clients.page.html',
    styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

    storageUrl: string = environment.storageUrl;
    clients: User[];

    constructor(private clientProvider: ClientProvider) {
    }

    async ngOnInit() {
        this.clients = await this.clientProvider.getAll() as User[];
    }

}
