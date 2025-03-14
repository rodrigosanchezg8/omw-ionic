import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {IonicModule} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from "../services/auth.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {IonicSelectableModule} from "ionic-selectable";
import {TabsPage} from "./admin/tabs/tabs.page";
import {IonicStorageModule} from "@ionic/storage";
import {DeliveryMenTabsPage} from "./delivery-men/tabs/delivery-men-tabs.page";
import {ClientsTabsPage} from "./clients/tabs/clients-tabs.page";
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {SocketIoConfig, SocketIoModule} from "ng-socket-io";
import {environment} from "../environments/environment.prod";

const config: SocketIoConfig = {url: environment.socketIP, options: {}};

@NgModule({
    declarations: [
        AppComponent,
        TabsPage,
        DeliveryMenTabsPage,
        ClientsTabsPage,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        SocketIoModule.forRoot(config),
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        IonicSelectableModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthService,
        ImagePicker,
        Geolocation
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
