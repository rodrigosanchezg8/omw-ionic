import {Component} from '@angular/core';
import {Responses} from "../traits/Responses";
import {AuthProvider} from "../../providers/AuthProvider";
import {Loading} from "../traits/Loading";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {

    email: string;

    constructor(
        private userProvider: AuthProvider,
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
