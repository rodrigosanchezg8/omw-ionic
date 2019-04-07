import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DeliveryMenSaveOptionsPage} from './delivery-men-save-options.page';

const routes: Routes = [    {
        path: '',
        component: DeliveryMenSaveOptionsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [DeliveryMenSaveOptionsPage]
})
export class DeliveryMenSaveOptionsPageModule {
}
