import { Request, Response } from "express";
import UserService from "../services/user.service";
import { plainToInstance } from "class-transformer";
import CriarUserDTO from "../dto/criarUser.dto";
import EditarUserDTO from "../dto/editarUser.dto";
import { validate } from "class-validator";

class UserController{
    userService: UserService

    constructor(){
        this.userService = new UserService()
    }

    async createUser(req: Request, res: Response){

        const createDTO = plainToInstance(CriarUserDTO,req.body)
        const errors = await validate(createDTO, {forbidNonWhitelisted:true, whitelist:true})
        if(errors.length > 0){
            return res.status(400).json("wrong body format")
        }
        let name = createDTO.name
        let login = createDTO.login
        let email = createDTO.email
        let password = createDTO.password
        let birthday = createDTO.birthday

        let userInserted = null
        try{
            userInserted = await this.userService.insertUser(name, login, email, password, birthday)
        }catch(error){
            const message = error instanceof Error ? error.message : "ERRO"
            return res.status(400).json(message)
        }

        return res.status(201).json(userInserted)
    }

    async getById(req: Request, res: Response){
        const id = parseInt(req.params.id)
        let user = null
        try{
            user = await this.userService.getUserById(id)
        }catch(error){
            const message = error instanceof Error ? error.message : "ERRO"
            return res.status(404).json(message)
        }

        return res.status(200).json(user)
        
    }

    async deleteUser(req: Request, res: Response){
        let id = parseInt(req.params.id)
        let user = null
        try {
            user = await this.userService.deleteUser(id)
        } catch (error) {
            const message = error instanceof Error ? error.message : "ERRO"
            return res.status(400).json(message)
        }
        return res.status(200).json(user)
    }

    async updateUser(req: Request,res: Response){
        let id = parseInt(req.params.id)
        const updateDTO = plainToInstance(EditarUserDTO, req.body)
        const errors = await validate(updateDTO, {forbidNonWhitelisted:true, whitelist:true})
        if(errors.length > 0){
            return res.status(400).json("wrong body format")
        }
        let user = null
        try{
            user = await this.userService.updateUser(id,updateDTO.name,updateDTO.login,updateDTO.password,updateDTO.birthday)
        }catch(error){
            const message = error instanceof Error ? error.message : "ERRO"
            return res.status(400).json(message)
        }
        return res.status(200).json(user)
    }

    async recoverUser(req: Request,res: Response){
        let email = req.params.email

        let recovery = null
        try{
            recovery = await this.userService.recoverUser(email)
        }catch(error){
            const message = error instanceof Error ? error.message : "ERRO"
            return res.status(400).json(message)
        }
        return res.status(200).json(recovery)
    }
}

export default UserController