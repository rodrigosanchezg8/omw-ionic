import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AlertController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class Responses {

    constructor(private alertCtrl: AlertController) {
    }

    async presentGenericalErrorResponse(response = null) {
        const alert = await this.alertCtrl.create({
            header: response && response["title"] ? response["title"] : "Oooops!",
            message: response && response["message"] ? response["message"] : "Ocurrio algo inesperado," +
                " por favor intente de nuevo.",
            buttons: [
                {
                    text: 'OK',
                }
            ]
        });
        return alert.present();
    }

    async presentResponse(response, okCallback = undefined) {
        let alert = await this.alertCtrl.create({
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
        return alert.present();
    }

    parseResponseErrors(response) {
        const errors = response.error.errors ? response.error.errors : response.error;
        return Object.keys(errors).map(key => {
            return errors[key][0] + "<br\>";
        }).join('');
    }

}
