import {Component, OnInit} from '@angular/core';
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {environment} from "../../environments/environment.prod";
import {AlertController} from "@ionic/angular";

@Component({
    selector: 'app-setup',
    templateUrl: './setup.page.html',
    styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {

    private storageUrl = environment.storageUrl;
    private user: User;

    constructor(private storage: Storage,
                private alertController: AlertController,
                private router: Router) {
    }

    ngOnInit() {
    }

    async ionViewWillEnter() {
        this.user = await this.storage.get('user') as User;
    }

    async logout() {
        const alert = await this.alertController.create({
            header: 'Confirmar',
            message: '¿Estás seguro de salir?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Sí',
                    handler: async () => {
                        await this.storage.remove('authorization');
                        await this.storage.remove('user');
                        this.router.navigateByUrl('/', {replaceUrl: true});
                    }
                }
            ]
        });
        alert.present();
    }

}
