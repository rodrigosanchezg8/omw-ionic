import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DeliveryProductsPage} from './delivery-products.page';
import {MapModule} from "../../map/map.module";

const routes: Routes = [
    {
        path: '',
        component: DeliveryProductsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MapModule,
    ],
    declarations: [DeliveryProductsPage]
})
export class DeliveryProductsPageModule {
}
