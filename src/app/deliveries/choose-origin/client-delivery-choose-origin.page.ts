import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/user";
import {Storage} from "@ionic/storage";
import {DeliveryService} from "../../../services/delivery.service";
import {Delivery} from "../../../models/delivery";
import {MapService} from "../../../services/map.service";
import {ResponseService} from "../../../services/response.service";

@Component({
    selector: 'app-client-delivery-choose-origin',
    templateUrl: './client-delivery-choose-origin.page.html',
    styleUrls: ['./client-delivery-choose-origin.page.scss'],
})
export class ClientDeliveryChooseOriginPage implements OnInit {

    private isEditMode = false;
    private origin = 'client';
    private currentUser: User;
    private senderClient: User;

    constructor(private activatedRoute: ActivatedRoute,
                private storage: Storage,
                private deliveryService: DeliveryService,
                private mapService: MapService,
                private router: Router,
                private response: ResponseService) {
    }

    ngOnInit() {
    }

    async ionViewWillEnter() {
        await this.instantiateDelivery();
    }

    async instantiateDelivery() {
        this.currentUser = await this.storage.get('user') as User;
        this.activatedRoute.params.subscribe(async ps => {

                if (ps.deliveryId) {

                    this.deliveryService.delivery = await this.deliveryService.fetchOne(ps.deliveryId) as Delivery;
                    if (this.deliveryService.delivery.company_is_sending) {
                        this.origin = 'company';
                    } else {
                        this.origin = 'client';
                    }

                    this.isEditMode = true;
                    this.senderClient = this.deliveryService.delivery.sender;

                } else {
                    this.deliveryService.delivery = new Delivery();
                    this.senderClient = this.currentUser;
                }

                this.deliveryService.delivery.sender_id = this.senderClient.id;

                this.originChanged(this.origin);
            }
        );
    }

    originChanged(origin) {
        this.origin = origin;
        if (this.origin === 'client' && this.senderClient.location) {
            this.mapService.locationChanged(this.senderClient.location.lat, this.senderClient.location.lng);
        } else if (this.origin === 'company' && this.senderClient.company && this.senderClient.company.location) {
            this.mapService.locationChanged(this.senderClient.company.location.lat, this.senderClient.company.location.lng);
        }
    }

    async updateNavigate() {

        const companyIsSending = this.origin === 'company' ? 1 : 0;
        if (this.isEditMode && this.deliveryService.delivery.company_is_sending !== companyIsSending) {
            await this.deliveryService.update(this.deliveryService.delivery.id, {
                company_is_sending: companyIsSending,
            });
        }

        let opts: any;
        if (this.isEditMode && this.deliveryService && this.deliveryService.delivery
            && this.deliveryService.delivery.id) {
            opts = {
                deliveryOrigin: origin,
                deliveryId: this.deliveryService.delivery.id
            };
        } else {
            opts = {
                deliveryOrigin: origin,
            };
        }
        return this.navigateByRole('deliveries/send/find-client', opts);
    }

    navigateByRole(path: string, opts: any) {
        if (path && this.currentUser && this.currentUser.role && this.deliveryService.delivery) {
            if (this.currentUser.role.name === 'client') {
                this.router.navigate(['/clients/tabs/' + path, opts]);
            } else if (this.currentUser.role.name === 'admin') {
                this.router.navigate(['/admin/tabs/' + path, opts]);
            } else {
                this.response.presentResponse({message: 'Tú rol no permite acceder.'});
            }
        }
    }

}
