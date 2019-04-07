import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {Responses} from "../../../../traits/responses";
import {environment} from "../../../../environments/environment.prod";
import {ActionSheetController, AlertController} from "@ionic/angular";

@Component({
    selector: 'app-client-detail',
    templateUrl: './client-detail.page.html',
    styleUrls: ['./client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit {

    storageUrl: string = environment.storageUrl;
    client: User;

    constructor(private userService: UserService,
                private activatedRoute: ActivatedRoute,
                private responses: Responses,
                private actionSheetController: ActionSheetController,
                private router: Router,
                private alertController: AlertController) {
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(async ps => {
            this.client = await this.userService.get(ps.clientId) as User;
            if (!this.client)
                this.responses.presentResponse({message: 'El cliente no existe.'});
        });
    }

    async deleteAction() {
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
                text: 'Borrar',
                role: 'destructive',
                icon: 'trash',
                handler: () => {
                    this.alertController.create({
                        header: 'Confirmar',
                        message: '¿De  verdad quieres borrar éste cliente?',
                        buttons: [
                            {
                                text: 'Cancelar',
                                role: 'cancel',
                                cssClass: 'secondary',
                            }, {
                                text: 'Sí',
                                handler: async () => {
                                    await this.userService.delete(this.client);
                                    this.router.navigate(['admin/tabs/clients']);
                                }
                            }
                        ]
                    }).then((alert) => {
                        alert.present();
                    })
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
