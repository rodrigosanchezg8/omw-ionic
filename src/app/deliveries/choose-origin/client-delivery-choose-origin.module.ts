import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClientDeliveryChooseOriginPage} from './client-delivery-choose-origin.page';
import {MapModule} from "../../map/map.module";

const routes: Routes = [
    {
        path: '',
        component: ClientDeliveryChooseOriginPage
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
    declarations: [ClientDeliveryChooseOriginPage]
})
export class ClientDeliveryChooseOriginPageModule {
}
