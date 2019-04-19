import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {UsersSavePage} from "./users-save.page";
import {MapModule} from "../../../map/map.module";

const routes: Routes = [
    {
        path: '',
        component: UsersSavePage
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
    declarations: [UsersSavePage],
    exports: [UsersSavePage]
})
export class UsersSavePageModule {
}
