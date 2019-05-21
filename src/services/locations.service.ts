import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class LocationsService {

    constructor(public httpClient: HttpClient, public api: ApiService) {
    }

    async getCurrentRegisteredCities() {
        const locationsResponse = await this.api.get(`locations/current_registered_cities`) as any;
        return locationsResponse.cities as string[];
    }

}
