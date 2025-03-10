import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {ApiService} from "../../../../services/api.service";
import {ResponseService} from "../../../../services/response.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../../../services/client.service";
import {UserService} from "../../../../services/user.service";
import {environment} from "../../../../environments/environment.prod";
import {Loading} from "../../../../traits/loading";
import {MapService} from "../../../../services/map.service";
import {Storage} from "@ionic/storage";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-users-save',
    templateUrl: './users-save-page.html',
    styleUrls: ['./users-save.page.scss'],
})
export class UsersSavePage implements OnInit {

    currentUser: User;
    user: User;
    isEditMode: boolean;
    passwordConfirmation: string;
    private paramsSubscription: Subscription;

    constructor(private router: Router,
                private api: ApiService,
                private responses: ResponseService,
                private clientService: ClientService,
                private userService: UserService,
                private route: ActivatedRoute,
                private loading: Loading,
                private mapService: MapService,
                private imagePicker: ImagePicker,
                private storage: Storage) {
    }

    async ngOnInit() {
    }

    ionViewWillLeave() {
        this.paramsSubscription.unsubscribe();
    }

    async ionViewWillEnter() {
        try {
            this.currentUser = await this.storage.get('user') as User;
            this.paramsSubscription = this.route.params.subscribe(async ps => {
                if (ps.user) {
                    this.isEditMode = true;

                    this.loading.present();
                    this.user = await this.userService.get(ps.user) as User;
                    this.loading.dismiss();

                    if (this.user.profile_photo !== null) {
                        this.user.profile_photo = environment.storageUrl + this.user.profile_photo;
                    }
                } else if (ps.role) {
                    this.user = new User();
                    this.user.role.name = ps.role;
                } else {
                    this.user = new User();
                }

                this.mapService.locationChange.subscribe(location => {
                    this.user.location.lat = location.lat;
                    this.user.location.lng = location.lng;
                });

                if (this.isEditMode && this.user && this.user.location) {
                    this.refreshMap();
                }

            });

        } catch (e) {
            this.responses.presentResponse({message: 'Error! no se pudieron obtener los parámetros.'});
        }
    }

    refreshMap() {
        const timer = setInterval(() => {
            if (this.mapService.mapInitialized && this.user.location.lat) {
                this.mapService.locationChanged(this.user.location.lat, this.user.location.lng);
                clearInterval(timer);
            }
        }, 500);
    }

    async pickImage() {
        const options = {
            quality: 70,
            outputType: 1,
            maximumImagesCount: 1,
            width: 600,
            height: 600,
        };

        try {
            this.loading.present();
            const pictures = await this.imagePicker.getPictures(options);
            this.loading.dismiss();

            this.user.profile_photo = 'data:image/jpeg;base64,' + pictures[0];
        } catch (e) {
            this.responses.presentResponse(
                {message: 'La foto no se ha podido abrir, intenta con otra porfavor'})
        }
    }

    async save() {
        this.user.birth_date = this.user.birth_date ? this.user.birth_date.substr(0, 10) : undefined;

        this.loading.present();

        let userRes = this.isEditMode ?
            await this.userService.update(this.user,
                {password_confirmation: this.passwordConfirmation}) :
            await this.userService.signUp(this.user,
                {password_confirmation: this.passwordConfirmation});

        this.loading.dismiss();

        this.responses.presentResponse(userRes);

        if (userRes.status === 200) {
            if (this.currentUser) {
                if (this.currentUser.role.name === 'admin') {
                    if (this.user.role.name === 'delivery_man') {
                        this.router.navigateByUrl('admin/tabs/delivery-men');
                    } else
                        this.router.navigateByUrl('admin/tabs/clients');
                } else if (this.currentUser.role.name === 'delivery_man') {
                    await this.storage.set('user', userRes.user);
                    this.router.navigateByUrl('delivery-men/tabs/setup');
                } else if (this.currentUser.role.name === 'client') {
                    await this.storage.set('user', userRes.user);
                    this.router.navigateByUrl('clients/tabs/setup');
                }
            } else {
                this.router.navigateByUrl('home');
            }
        }
    }

}
