import {City} from "./city";

export class State {

    id: number;
    state: string;
    cities: City[];

    deserialize(object) {
        Object.assign(this, object);
    }

}
