import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DeliveryMansSavePage} from './delivery-mans-save.page';
import {UsersSavePageModule} from "../../user/save/users-save.module";

const routes: Routes = [
    {
        path: '',
        component: DeliveryMansSavePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        UsersSavePageModule
    ],
    declarations: [DeliveryMansSavePage]
})
export class DeliveryMansSavePageModule {
}
