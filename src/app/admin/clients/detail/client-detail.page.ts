import {Component, OnInit} from '@angular/core';
import {ClientProvider} from "../../../../providers/ClientProvider";
import {User} from "../../../models/User";
import {ActivatedRoute} from "@angular/router";
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

    constructor(private clientProvider: ClientProvider,
                private activatedRoute: ActivatedRoute,
                private responses: Responses,
                private actionSheetController: ActionSheetController) {
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(async ps => {
            this.client = await this.clientProvider.get(ps.clientId) as User;
            if (!this.client)
                this.responses.presentResponse({message: 'The client does not exist.'});
        });
    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Albums',
            buttons: [{
                text: 'Delete',
                role: 'destructive',
                icon: 'trash',
                handler: () => {
                    console.log('Delete clicked');
                }
            }, {
                text: 'Share',
                icon: 'share',
                handler: () => {
                    console.log('Share clicked');
                }
            }, {
                text: 'Play (open modal)',
                icon: 'arrow-dropright-circle',
                handler: () => {
                    console.log('Play clicked');
                }
            }, {
                text: 'Favorite',
                icon: 'heart',
                handler: () => {
                    console.log('Favorite clicked');
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

}
