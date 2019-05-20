import {Component, ElementRef, Input, NgZone, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from "@agm/core";
import {MapService} from "../../services/map.service";
import {ResponseService} from "../../services/response.service";
import {Location} from "../../models/location";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MapQuestService} from "../../services/map-quest.service";
import {DeliveryLocationTrack} from "../../models/delivery-location-track";

declare const google;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {

    zoom: number;
    searchControl: string;
    fullAddress: string;

    senderClientAddress: string;
    receiverClientAddress: string;
    deliveryManAddress: string;

    deliveryManAddresses: any[] = [];

    @Input() search: any;
    @Input() lat: number;
    @Input() lng: number;

    @Input() deliveryManLocation: Location;
    @Input() deliveryManLocationTracks: DeliveryLocationTrack[];
    @Input() receiverClientLocation: Location;
    @Input() senderClientLocation: Location;

    @Input() mapLat = 20.6739383;
    @Input() mapLng = -103.4054539;

    @ViewChild('search') public searchElementRef: ElementRef;

    constructor(private mapsApiLoader: MapsAPILoader,
                private ngZone: NgZone,
                private mapService: MapService,
                private responses: ResponseService,
                private router: Router,
                private httpClient: HttpClient,
                private mapQuestService: MapQuestService) {
        this.zoom = 10;
    }

    async ngOnInit() {
        await this.mapsApiLoader.load();
        await this.initAutocomplete();
        await this.subscribeChange();
        this.mapService.mapInitialized = true;
    }

    async ngOnChanges() {
        await this.setAddresses();
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
        this.mapService.locationChange.subscribe(async location => {
            try {
                this.lat = Number(location.lat);
                this.lng = Number(location.lng);

                this.mapLng = this.lng;
                this.mapLat = this.lat;

                this.zoom = 10;

                const geocodeResult = await this.mapQuestService.reverseGeocode(this.lat, this.lng) as any;
                this.fullAddress = geocodeResult ? geocodeResult : '';

            } catch (e) {
                this.responses.presentResponse({message: 'No una hay dirección disponible'});
            }
        });
    }

    async setAddresses() {
        if (this.senderClientLocation) {
            const geocodeResult = await this.mapQuestService.reverseGeocode(this.senderClientLocation.lat,
                this.senderClientLocation.lng) as any;
            this.senderClientAddress = geocodeResult ? geocodeResult : '';
        }
        if (this.receiverClientLocation) {
            const geocodeResult = await this.mapQuestService.reverseGeocode(this.receiverClientLocation.lat,
                this.receiverClientLocation.lng) as any;
            this.receiverClientAddress = geocodeResult ? geocodeResult : '';
        }
        if (this.deliveryManLocation) {
            const geocodeResult = await this.mapQuestService.reverseGeocode(this.deliveryManLocation.lat,
                this.deliveryManLocation.lng) as any;
            this.deliveryManAddress = geocodeResult ? geocodeResult : '';
        }
        if (this.deliveryManLocationTracks) {
            for (let locationTrack of this.deliveryManLocationTracks) {
                if (!this.deliveryManAddresses.find(address =>
                    address.lat === locationTrack.location.lat &&
                    address.lng === locationTrack.location.lng
                )) {
                    const locationTrackAddress = await this.mapQuestService.reverseGeocode(locationTrack.location.lat,
                        locationTrack.location.lng) as any;
                    if (locationTrackAddress)
                        this.deliveryManAddresses.push({
                            lat: locationTrack.location.lat,
                            lng: locationTrack.location.lng,
                            address: locationTrackAddress
                        });
                }
            }
        }
    }
}
