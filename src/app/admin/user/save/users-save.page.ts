import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../models/User";
import {ImagePicker} from "@ionic-native/image-picker/ngx";
import {Api} from "../../../../providers/Api";
import {State} from "../../../models/State";
import {Responses} from "../../../traits/Responses";
import {StateProvider} from "../../../../providers/StateProvider";
import {ClientProvider} from "../../../../providers/ClientProvider";
import {Role} from "../../../models/Role";
import {ActivatedRoute, Router} from "@angular/router";
import {WideSharerService} from "../../../services/wide-sharer.service";

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
                private imagePicker: ImagePicker,
                private api: Api,
                private responses: Responses,
                private stateProvider: StateProvider,
                private clientProvider: ClientProvider,
                private route: ActivatedRoute,
                private wideSharerService: WideSharerService) {
    }

    async ngOnInit() {
        this.isEditMode = false;
        if (!this.isEditMode) {
            this.user = new User();
            this.route.params.subscribe(ps => {
                this.user.role.name = ps.role;
            });
        }
        this.states = <State[]>(await <any>this.stateProvider.getStates());
    }

    async pickImage() {

        const options = {
            quality: 70,
            outputType: 1,
            maximumImagesCount: 1
        };

        try {
            const pictures = await this.imagePicker.getPictures(options)
            this.user.profile_image = 'data:image/jpeg;base64,' + pictures[0];
        } catch (e) {
            console.log(e);
        }
    }

    async save() {
        const clientRes = await this.clientProvider.signUp(this.user,
            {password_confirmation: this.passwordConfirmation});
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
