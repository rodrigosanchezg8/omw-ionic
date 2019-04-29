import {Injectable} from '@angular/core';
import {AlertController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class ResponseService {

    isShowing = false;
    alert: any;

    constructor(private alertCtrl: AlertController) {
    }

    async presentGenericalErrorResponse(response = null) {
        const self = this;
        if (!this.isShowing) {
            this.isShowing = true;
            this.alert = await this.alertCtrl.create({
                header: response && response["title"] ? response["title"] : "Oooops!",
                message: response && response["message"] ? response["message"] : "Ocurrio algo inesperado," +
                    " por favor intente de nuevo.",
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            self.isShowing = false;
                        }
                    }
                ],
                backdropDismiss: false
            });
            await this.alert.present();
        }
    }

    async presentResponse(response, okCallback = undefined) {
        const self = this;
        if (!this.isShowing) {
            this.isShowing = true;
            this.alert = await this.alertCtrl.create({
                header: response['header'] ? response['header'] : 'Oooops!',
                message: response['error'] ? this.parseResponseErrors(response) : response['message'],
                buttons: [
                    {
                        text: 'OK',
                        handler: okCallback ? okCallback : () => {
                            self.isShowing = false;
                        }
                    },
                ],
                backdropDismiss: false
            });
            await this.alert.present();
        }
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
