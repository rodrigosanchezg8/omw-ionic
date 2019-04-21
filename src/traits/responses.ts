import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AlertController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class Responses {

    isShowing = false;
    alert: any;

    constructor(private alertCtrl: AlertController) {
    }

    async presentGenericalErrorResponse(response = null) {
        this.isShowing = true;

        this.alert = await this.alertCtrl.create({
            header: response && response["title"] ? response["title"] : "Oooops!",
            message: response && response["message"] ? response["message"] : "Ocurrio algo inesperado," +
                " por favor intente de nuevo.",
            buttons: [
                {
                    text: 'OK',
                }
            ]
        });
        await this.alert.present();
        if (!this.isShowing)
            return this.dismiss();
    }

    async presentResponse(response, okCallback = undefined) {
        this.isShowing = true;

        this.alert = await this.alertCtrl.create({
            header: response['header'] ? response['header'] : 'Oooops!',
            message: response['error'] ? this.parseResponseErrors(response) : response['message'],
            buttons: [
                {
                    text: 'OK',
                    handler: okCallback ? okCallback : () => {
                    }
                }
            ]
        });

        await this.alert.present();
        if (!this.isShowing)
            return this.dismiss();
    }

    parseResponseErrors(response) {
        const errors = response.error.errors ? response.error.errors : response.error;
        return Object.keys(errors).map(key => {
            return errors[key][0] + "<br\>";
        }).join('');
    }

    async dismiss() {
        this.isShowing = false;
        return await this.alert.dismiss();
    }

}
