import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {Company} from "../models/company";

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {

    constructor(private httpClient: HttpClient, private api: ApiService) {
    }

    async getAll(): Promise<Company[]> {
        return await this.api.get('companies') as Company[];
    }

    async get(id): Promise<Company> {
        return await this.api.get('companies/' + id) as Company;
    }

    async create(company: Company): Promise<any> {
        return await this.api.post('companies', company);
    }

    async update(company: Company): Promise<any> {
        return await this.api.put('companies/' + company.id, company);
    }

    async delete(id): Promise<any> {
        return await this.api.delete('companies/' + id);
    }

}
