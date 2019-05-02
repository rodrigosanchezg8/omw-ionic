import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoadingController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class Loading {

    isLoading = false;

    constructor(public http: HttpClient,
                public loadingController: LoadingController) {
    }

    async present(msg: string = 'Cargando...') {
        this.isLoading = true;
        const loader = await this.loadingController.create({
            duration: 5000,
            message: msg
        });
        await loader.present();
        if (!this.isLoading) {
            await loader.dismiss();
        }
    }

    async dismiss() {
        this.isLoading = false;
        return await this.loadingController.dismiss();
    }

}
