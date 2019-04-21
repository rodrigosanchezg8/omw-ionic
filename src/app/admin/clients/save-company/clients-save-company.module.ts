import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClientsSaveCompanyPage} from './clients-save-company.page';
import {MapModule} from "../../../map/map.module";

const routes: Routes = [
    {
        path: '',
        component: ClientsSaveCompanyPage
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
    declarations: [ClientsSaveCompanyPage],
    exports: [ClientsSaveCompanyPage]
})
export class ClientsSaveCompanyPageModule {
}
