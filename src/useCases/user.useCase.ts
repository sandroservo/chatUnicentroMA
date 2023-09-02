
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

        const secretkey = 'unicentrochat'
    }
}

export { Users };