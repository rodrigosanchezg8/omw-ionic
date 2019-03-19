import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {ImagePicker} from "@ionic-native/image-picker/ngx";

@Component({
    selector: 'app-clients-save',
    templateUrl: './clients-save.page.html',
    styleUrls: ['./clients-save.page.scss'],
})
export class ClientsSavePage implements OnInit {

    client: User;
    isEditMode: boolean;
    hasCompany: boolean;

    constructor(private imagePicker: ImagePicker) {
        this.isEditMode = false;
        if (!this.isEditMode)
            this.client = new User();
    }

    ngOnInit() {
    }

    async pickImage() {
        const options = {
            quality: 70,
            outputType: 1,
            maximumImagesCount: 1
        };

        try {
            const pictures = await this.imagePicker.getPictures(options)
            this.client.profileImage = 'data:image/jpeg;base64,' + pictures[0];
        } catch (e) {
            console.log(e);
        }
    }

    save() {

    }

}
