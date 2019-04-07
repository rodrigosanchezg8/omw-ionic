import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DeliveryMenPage} from './delivery-men.page';

const routes: Routes = [
    {
        path: '',
        component: DeliveryMenPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    declarations: [DeliveryMenPage],
})
export class DeliveryMenPageModule {
}
