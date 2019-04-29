import {User} from "./user";
import {ServiceRange} from "./service-range";

export class DeliveryMan {
    user_id: number;
    user: User;
    service_range_id: number;
    service_range: ServiceRange;
    available: boolean;
}
