import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClientsSavePage} from './clients-save.page';
import {UsersSavePageModule} from "../../user/save/users-save.module";

const routes: Routes = [
    {
        path: '',
        component: ClientsSavePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        UsersSavePageModule
    ],
    declarations: [ClientsSavePage]
})
export class ClientsSavePageModule {
}
