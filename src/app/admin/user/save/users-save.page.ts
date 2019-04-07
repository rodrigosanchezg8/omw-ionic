import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {ImagePicker} from "@ionic-native/image-picker/ngx";
import {ApiService} from "../../../../services/api.service";
import {State} from "../../../models/state";
import {Responses} from "../../../../traits/responses";
import {StateService} from "../../../../services/state.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../../../services/client.service";
import {UserService} from "../../../../services/user.service";
import {environment} from "../../../../environments/environment.prod";
import {Loading} from "../../../../traits/loading";

@Component({
    selector: 'app-users-save',
    templateUrl: './users-save-page.html',
    styleUrls: ['./users-save.page.scss'],
})
export class UsersSavePage implements OnInit {

    user: User;
    isEditMode: boolean;
    hasCompany: boolean;
    states: State[];
    selectedState: number;
    passwordConfirmation: string;

    constructor(private router: Router,
                private api: ApiService,
                private responses: Responses,
                private stateService: StateService,
                private clientService: ClientService,
                private userService: UserService,
                private route: ActivatedRoute,
                private loading: Loading) {
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
                    this.selectedState = this.user.city.state.id;
                } else if (ps.role) {
                    this.user = new User();
                    this.user.role.name = ps.role;
                } else {
                    this.user = new User();
                }
            });
            this.states = <State[]>(await <any>this.stateService.getStates());
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
            const pictures = await new ImagePicker().getPictures(options)
            this.loading.dismiss();

            this.user.profile_photo = 'data:image/jpeg;base64,' + pictures[0];
        } catch (e) {
            this.responses.presentResponse(
                {message: 'La foto no se ha pudido abrir, intenta con otra porfavor'})
        }
    }

    async save() {
        this.user.birth_date = this.user.birth_date.substr(0, 10);
        let clientRes;
        if (this.isEditMode) {
            clientRes = await this.userService.update(this.user,
                {password_confirmation: this.passwordConfirmation});
        } else {
            clientRes = await this.userService.signUp(this.user,
                {password_confirmation: this.passwordConfirmation});
        }
        this.responses.presentResponse(clientRes, () => {
            if (clientRes.status === 200) {
                if (this.user.role.name === 'client' && this.hasCompany) {
                    this.router.navigate(['admin/tabs/clients/save-company', {userId: clientRes.user.id}]);
                } else {
                    this.router.navigateByUrl('admin/tabs');
                }
            }
        });
    }

    selectedStateCities() {
        if (this.states)
            return this.states.find(state => state.id === this.selectedState).cities;
    }

}
