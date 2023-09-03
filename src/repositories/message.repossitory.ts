import { MessageModel } from "../infra/models/message.model";
import { IMessage } from "../interfaces/message.interface";


class MessageRepository {
    async create({to_user_id, from_user_id, bodyMessage, room_id }:IMessage) {
      const result =  await MessageModel.create({
        to_user_id,
        from_user_id,
        body:bodyMessage,
        viewed_by_the_user: false,
        room_id
      });

      return result

    
    }
}

export { MessageRepository }