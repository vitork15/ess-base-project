import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController{
    userService: UserService

    constructor(){
        this.userService = new UserService()
    }

    async createUser(req: Request, res: Response){
        let name = req.body.name
        let user = await this.userService.createUser(name)
        return res.status(201).json(user)
    }
}

export default UserController