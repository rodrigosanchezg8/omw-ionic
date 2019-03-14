import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AlertController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class Responses {

    constructor(private alertCtrl: AlertController) {
    }

    async presentAlertResponse(response) {
        const alert = await this.alertCtrl.create({
            header: response["title"],
            message: response["message"],
            buttons: [
                {
                    text: 'OK',
                }
            ]
        });
        return alert.present();
    }

}
