import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {Company} from "../../../../models/company";
import {CompaniesService} from "../../../../services/companies.service";
import {Responses} from "../../../../traits/responses";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../../models/user";

@Component({
    selector: 'app-company-detail',
    templateUrl: './company-detail.page.html',
    styleUrls: ['./company-detail.page.scss'],
})
export class CompanyDetailPage implements OnInit {

    storageUrl: string = environment.storageUrl;
    company: Company;

    constructor(private companiesService: CompaniesService,
                private responsesService: Responses,
                private activatedRoute: ActivatedRoute,
                private actionSheetController: ActionSheetController,
                private router: Router,
                private alertController: AlertController) {
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(async ps => {
            this.company = await this.companiesService.get(ps.companyId) as Company;
            if (!this.company)
                this.responsesService.presentResponse({message: 'La compañia no existe.'});
        });
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
                                    await this.companiesService.delete(this.company.id);
                                    this.router.navigate(['admin/tabs/companies']);
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
