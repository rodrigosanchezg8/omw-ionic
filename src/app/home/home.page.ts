import {Component} from '@angular/core';
import {AuthProvider} from "../../providers/AuthProvider";
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
        private userProvider: AuthProvider,
        private nativeStorage: NativeStorage,
        private loading: Loading,
        private router: Router) {
    }

    async signIn() {
        this.loading.present();
        const userRes = await this.userProvider.validateUser(this.email, this.password);
        this.loading.dismiss();
        if (!userRes.status || userRes.status !== 200)
            this.responses.presentResponse(userRes);
        else if (userRes.user && userRes.user.roles && userRes.user.roles.length)
            switch (userRes.user.roles[0].name) {
                case 'admin':
                    this.router.navigateByUrl('admin/tabs/clients');
                    break;
                case 'client':
                case 'company':
                    break;
                case 'delivery_man':
                    break;
                default:
                    this.responses.presentResponse({'message': 'This user has no role '});
                    break;
            }
        else
            this.responses.presentGenericalErrorResponse();
    }

}
