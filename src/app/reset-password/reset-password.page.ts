import {Component} from '@angular/core';
import {Loader} from "../traits/Loader";
import {Responses} from "../traits/Responses";
import {UserProvider} from "../../providers/user";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {

    email: string;

    constructor(
        private userProvider: UserProvider,
        private responser: Responses,
        private loader: Loader) {
    }

    async sendResetPasswordLink() {
        this.loader.present();
        try {
            const userRes = await this.userProvider.sendResetPasswordLink(this.email);
            this.loader.dismiss();
            this.responser.presentAlertResponse(userRes);
        } catch (e) {
            console.log(e);
            this.loader.dismiss();
        }
    }

}
