import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClientSideSaveCompanyPage} from './client-side-save-company.page';
import {ClientsSaveCompanyPageModule} from "../../../admin/clients/save-company/clients-save-company.module";

const routes: Routes = [
    {
        path: '',
        component: ClientSideSaveCompanyPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ClientsSaveCompanyPageModule
    ],
    declarations: [ClientSideSaveCompanyPage]
})
export class ClientSideSaveCompanyPageModule {
}
