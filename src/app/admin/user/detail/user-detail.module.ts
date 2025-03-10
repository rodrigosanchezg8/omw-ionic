import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {UserDetailPage} from './user-detail.page';
import {MapModule} from "../../../map/map.module";

const routes: Routes = [
    {
        path: '',
        component: UserDetailPage
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
    declarations: [UserDetailPage],
    exports: [UserDetailPage]
})
export class UserDetailPageModule {
}
