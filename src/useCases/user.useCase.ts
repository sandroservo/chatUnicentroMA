
import { sign } from "jsonwebtoken";
import { IAuth, ICreate } from "../interfaces/users.interface";
import { UsersRepository } from "../repositories/user.repositories";
import { compare, hash } from 'bcrypt'
class Users {
    private usersRepository: UsersRepository;


    constructor() {
        this.usersRepository = new UsersRepository()
    }

    async create({ name, email, password }: ICreate) {
        //const usersRepository =  new UsersRepository()
        //varifica se o  ususario  existe se  existir  retorna um  erro
        const findUser = await this.usersRepository.findUserByEmail({
            email,
        });
        if (findUser){
            throw new Error("User Exists");
            
        }
        const hashPassword = await hash(password, 10)
        const result =  await this.usersRepository.create({ name, email, password: hashPassword })
        return result;
    }

    update() {

    }

    async auth({ email, password }: IAuth) {
        const findUser = await this.usersRepository.findUserByEmail({
            email,
        });
        if (!findUser){
            throw new Error("User Exists");
        }

        const passwordMatch = await compare(password, findUser.password!);

        if(!passwordMatch){
            throw new Error('User or password invalid');
        }

        const secretKey = process.env.TOKEN_SECRET;
        if(!process.env.TOKEN_SECRET){
            throw new Error('TOKEN_SECRET not found')
        }
        
        if(!secretKey){
            throw new Error('There is no secret Key')
        }

        const token = sign({ name: findUser.name, user_id: findUser.id, email  },
         secretKey,
         {
          expiresIn: '7d',  
         },
         );

         return {
            token,
            user: {
                email: findUser.email,
                name: findUser.name,
            },
         };
    }
}

export { Users };