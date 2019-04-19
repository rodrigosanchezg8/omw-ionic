import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {Responses} from "../../../../traits/responses";
import {environment} from "../../../../environments/environment.prod";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {MapService} from "../../../../services/map.service";

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.page.html',
    styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

    storageUrl: string = environment.storageUrl;
    user: User;

    constructor(private userService: UserService,
                private activatedRoute: ActivatedRoute,
                private responses: Responses,
                private actionSheetController: ActionSheetController,
                private router: Router,
                private alertController: AlertController,
                private mapService: MapService) {
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(async ps => {
            this.user = await this.userService.get(ps.userId) as User;
            if (!this.user)
                this.responses.presentResponse({message: 'El usuario no existe.'});

            if (this.user.location)
                this.mapService.locationChanged(this.user.location.lat, this.user.location.lng);

        });
    }

    async deleteAction() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Albums',
            buttons: [{
                text: 'Actualizar',
                icon: 'create',
                handler: () => {
                    if (this.user.role.name === 'client') {
                        this.router.navigate(['admin/tabs/clients/save-user', {
                            role: 'client',
                            user: this.user.id
                        }])
                    } else if (this.user.role.name === 'delivery_man') {
                        this.router.navigate(['admin/tabs/delivery-men/save-user', {
                            role: 'delivery_man',
                            user: this.user.id
                        }])
                    }
                }
            }, {
                text: 'Borrar',
                role: 'destructive',
                icon: 'trash',
                handler: () => {
                    this.alertController.create({
                        header: 'Confirmar',
                        message: '¿De  verdad quieres borrar éste usuario?',
                        buttons: [
                            {
                                text: 'Cancelar',
                                role: 'cancel',
                                cssClass: 'secondary',
                            }, {
                                text: 'Sí',
                                handler: async () => {
                                    await this.userService.delete(this.user.id);
                                    if (this.user.role.name === 'client') {
                                        this.router.navigate(['admin/tabs/clients']);
                                    } else if (this.user.role.name === 'delivery_man') {
                                        this.router.navigate(['admin/tabs/delivery-men']);
                                    }
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
