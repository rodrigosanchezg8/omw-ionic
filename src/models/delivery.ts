import {User} from "./user";
import {Location} from "./location";

export class Delivery {

    id: number;

    delivery_id: number;
    delivery_man_id: number;
    delivery_status_id: number;
    sender_id: number;
    receiver_id: number;

    deliveryMan: User;
    receiver: User;
    sender: User;
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
