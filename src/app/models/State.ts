import {City} from "./City";

export class State {

    state: string;
    cities: City[];

    deserialize(object) {
        Object.assign(this, object);
    }

}
