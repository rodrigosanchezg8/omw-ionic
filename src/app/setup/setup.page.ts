import {Component, OnInit} from '@angular/core';
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {environment} from "../../environments/environment.prod";
import {AlertController} from "@ionic/angular";
import {MapService} from "../../services/map.service";

@Component({
    selector: 'app-setup',
    templateUrl: './setup.page.html',
    styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {

    public storageUrl = environment.storageUrl;
    public user: User;

    constructor(private storage: Storage,
                private alertController: AlertController,
                private router: Router,
                private mapService: MapService) {
    }

    ngOnInit() {
    }

    async ionViewWillEnter() {
        this.user = await this.storage.get('user') as User;
        if (this.user && this.user.location) {
            this.mapService.confirmMapLoad.subscribe(loaded => {
                if (loaded)
                    this.mapService.locationChanged(this.user.location.lat, this.user.location.lng);
            });
        }
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
