import {Component} from '@angular/core';
import {UserProvider} from "../../providers/user";
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import {Loading} from "../traits/Loading";
import {Responses} from "../traits/Responses";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    email: string;
    password: string;

    constructor(
        private responses: Responses,
        private userProvider: UserProvider,
        private nativeStorage: NativeStorage,
        private loading: Loading,
        private router: Router) {
    }

    async signIn() {
        this.loading.present()
        try {
            const userRes = await this.userProvider.validateUser(this.email, this.password);
            if (userRes) {
                this.loading.dismiss();
                this.router.navigateByUrl('admin/tabs/delivery-mans')
            }
        } catch (e) {
            console.log(e)
        } finally {
            this.loading.dismiss();
        }
    }

}
