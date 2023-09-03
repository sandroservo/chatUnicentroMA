import { MessageModel } from "../infra/models/message.model";
import { IMessage } from "../interfaces/message.interface";


class MessageRepository {
    async create({ to_user_id, from_user_id, bodyMessage, room_id }: IMessage) {
        const result = await MessageModel.create({
            to_user_id,
            from_user_id,
            body: bodyMessage,
            viewed_by_the_user: false,
            room_id,
        });

        return result
    }

    async findMessagesRoom(room_id: string, user_Id: string, to_user_id: string) {
        const result = await MessageModel.find({
            room_id,
            from_user_id: user_Id,
            to_user_id,
            viewed_by_the_user: false,
            
        })
        return result;
    }

    async updateMessage(room_id: string, user_Id: string, to_user_id: string) {
        const result = await MessageModel.updateMany({
            room_id,
            from_user_id: user_Id,
            to_user_id,
            viewed_by_the_user: false
        },
            {
                $set: { viewed_by_the_user: true }
            }
        )
        return result;
    }
}

export { MessageRepository }