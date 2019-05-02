import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DeliveryAssignPage} from './delivery-assign.page';
import {MapModule} from "../../map/map.module";

const routes: Routes = [
    {
        path: '',
        component: DeliveryAssignPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MapModule
    ],
    declarations: [DeliveryAssignPage]
})
export class DeliveryAssignPageModule {
}
