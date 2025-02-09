import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRoutes = Router()

const userController = new UserController()

userRoutes.post("/users",(req,res) => userController.createUser(req,res))

export default userRoutes