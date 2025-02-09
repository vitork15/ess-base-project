import { Repository } from "typeorm";
import User from "../entities/user.entity";
import dbConn from "../database/postgresConnection";


class UserService{
    userRepository: Repository<User>

    constructor(){
        this.userRepository = dbConn.getRepository(User)
    }

    async createUser(name: string) : Promise<User>{
        let user = new User()
        user.name = name
        return await this.userRepository.save(user)
    }
}

export default UserService