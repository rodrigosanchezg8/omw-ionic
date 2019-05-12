import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DeliveryManTrackerPage} from './delivery-man-tracker.page';
import {MapModule} from "../../map/map.module";

const routes: Routes = [
    {
        path: '',
        component: DeliveryManTrackerPage
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
    declarations: [DeliveryManTrackerPage]
})
export class DeliveryManTrackerPageModule {
}
