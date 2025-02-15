import { Repository } from "typeorm";
import User from "../entities/user.entity";
import dbConn from "../database/postgresConnection";


class UserService{
    userRepository: Repository<User>

    constructor(){
        this.userRepository = dbConn.getRepository(User)
    }

    async insertUser(name: string, login: string, email: string, password: string, birthday: Date) : Promise<User>{
        let user = new User()

        user.name = name
        user.login = login
        user.email = email
        user.password = password
        user.birthday = birthday

        return await this.userRepository.save(user)
    }

    async getUserById(id: number) : Promise<User>{
        let user = await this.userRepository.findOne({where:{userID:id}})
        if(!user){
            throw new Error("user not found")
        }

        return user
    }

    async deleteUser(id: number) : Promise<User>{
        let user = await this.userRepository.findOne({where:{userID:id}})
        if(!user){
            throw new Error("user not found!")
        }
        await this.userRepository.delete(user.userID)

        return user
    }

    async updateUser(id:number, name: string, login: string, password: string, birthday: Date) : Promise<User> {
        let user = await this.userRepository.findOne({where:{userID:id}})
        if(!user){
            throw new Error("user not found")
        }
        user.name = name
        user.login = login
        user.password = password
        user.birthday = birthday

        return await this.userRepository.save(user)
    }
}

export default UserService