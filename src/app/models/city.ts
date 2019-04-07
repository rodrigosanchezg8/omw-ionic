import {State} from "./state";

export class City {
    city: string;
    state_id: number;
    state: State;

    deserialize(object) {
        Object.assign(this, object);
    }

}
