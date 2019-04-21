import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from "@agm/core";
import {MapService} from "../../services/map.service";
import {Responses} from "../../traits/responses";

declare const google;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

    @Input() search: any;

    lat: number;
    lng: number;
    zoom: number;
    searchControl: string;
    fullAddress: string;

    @ViewChild('search') public searchElementRef: ElementRef;

    constructor(private mapsApiLoader: MapsAPILoader,
                private ngZone: NgZone,
                private mapService: MapService,
                private responses: Responses) {
        this.zoom = 10;
        this.lat = 20.6739383;
        this.lng = -103.4054539;
    }

    async ngOnInit() {
        await this.mapsApiLoader.load();
        await this.initAutocomplete();
        await this.subscribeChange();
    }

    async initAutocomplete() {
        if (!this.search)
            return;

        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
            types: ["address"],
            componentRestrictions: {country: "mx"}
        });
        autocomplete.addListener("place_changed", () => {
            this.ngZone.run(async () => {
                let place = await autocomplete.getPlace();

                if (place.geometry === undefined || place.geometry === null) {
                    return;
                }

                this.lat = await place.geometry.location.lat();
                this.lng = await place.geometry.location.lng();

                this.mapService.locationChanged(this.lat, this.lng)
            });
        });
    }

    async subscribeChange() {
        this.mapService.locationChange.subscribe(location => {

            console.log({"LOCATION": location})

            try {
                this.lat = location.lat;
                this.lng = location.lng;
                this.zoom = 10;

                let geocoder = new google.maps.Geocoder();
                let latLng = new google.maps.LatLng(this.lat, this.lng);
                geocoder.geocode({latLng: latLng}, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        this.ngZone.run(async () => {
                            this.fullAddress = results[0].formatted_address;
                        });
                    } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                        this.responses.presentResponse({
                            message: `El domicilio  no se mostrará por que 
                            Google está indicando que estás solicitando información muy rápido, espera unos segundos y
                            vuelve a intentar`
                        });
                    } else {
                        this.responses.presentResponse({message: 'No una hay dirección disponible'});
                    }
                });
            } catch (e) {
                this.responses.presentResponse({message: 'No una hay dirección disponible'});
            }
        });
    }

}
