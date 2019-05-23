import {Component, OnInit, ViewChild} from '@angular/core';
import {Message} from "../../../models/message";
import {DeliveryMessagesService} from "../../../services/delivery-messages.service";
import {Loading} from "../../../traits/loading";
import {ResponseService} from "../../../services/response.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {User} from "../../../models/user";
import {DeliveryService} from "../../../services/delivery.service";
import {Socket} from "ng-socket-io";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-delivery-messages',
    templateUrl: './delivery-messages.page.html',
    styleUrls: ['./delivery-messages.page.scss'],
})
export class DeliveryMessagesPage implements OnInit {

    @ViewChild('content') private content: any;

    private currentUser: User;
    public message: Message;
    messagesSubscription: Subscription;

    constructor(private loading: Loading,
                private deliveryService: DeliveryService,
                private deliveryMessagesService: DeliveryMessagesService,
                private responses: ResponseService,
                private activatedRoute: ActivatedRoute,
                private storage: Storage,
                private socket: Socket,
                private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {
        this.message = new Message();
    }

    async ionViewWillEnter() {
        this.currentUser = await this.storage.get('user');

        this.socket.on('connect', () => {
        });

        await this.requestHistoryEvent();
        await this.subscribeSocketMessages();
    }

    ionViewDidLeave() {
        this.messagesSubscription.unsubscribe();
        this.deliveryMessagesService.messages = [];
    }

    getMessages() {
        return new Observable(observer => {
            this.socket.on('private-delivery:' + this.deliveryService.delivery.id, (data) => {
                observer.next(data);
            });
        });
    }

    async requestHistoryEvent() {
        if (!this.deliveryService.delivery)
            return;

        await this.loading.present("Cargando mensajes...");
        return await this.deliveryMessagesService.requestByDelivery(this.deliveryService.delivery.id)
            .then(async (observable: any) => {
                return await observable.subscribe(async response => {
                    return response;
                }, async () => {
                    this.responses.presentResponse({message: 'No se pudieron obtener los mensajes de este tema'});
                    return await this.loading.dismiss()
                });
            }, async () => await this.loading.dismiss());
    }

    subscribeSocketMessages() {
        this.messagesSubscription = this.getMessages().subscribe((socketMessagesData: any) => {
                switch (socketMessagesData.event) {
                    case 'App\\Events\\DeliveryMessagesHistoryRequested':
                        if (!this.deliveryMessagesService.messages.length &&
                            this.deliveryService.delivery.id === socketMessagesData.data.delivery.id) {
                            for (let message of socketMessagesData.data.delivery.messages) {
                                let newMessage = new Message().deserialize(message).setClass(this.currentUser.id);
                                this.deliveryMessagesService.messages.push(newMessage);
                            }
                        }
                        setTimeout(() => this.content.scrollToBottom(), 300);
                        break;
                    case 'App\\Events\\NewMessage':
                        if (socketMessagesData.data.message &&
                            socketMessagesData.data.message.delivery.id === this.deliveryService.delivery.id) {
                            let newMessage = new Message().deserialize(socketMessagesData.data.message)
                                .setClass(this.currentUser.id);
                            this.deliveryMessagesService.messages.push(newMessage);
                            setTimeout(() => this.content.scrollToBottom(), 300);
                        }
                }
            },
            () => {
                this.responses.presentResponse({message: 'Error al obtener los mensajes.'});
            });
    }

    async sendMessage() {
        this.message.user_id_receiver = this.currentUser.role.name === 'admin' ?
            this.deliveryService.delivery.receiver_id : 1;

        this.loading.present('Enviando mensaje...');

        try {
            await this.deliveryMessagesService.store(this.deliveryService.delivery.id, this.message);
            this.loading.dismiss();

            this.message.body = "";
            this.message.file_name = null;
            this.message.base64_file = null;

            this.content.resize();
            this.content.scrollToBottom();

        } catch (e) {
            this.loading.dismiss();
        }
    }


}
