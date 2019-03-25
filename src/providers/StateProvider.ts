import {State} from "../app/models/State";

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Responses} from "../app/traits/Responses";
import {Api} from "./Api";

@Injectable({
    providedIn: 'root'
})
export class StateProvider {

    constructor(private api: Api) {}

    async getStates(): Promise<State[]> {
        return (await this.api.get('auth/states_municipalities')).states;
    }
}
