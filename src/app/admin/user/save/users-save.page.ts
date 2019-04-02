import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {ImagePicker} from "@ionic-native/image-picker/ngx";
import {ApiService} from "../../../../services/api.service";
import {State} from "../../../models/state";
import {Responses} from "../../../traits/Responses";
import {StateService} from "../../../../services/state.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../../../services/client.service";
import {UserService} from "../../../../services/user.service";

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
    selectedState: State;
    passwordConfirmation: string;

    constructor(private router: Router,
                private api: ApiService,
                private responses: Responses,
                private stateService: StateService,
                private clientService: ClientService,
                private userService: UserService,
                private route: ActivatedRoute) {
    }

    async ngOnInit() {
        try {
            this.route.params.subscribe(async ps => {
                if (ps.user) {
                    this.isEditMode = true;
                    this.user = await this.userService.get(ps.user) as User;
                    this.selectedState = this.user.city.state;
                } else {
                    this.user = new User();
                    this.user.role.name = ps.role;
                }
            });
            this.states = <State[]>(await <any>this.stateService.getStates());
        } catch (e) {
            this.responses.presentResponse({message: 'Error! no se pudieron obtener los parámetros.'});
        }
        console.log({user: this.user})
    }

    async pickImage() {

        const options = {
            quality: 70,
            outputType: 1,
            maximumImagesCount: 1
        };

        try {
            const pictures = await new ImagePicker().getPictures(options)
            this.user.profile_image = 'data:image/jpeg;base64,' + pictures[0];
        } catch (e) {
            console.log(e);
        }
    }

    async save() {

        let clientRes;
        if (this.isEditMode) {
            clientRes = await this.userService.signUp(this.user,
                {password_confirmation: this.passwordConfirmation});
        } else {
            clientRes = await this.userService.update(this.user,
                {password_confirmation: this.passwordConfirmation});
        }
        this.responses.presentResponse(clientRes, () => {
            if (clientRes.status === 200) {
                if (this.user.role.name === 'client' && this.hasCompany) {
                    this.router.navigate(['admin/tabs/clients/save-company', {userId: clientRes.user.id}]);
                } else if (this.user.role.name === 'delivery_man') {
                    this.router.navigate(['admin/tabs/delivery-mans/save-options',
                        {userId: clientRes.user.id}]);
                } else {
                    this.router.navigateByUrl('admin/tabs');
                }
            }
        });
    }

}
