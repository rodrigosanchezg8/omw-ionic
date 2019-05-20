import {Component, OnInit} from '@angular/core';
import {DeliveryService} from "../../../services/delivery.service";
import {User} from "../../../models/user";
import {ActivatedRoute} from "@angular/router";
import {Storage} from "@ionic/storage";
import {ResponseService} from "../../../services/response.service";
import {environment} from "../../../environments/environment.prod";
import {DeliveryLocationTrack} from "../../../models/delivery-location-track";
import {DeliveryLocationTracksService} from "../../../services/delivery-location-tracks.service";
import {Location} from "../../../models/location";
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Delivery} from "../../../models/delivery";
import {Loading} from "../../../traits/loading";
import {DeliveryStatus} from "../../../models/delivery-status";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-delivery-man-tracker',
    templateUrl: './delivery-man-tracker.page.html',
    styleUrls: ['./delivery-man-tracker.page.scss'],
})
export class DeliveryManTrackerPage implements OnInit {

    private currentUser: User;
    private storageUrl = environment.storageUrl;
    private paramsSubscription: Subscription;

    constructor(private geolocation: Geolocation,
                private deliveryService: DeliveryService,
                private activatedRoute: ActivatedRoute,
                private storage: Storage,
                private responsesService: ResponseService,
                private deliveryLocationTracksService: DeliveryLocationTracksService,
                private loading: Loading) {
    }

    ngOnInit() {
    }

    async ionViewWillEnter() {

        this.currentUser = await this.storage.get('user') as User;

        if (this.currentUser.role.name !== 'delivery_man') {
            this.responsesService.presentResponse(
                {message: 'El seguidor de entrega solo debe ser usado por repartidores'});
        }

        this.paramsSubscription = this.activatedRoute.params.subscribe(async ps => {
            if (ps.deliveryId) {
                this.loading.present();
                this.deliveryService.delivery = await this.deliveryService.fetchOne(ps.deliveryId) as Delivery;
                this.loading.dismiss();
            } else {
                this.responsesService.presentResponse({message: 'La entrega no se pudo encontrar'});
            }
        });
    }

    ionViewWillLeave() {
        this.paramsSubscription.unsubscribe();
    }

    async updateLocation() {
        if (!this.deliveryService.delivery) {
            this.responsesService.presentResponse({message: 'La entrega no se pudo encontrar; intenta de nuevo'});
            return false;
        }

        try {
            let deliveryLocationTrack = new DeliveryLocationTrack();
            deliveryLocationTrack.delivery_id = this.deliveryService.delivery.id;

            this.geolocation.getCurrentPosition().then(async pos => {

                this.loading.present();

                let location = new Location();
                location.lat = pos.coords.latitude;
                location.lng = pos.coords.longitude;

                const result = await this.deliveryLocationTracksService.store(deliveryLocationTrack, location) as any;
                this.deliveryService.delivery.delivery_status = result.delivery_location_track.delivery.delivery_status as DeliveryStatus;
                this.deliveryService.delivery.location_tracks.push(result.delivery_location_track as DeliveryLocationTrack);

                this.loading.dismiss();

                this.responsesService.presentResponse(result);

            }, () => {

                this.responsesService.presentResponse(
                    {message: 'No se pudo actualizar la localización por que esta no se pudo recuperar'});
            });
        } catch (e) {
            console.log(e);
            this.responsesService.presentResponse(
                {message: 'Ocurrió un error tratando de actualizar la entrega de la localización'});
        }
    }

}
