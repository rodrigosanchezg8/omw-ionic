import {User} from "./user";

export class Message {
    id: number;
    body: string;
    delivery_id: number;
    user_id_replier: number;
    user_id_receiver: number;
    status: string;
    created_at: Date;
    updated_at: Date;

    replier: User;
    receiver: User;

    file_name: string;
    class: string;
    base64_file: string;

    deserialize(object: Message) {
        Object.assign(this, object);
        return this;
    }

    public setClass(id) {
        console.log({current: id, replier: this.user_id_replier})
        this.class = this.user_id_replier === id ? 'message sent' : 'message received';
        return this;
    }

}
