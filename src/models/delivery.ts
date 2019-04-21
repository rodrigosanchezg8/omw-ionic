import {User} from "./user";
import {Location} from "./location";

export class Delivery {

    id: number;
    deliveryManId: number;
    deliveryMan: User;
    receiver: User;
    plannedStartDate: Date;
    plannedEndDate: Date;
    departureDate: Date;
    arrivalDate: Date;
    departureLocation: Location;
    arrivalLocation: Location;
    deliveryStatusId: number;

    constructor() {
        this.departureLocation = new Location();
        this.arrivalLocation = new Location();
    }

}
