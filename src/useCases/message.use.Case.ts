import { HttpException } from "../interfaces/HttpException";
import { MessageRepository } from "../repositories/message.repossitory";
import { UsersRepository } from "../repositories/user.repositories";

class Messages {
    private messageRepository: MessageRepository;
    private userRepository: UsersRepository;

    constructor() {
        this.messageRepository = new MessageRepository();
        this.userRepository = new UsersRepository()

    }

    async create(
        user_id: string,
        email_to_user: string,
        message_from_user: string,
        room_id: string
    ) {
        const findUserByEmail = await this.userRepository.findUserByEmail({
            email: email_to_user
        });

        if (!findUserByEmail) {
            throw new HttpException(400, "User not Found")
        }

        await this.messageRepository.create({
            to_user_id: findUserByEmail.id,
            from_user_id: user_id,
            bodyMessage: message_from_user,
            room_id,
        });

        return { message: 'save mesagem' };
    }
    async updateView(room_id: string, user_id: string, email_to_user: string) {

        const findUserByEmail = await this.userRepository.findUserByEmail({
            email: email_to_user
        });

        if (!findUserByEmail) {
            throw new HttpException(400, "User not Found")
        }
        const updateMessageUser = this.messageRepository.updateMessage(
            room_id,
            user_id,
            findUserByEmail.id
        );
        return updateMessageUser;
    }


}

export { Messages };