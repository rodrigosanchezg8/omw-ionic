import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {ApiService} from "../../../../services/api.service";
import {Responses} from "../../../../traits/responses";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../../../services/client.service";
import {UserService} from "../../../../services/user.service";
import {environment} from "../../../../environments/environment.prod";
import {Loading} from "../../../../traits/loading";
import {MapService} from "../../../../services/map.service";

@Component({
    selector: 'app-users-save',
    templateUrl: './users-save-page.html',
    styleUrls: ['./users-save.page.scss'],
})
export class UsersSavePage implements OnInit {

    user: User;
    isEditMode: boolean;
    hasCompany: boolean;
    passwordConfirmation: string;

    constructor(private router: Router,
                private api: ApiService,
                private responses: Responses,
                private clientService: ClientService,
                private userService: UserService,
                private route: ActivatedRoute,
                private loading: Loading,
                private mapService: MapService,
                private imagePicker: ImagePicker) {
    }

    async ngOnInit() {
        try {
            this.route.params.subscribe(async ps => {
                if (ps.user) {
                    this.isEditMode = true;
                    this.user = await this.userService.get(ps.user) as User;
                    if (this.user.profile_photo !== null) {
                        this.user.profile_photo = environment.storageUrl + this.user.profile_photo;
                    }
                    this.hasCompany = !!this.user.company;
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
            });

        } catch (e) {
            this.responses.presentResponse({message: 'Error! no se pudieron obtener los parámetros.'});
        }
    }

    async pickImage() {
        const options = {
            quality: 70,
            outputType: 1,
            maximumImagesCount: 1
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

        let userRes = this.isEditMode ?
            await this.userService.update(this.user,
                {password_confirmation: this.passwordConfirmation}) :
            await this.userService.signUp(this.user,
                {password_confirmation: this.passwordConfirmation});

        this.responses.presentResponse(userRes);

        if (userRes.status === 200) {
            if (this.user.role.name === 'client' && this.hasCompany) {
                if (this.user.company && this.user.company.id) {
                    this.router.navigate(['admin/tabs/clients/save-company',
                        {
                            userId: userRes.user.id,
                            companyId: this.user.company.id
                        }]);
                } else {
                    this.router.navigate(['admin/tabs/clients/save-company', {userId: userRes.user.id}]);
                }
            } else if (this.user.role.name === 'delivery_man') {
                this.router.navigateByUrl('admin/tabs/delivery-men');
            } else
                this.router.navigateByUrl('admin/tabs');
        }
    }

}
