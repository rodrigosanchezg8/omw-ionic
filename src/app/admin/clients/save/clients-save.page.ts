import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {ImagePicker} from "@ionic-native/image-picker/ngx";
import {Api} from "../../../../providers/Api";
import {State} from "../../../models/State";
import {Responses} from "../../../traits/Responses";
import {StateProvider} from "../../../../providers/StateProvider";
import {ClientProvider} from "../../../../providers/ClientProvider";
import {Role} from "../../../models/Role";
import {Router} from "@angular/router";

@Component({
    selector: 'app-clients-save',
    templateUrl: './clients-save.page.html',
    styleUrls: ['./clients-save.page.scss'],
})
export class ClientsSavePage implements OnInit {

    client: User;
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
                private clientProvider: ClientProvider) {
    }

    async ngOnInit() {
        this.isEditMode = false;
        if (!this.isEditMode) {
            this.client = new User();
            this.client.role = new Role();
            this.client.role.name = 'client';
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
            this.client.profile_image = 'data:image/jpeg;base64,' + pictures[0];
        } catch (e) {
            console.log(e);
        }
    }

    async save() {
        const clientRes = await this.clientProvider.signUp(this.client,
            {password_confirmation: this.passwordConfirmation});
        this.responses.presentResponse(clientRes, () => {
            if (clientRes.status === 200) {
                this.router.navigateByUrl('admin/tabs/clients');
            }
        })
    }

}
