import {State} from "./State";

export class City {
    city: string;
    state_id: number;
    state: State;

    deserialize(object) {
        Object.assign(this, object);
    }

}
