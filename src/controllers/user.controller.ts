import { NextFunction, Request, Response } from "express";
import { Users } from "../useCases/user.useCase";



class UserController {
    private usersUserCase: Users;
    constructor() {
        this.usersUserCase = new Users()
    }

   async store(request :Request,  response :Response, next: NextFunction){
        const { name,  email, password } = request.body;

        try {
            const result = await this.usersUserCase.create({name,  email, password});
            return response.status(201).json(result)
        } catch (error) {
            next(error)
            
        }
    }

   async auth(request :Request,  response :Response, next: NextFunction){
        const {email, password}=  request.body;
        try {
            const result =  await this.usersUserCase.auth({ email, password })

            return response.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

   async getAllusers(request :Request,  response :Response, next: NextFunction){
      const {pageSize, pageNumber } = request.query;
      const DEFAULT_PAGE_SIZE = 2;
      const DEFAULT_PAGE_NUMBER = 1; 

      const number = pageNumber ? Number(pageNumber) : DEFAULT_PAGE_NUMBER;
      const size = pageSize ? Number(pageSize) : DEFAULT_PAGE_SIZE;

      try {
        const result = await this.usersUserCase.findAllusers({
             pageSize: size,
              pageNumber: number, 
            });

        return response.status(200).json(result)
      } catch (error) {
       next(error) 
      }
    }
}
 
export { UserController };