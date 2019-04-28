import {Delivery} from "./delivery";

export class DeliveryProduct {
    id: number;
    delivery: Delivery;
    delivery_id: number;
    name: string;
    description: string;
    amount: string;
    cost: number;
    product_image: string;
    created_at: Date;
    updated_at: Date;
}
