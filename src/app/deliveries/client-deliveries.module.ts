import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClientDeliveriesPage} from './client-deliveries.page';
import {MapModule} from "../map/map.module";

const routes: Routes = [
    {
        path: '',
        component: ClientDeliveriesPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    declarations: [ClientDeliveriesPage]
})
export class ClientDeliveriesPageModule {
}
