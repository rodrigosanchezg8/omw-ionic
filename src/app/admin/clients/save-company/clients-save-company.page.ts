import {Component, OnInit} from '@angular/core';
import {Company} from "../../../../models/company";
import {ImagePicker} from "@ionic-native/image-picker/ngx";
import {ResponseService} from "../../../../services/response.service";
import {Loading} from "../../../../traits/loading";
import {ActivatedRoute, Router} from "@angular/router";
import {CompaniesService} from "../../../../services/companies.service";
import {environment} from "../../../../environments/environment.prod";
import {MapService} from "../../../../services/map.service";

@Component({
    selector: 'app-clients-save-company',
    templateUrl: './clients-save-company.page.html',
    styleUrls: ['./clients-save-company.page.scss'],
})
export class ClientsSaveCompanyPage implements OnInit {

    company: Company;

    isEditMode: boolean;

    constructor(private responsesService: ResponseService,
                private loading: Loading,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private companiesService: CompaniesService,
                private mapService: MapService) {
    }

    async ngOnInit() {
        try {
            this.activatedRoute.params.subscribe(async ps => {
                if (ps.companyId) {
                    this.isEditMode = true;
                    this.company = await this.companiesService.get(ps.companyId) as Company;
                    if (this.company.profile_photo !== null) {
                        this.company.profile_photo = environment.storageUrl + this.company.profile_photo;
                    }
                    this.company.user_id = Number(ps.userId);
                } else if (ps.userId) {
                    this.company = new Company();
                    this.company.user_id = Number(ps.userId);
                } else {
                    this.company = new Company()
                }

                this.mapService.locationChange.subscribe(location => {
                    this.company.location.lat = location.lat;
                    this.company.location.lng = location.lng;
                });

            });
        } catch (e) {
            this.responsesService.presentResponse({message: 'Error! no se pudieron obtener los parámetros.'});
        }
    }

    async pickImage() {
        const options = {
            quality: 70,
            outputType: 1,
            maximumImagesCount: 1,
        };

        try {

            this.loading.present();
            const pictures = await new ImagePicker().getPictures(options);
            this.loading.dismiss();

            this.company.profile_photo = 'data:image/jpeg;base64,' + pictures[0];
        } catch (e) {
            this.responsesService.presentResponse(
                {message: 'La foto no se ha pudido abrir, intenta con otra porfavor'})
        }
    }

    async save() {
        const companyRes = this.isEditMode ? await this.companiesService.update(this.company) :
            await this.companiesService.create(this.company);
        this.responsesService.presentResponse(companyRes, async () => {
            if (companyRes.status === 200) {
                if (this.router.url.includes('admin/tabs')) {
                    this.router.navigateByUrl('admin/tabs/clients')
                } else if (this.router.url.includes('clients/tabs')) {
                    this.router.navigateByUrl('clients/tabs/company')
                }
            } else {
                this.responsesService.presentGenericalErrorResponse();
            }
        });
    }

}
