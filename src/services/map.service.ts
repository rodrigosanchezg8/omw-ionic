import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    @Output() locationChange: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    public locationChanged(lat: number, lng: number) {
        this.locationChange.emit({
            lat: lat,
            lng: lng,
        })
    };
}
