import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {Company} from "../../../../models/company";
import {CompaniesService} from "../../../../services/companies.service";
import {ResponseService} from "../../../../services/response.service";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../../models/user";
import {MapService} from "../../../../services/map.service";
import {Subscription} from "rxjs";
import {Loading} from "../../../../traits/loading";

@Component({
    selector: 'app-company-detail',
    templateUrl: './company-detail.page.html',
    styleUrls: ['./company-detail.page.scss'],
})
export class CompanyDetailPage implements OnInit {

    storageUrl: string = environment.storageUrl;
    company: Company;

    paramsSubscription: Subscription;

    constructor(private companiesService: CompaniesService,
                private responsesService: ResponseService,
                private activatedRoute: ActivatedRoute,
                private actionSheetController: ActionSheetController,
                private loading: Loading,
                private router: Router,
                private alertController: AlertController,
                private mapService: MapService) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.paramsSubscription = this.activatedRoute.params.subscribe(async ps => {
            this.company = await this.companiesService.get(ps.companyId) as Company;
            if (!this.company)
                this.responsesService.presentResponse({message: 'La compañia no existe.'});

            if (this.company.location) {
                this.refreshMap();
            }

        });
    }

    refreshMap() {
        const timer = setInterval(() => {
            if (this.mapService.mapInitialized) {
                this.mapService.locationChanged(this.company.location.lat, this.company.location.lng);
                clearInterval(timer);
            }
        }, 500);
    }

    ionViewWilLeave() {
        this.paramsSubscription.unsubscribe();
    }

    async sheetActions() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Acciones',
            buttons: [{
                text: 'Actualizar',
                icon: 'create',
                handler: () => {
                    this.router.navigate(['admin/tabs/clients/save-company', {
                        companyId: this.company.id,
                        userId: this.company.user_id
                    }])
                }
            }, {
                text: 'Borrar',
                role: 'destructive',
                icon: 'trash',
                handler: () => {
                    this.alertController.create({
                        header: 'Confirmar',
                        message: '¿Estás seguro de borrar ésta compañia?',
                        buttons: [
                            {
                                text: 'Cancelar',
                                role: 'cancel',
                                cssClass: 'secondary',
                            }, {
                                text: 'Sí',
                                handler: async () => {
                                    this.loading.present();
                                    await this.companiesService.delete(this.company.id);
                                    this.loading.dismiss();
                                    this.router.navigate(['admin/companies'])
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
