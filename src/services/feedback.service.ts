import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    constructor(public httpClient: HttpClient, public api: ApiService) {
    }

    async getClientLinearRegression(userId: number, monthOffset: number, forCompany: number) {
        return await this.api.get(`statistics/${userId}/client_linear_regression?month_offset=${monthOffset}&statistics_for=${forCompany}`)
    }

}
