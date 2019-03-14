import {Component} from '@angular/core';
import {ResetPasswordPage} from "../reset-password/reset-password.page";
import {UserProvider} from "../../providers/user";
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import {Loader} from "../traits/Loader";
import {Responses} from "../traits/Responses";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    email: string;
    password: string;
    resetPasswordPage = ResetPasswordPage;

    constructor(
        private responses: Responses,
        private userProvider: UserProvider,
        private nativeStorage: NativeStorage,
        private loader: Loader) {
    }

    signIn() {
        this.loader.present();
        try {
            const userRes = this.userProvider.validateUser(this.email, this.password);
        } catch (e) {
            console.log(e)
        } finally {
            this.loader.dismiss();
        }
    }

}
