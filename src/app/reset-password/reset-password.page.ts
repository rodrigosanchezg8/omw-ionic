import {Component} from '@angular/core';
import {Responses} from "../traits/Responses";
import {AuthService} from "../../services/auth.service";
import {Loading} from "../traits/Loading";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {

    email: string;

    constructor(
        private userProvider: AuthService,
        private responser: Responses,
        private loading: Loading) {
    }

    async sendResetPasswordLink() {
        this.loading.present();
        try {
            const userRes = await this.userProvider.sendResetPasswordLink(this.email);
            this.loading.dismiss();
            this.responser.presentGenericalErrorResponse(userRes);
        } catch (e) {
            console.log(e);
            this.loading.dismiss();
        }
    }

}
