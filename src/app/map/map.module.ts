import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgmCoreModule} from "@agm/core";
import {MapComponent} from "./map.component";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

@NgModule({
    declarations: [MapComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyASJrC_foKYvTcXKAE66oeuky526W-X3q4',
            libraries: ["places"]
        })
    ],
    exports: [
        MapComponent
    ]
})
export class MapModule {
}
