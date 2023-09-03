import { UsersModel } from "../infra/models/users.model"
import { ICreate, IEmail, IPagination } from "../interfaces/users.interface";

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

    async findallUsers({pageNumber, pageSize}: IPagination) {
        const result = await UsersModel.find()
        .skip((pageNumber -1) * pageSize )
        .limit(pageSize).exec()

        return result
    }
}

export { UsersRepository }