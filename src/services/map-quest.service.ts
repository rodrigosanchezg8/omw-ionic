import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class MapQuestService {

    private reverseGeocodingURL = environment.mapQuest.reverseGeocodeURL + 'key=' + environment.mapQuest.key + '&location=';

    constructor(private httpClient: HttpClient) {
    }

    async reverseGeocode(lat: number, lng: number): Promise<any> {
        const geocodeResult = await this.httpClient.get(this.reverseGeocodingURL + `${lat},${lng}`).toPromise() as any;
        let firstLocation, fullAddress;
        if (geocodeResult && geocodeResult.results[0] && geocodeResult.results[0].locations &&
            geocodeResult.results[0].locations.length) {
            firstLocation = geocodeResult.results[0].locations[0];
            fullAddress = firstLocation.street;
            fullAddress += firstLocation.adminArea6 ? ', ' + firstLocation.adminArea6 : '';
            fullAddress += firstLocation.adminArea5 ? ', ' + firstLocation.adminArea5 : '';
            fullAddress += firstLocation.adminArea3 ? ', ' + firstLocation.adminArea3 : '';
            return fullAddress;
        }
        return false;
    }

}
