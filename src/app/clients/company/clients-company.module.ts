import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClientsCompanyPage} from './clients-company.page';
import {MapModule} from "../../map/map.module";

const routes: Routes = [
    {
        path: '',
        component: ClientsCompanyPage
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
    declarations: [ClientsCompanyPage]
})
export class ClientsCompanyPageModule {
}
