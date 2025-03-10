import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClientsTabsPage} from './clients-tabs.page';
import {SetupPageModule} from "../../setup/setup.module";
import {ClientDeliveriesPageModule} from "../../deliveries/client-deliveries.module";

const routes: Routes = [
    {
        path: '',
        component: ClientsTabsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    declarations: [ClientsTabsPage]
})
export class ClientsTabsPageModule {
}
