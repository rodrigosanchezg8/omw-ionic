import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DeliveryMenDetailPage} from './delivery-men-detail.page';
import {UserDetailPageModule} from "../../user/detail/user-detail.module";

const routes: Routes = [
    {
        path: '',
        component: DeliveryMenDetailPage
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
    declarations: [DeliveryMenDetailPage]
})
export class DeliveryMenDetailPageModule {
}
