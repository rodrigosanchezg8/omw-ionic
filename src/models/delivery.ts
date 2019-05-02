import {User} from "./user";
import {Location} from "./location";
import {DeliveryProduct} from "./delivery-product";
import {DeliveryStatus} from "./delivery-status";
import {DeliveryMan} from "./delivery-man";

export class Delivery {

    id: number;

    delivery_id: number;
    delivery_man_id: number;
    delivery_status_id: number;
    sender_id: number;
    receiver_id: number;
    created_at: Date;
    updated_at: Date;
    company_is_sending: number;

    delivery_man: DeliveryMan;
    delivery_status: DeliveryStatus;
    receiver: User;
    sender: User;
    products: DeliveryProduct;
    planned_start_date: Date;
    planned_end_date: Date;
    departure_date: Date;
    arrival_date: Date;
    departure_location: Location;
    arrival_location: Location;

    constructor() {
        this.departure_location = new Location();
        this.arrival_location = new Location();
    }

}
