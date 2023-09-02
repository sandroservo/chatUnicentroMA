import { NextFunction, Request, Response } from "express";
import { Users } from "../useCases/user.useCase";



class UserController {
    private usersUserCase: Users;
    constructor() {
        this.usersUserCase = new Users()
    }

   async store(resquest :Request,  response :Response, next: NextFunction){
        const { name,  email, password } = resquest.body;

        try {
            const result = await this.usersUserCase.create({name,  email, password});
            return response.status(201).json(result)
        } catch (error) {
            next(error)
            
        }
    }

   async auth(resquest :Request,  response :Response, next: NextFunction){
        const {email, password}=  resquest.body;
        try {
            const result =  await this.usersUserCase.auth({ email, password })

            return response.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}
 
export {UserController};