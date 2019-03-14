import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoadingController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class Loader {

    loading: any;
    displaying: boolean;

    constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
        this.displaying = false;
    }

    async present(msg: string = "Espere por favor...") {
        this.loading = await this.loadingCtrl.create({
            message: msg,
        });
        this.displaying = true;
        return this.loading.present();
    }

    dismiss() {
        if (this.displaying)
            this.loading.dismiss();

        this.displaying = false;
    }

}
