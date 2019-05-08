import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {DeliveryLocationTrack} from "../models/delivery-location-track";
import {Location} from "../models/location";

@Injectable({
    providedIn: 'root'
})
export class DeliveryLocationTracksService {

    constructor(private apiService: ApiService) {
    }

    async store(deliveryLocationTrack: DeliveryLocationTrack, location: Location): Promise<any> {
        return await this.apiService.post('delivery_location_tracks', {
            ...deliveryLocationTrack,
            ...location
        }) as any;
    }
}
