import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DeliveryMessagesPage} from './delivery-messages.page';
import {SocketIoConfig, SocketIoModule} from "ng-socket-io";
import {environment} from "../../../environments/environment.prod";

const socketConfig: SocketIoConfig = {url: environment.socketIP, options: {}};

const routes: Routes = [
    {
        path: '',
        component: DeliveryMessagesPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SocketIoModule.forRoot(socketConfig)
    ],
    declarations: [DeliveryMessagesPage]
})

export class DeliveryMessagesPageModule {
}
