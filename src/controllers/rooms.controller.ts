import { NextFunction, Request, Response } from "express";
import { Users } from "../useCases/user.useCase";
import { Rooms } from "../useCases/rooms.useCase";



class RoomsController {
    private roomsUserCase: Rooms;
    
    constructor() {
        this.roomsUserCase = new Rooms()
    }

    async store(request: Request, response: Response, next: NextFunction) {
        const { email } = request.body
        const { user_id } = request

        try {
            const result = await this.roomsUserCase.create(email, user_id)

            return response.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async show(request: Request, response: Response, next: NextFunction){
        const { email } =  request.params 
        const { user_id } =  request
        try {
            const result = await this.roomsUserCase.find(email, user_id)
           return response.status(200).json(result) 
        } catch (error) {
            next(error);
        }
    }


}

export { RoomsController };