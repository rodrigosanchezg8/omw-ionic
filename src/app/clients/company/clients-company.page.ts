import {Component, OnInit} from '@angular/core';
import {CompaniesService} from "../../../services/companies.service";
import {environment} from "../../../environments/environment.prod";
import {Router} from "@angular/router";
import {ActionSheetController, Platform} from "@ionic/angular";
import {User} from "../../../models/user";
import {Storage} from "@ionic/storage";
import {UserService} from "../../../services/user.service";
import {MapService} from "../../../services/map.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-clients-company',
    templateUrl: './clients-company.page.html',
    styleUrls: ['./clients-company.page.scss'],
})
export class ClientsCompanyPage implements OnInit {

    storageUrl = environment.storageUrl;
    user: User;

    constructor(private companiesService: CompaniesService,
                private router: Router,
                private actionSheetController: ActionSheetController,
                private storage: Storage,
                private usersService: UserService,
                private mapService: MapService,
                private platform: Platform) {
    }

    ngOnInit() {
    }

    async ionViewWillEnter() {
        const storageUser = await this.storage.get('user') as User;
        this.user = await this.usersService.get(storageUser.id) as User;
        if (this.user && this.user.company && this.user.company.location) {
            this.refreshMap();
        }
    }

    refreshMap() {
        const timer = setInterval(() => {
            if (this.mapService.mapInitialized) {
                this.mapService.locationChanged(this.user.company.location.lat, this.user.company.location.lng);
                clearInterval(timer);
            }
        }, 1000);
    }

    ionViewWillLeave() {
    }

    async sheetActions() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Acciones',
            buttons: [{
                text: 'Actualizar',
                icon: 'create',
                handler: () => {
                    this.router.navigate(['clients/tabs/company/save', {
                        companyId: this.user.company.id,
                        userId: this.user.company.user_id
                    }])
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
