import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Loading} from "../../traits/loading";
import {ResponseService} from "../../services/response.service";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    email: string;
    password: string;

    constructor(
        private responses: ResponseService,
        private userProvider: AuthService,
        private loading: Loading,
        private router: Router,
        private storage: Storage) {
    }

    async signIn() {
        this.loading.present();
        const userRes = await this.userProvider.validateUser(this.email, this.password) as any;
        this.loading.dismiss();
        console.log({userRes: userRes})
        if (!userRes.status || userRes.status !== 200)
            this.responses.presentResponse(userRes);
        else if (userRes.user && userRes.user.role) {
            this.storage.set('authorization', userRes.token_type + ' ' + userRes.access_token);
            this.storage.set('user', userRes.user);
            switch (userRes.user.role.name) {
                case 'admin':
                    this.router.navigateByUrl('admin/tabs', {replaceUrl: true});
                    break;
                case 'client':
                    this.router.navigateByUrl('clients/tabs', {replaceUrl: true});
                case 'company':
                    break;
                case 'delivery_man':
                    this.router.navigateByUrl('delivery-men/tabs', {replaceUrl: true});
                    break;
                default:
                    this.responses.presentResponse({'message': 'This user has no role '});
                    break;
            }
        } else
            this.responses.presentGenericalErrorResponse();
    }

}
