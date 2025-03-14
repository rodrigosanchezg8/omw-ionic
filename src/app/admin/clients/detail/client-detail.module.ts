import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClientDetailPage} from './client-detail.page';
import {UserDetailPageModule} from "../../user/detail/user-detail.module";

const routes: Routes = [
    {
        path: '',
        component: ClientDetailPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        UserDetailPageModule
    ],
    declarations: [ClientDetailPage]
})
export class ClientDetailPageModule {
}
