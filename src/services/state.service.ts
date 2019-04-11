import {State} from "../models/state";

import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class StateService {

    constructor(private api: ApiService) {}

    async getStates(): Promise<State[]> {
        return (await this.api.get('auth/states_municipalities')).states;
    }
}
