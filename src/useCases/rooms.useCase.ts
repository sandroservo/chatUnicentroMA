import { HttpException } from "../interfaces/HttpException";
import { RoomsRepository } from "../repositories/rooms.repository";
import { UsersRepository } from "../repositories/user.repositories";

class Rooms {
    private roomsRepository: RoomsRepository;
    private usersRepository: UsersRepository

    constructor() {
        this.roomsRepository = new RoomsRepository()
        this.usersRepository = new UsersRepository()
    }

    async create(email: string, user_id: string){
        const findDestinationUserId = await this.usersRepository.findUserByEmail({email});

        if(!findDestinationUserId){
            throw new HttpException(400,'user note found')
        }

        const result =  await this.roomsRepository.create({
            user_id_joined_room: findDestinationUserId.id, 
            user_id_created_room: user_id,
        });
        return result;
    }

    async find(email: string, user_id: string){
        const findDestinationUserId = await this.usersRepository.findUserByEmail({
            email,
        });

        if(!findDestinationUserId){
            throw new HttpException(400,'user note found')
        }
        const findRoom = await this.roomsRepository.find({
            user_id_joined_room: findDestinationUserId.id, 
            user_id_created_room: user_id,
         });

         //console.log('🚀 ~ file: rooms.useCase.ts: 39 ~ Rooms ~ find ~ findRoom:', findRoom)
         
         return findRoom;
    }

} 

export { Rooms };