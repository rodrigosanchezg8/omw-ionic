import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthProvider} from "../providers/AuthProvider";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {IonicSelectableModule} from "ionic-selectable";
import {TabsPage} from "./admin/tabs/tabs.page";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
    declarations: [
        AppComponent,
        TabsPage,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        IonicSelectableModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthProvider,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
