import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {SetupPage} from './setup.page';
import {MapModule} from "../map/map.module";

const routes: Routes = [
    {
        path: '',
        component: SetupPage
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
    declarations: [SetupPage],
    exports: [SetupPage]
})
export class SetupPageModule {
}
