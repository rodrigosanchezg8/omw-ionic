import {City} from "./city";

export class State {

    state: string;
    cities: City[];

    deserialize(object) {
        Object.assign(this, object);
    }

}
