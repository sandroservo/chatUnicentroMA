import { UsersModel } from "../infra/models/users.model"
import { ICreate, IEmail } from "../interfaces/users.interface";

class UsersRepository {
    async create({name, email, password}:ICreate) {
       const result = await UsersModel.create({
            name,
            email,
            password    
        });
        return result;
    }

    async findUserByEmail({ email }:IEmail) {
       const result = await UsersModel.findOne({ email });
       //console.log('🚀 ~ file: user.repository.ts:11 ~ UsersRepository ~findUserByEmail ~ result:', result)
        return result;
    }
}

export { UsersRepository }