import {Component, OnInit} from '@angular/core';
import {CompaniesService} from "../../../services/companies.service";
import {Company} from "../../../models/company";
import {environment} from "../../../environments/environment.prod";

@Component({
    selector: 'app-companies',
    templateUrl: './companies.page.html',
    styleUrls: ['./companies.page.scss'],
})
export class CompaniesPage implements OnInit {

    storageUrl: string = environment.storageUrl;
    companies: Company[];

    constructor(private companiesService: CompaniesService) {
    }

    ngOnInit() {
    }

    async ionViewWillEnter() {
        await this.getCompanies();
    }

    async getCompanies(event = null) {
        this.companies = await this.companiesService.getAll() as Company[];
        if (event) {
            event.target.complete();
        }
    }

}
