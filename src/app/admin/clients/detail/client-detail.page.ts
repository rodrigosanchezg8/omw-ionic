import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {Responses} from "../../../traits/Responses";
import {environment} from "../../../../environments/environment.prod";
import {ActionSheetController} from "@ionic/angular";

@Component({
    selector: 'app-client-detail',
    templateUrl: './client-detail.page.html',
    styleUrls: ['./client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit {

    storageUrl: string = environment.storageUrl;
    client: User;

    constructor(private clientProvider: UserService,
                private activatedRoute: ActivatedRoute,
                private responses: Responses,
                private actionSheetController: ActionSheetController,
                private router: Router) {
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(async ps => {
            this.client = await this.clientProvider.get(ps.clientId) as User;
            if (!this.client)
                this.responses.presentResponse({message: 'El cliente no existe.'});
        });
    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Albums',
            buttons: [{
                text: 'Actualizar',
                icon: 'create',
                handler: () => this.router.navigate(['admin/tabs/clients/save-user', {
                    role: 'client',
                    user: this.client.id
                }])
            }, {
                text: 'Delete',
                role: 'destructive',
                icon: 'trash',
                handler: () => {
                    console.log('Delete clicked');
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel'
            }]
        });
        await actionSheet.present();
    }

}
