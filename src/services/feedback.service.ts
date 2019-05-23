import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    constructor(public httpClient: HttpClient, public api: ApiService) {
    }

    async getDeliveriesMonthLinearRegression(userId: number, monthOffset: number, forCompany: string) {
        return await this.api.get(`statistics/${userId}/client_linear_regression?month_offset=${monthOffset}&statistics_for=${forCompany}`)
    }

    async getCitiesMonthLinearRegression(monthOffset: number, city: string, statisticsFor: string, originType: string) {
        let url = `statistics/linear_regression_by_city?month_offset=${monthOffset}&city=${city}&
        statistics_for=${statisticsFor}`;
        if (originType !== null)
            url += `&origin_type=${originType}`;

        return await this.api.get(url);
    }

}
