import {Location} from "./location";

export class DeliveryLocationTrack {
    id: number;
    delivery_id: number;
    location_id: number;
    location: Location;
    step: number;
    created_at: Date;
    updated_at: Date;
}
