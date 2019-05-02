import {Component, OnInit} from '@angular/core';
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";

@Component({
    selector: 'app-setup',
    templateUrl: './setup.page.html',
    styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {

    constructor(private storage: Storage,
                private router: Router) {
    }

    ngOnInit() {
    }

    async logout() {
        await this.storage.remove('authorization');
        await this.storage.remove('user');
        this.router.navigateByUrl('/', {replaceUrl: true});
    }

}
