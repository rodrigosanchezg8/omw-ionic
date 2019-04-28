import {User} from "./user";
import {Location} from "./location";
import {DeliveryProduct} from "./delivery-product";

export class Delivery {

    id: number;

    delivery_id: number;
    delivery_man_id: number;
    delivery_status_id: number;
    sender_id: number;
    receiver_id: number;
    created_at: Date;
    updated_at: Date;

    deliveryMan: User;
    receiver: User;
    sender: User;
    products: DeliveryProduct;
    plannedStartDate: Date;
    plannedEndDate: Date;
    departureDate: Date;
    arrivalDate: Date;
    departureLocation: Location;
    arrivalLocation: Location;

    constructor() {
        this.departureLocation = new Location();
        this.arrivalLocation = new Location();
    }

}
