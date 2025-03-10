import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {FeedbackPage} from './feedback.page';
import {PlotlyModule} from "angular-plotly.js";

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import {ChartsModule} from "ng2-charts";

PlotlyModule.plotlyjs = PlotlyJS;

const routes: Routes = [
    {
        path: '',
        component: FeedbackPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        PlotlyModule,
        ChartsModule
    ],
    declarations: [
        FeedbackPage,
    ]
})
export class FeedbackPageModule {
}
