import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRoutes = Router()

const userController = new UserController()

userRoutes.post("/users",(req,res) => userController.createUser(req,res))
userRoutes.get("/users/:id", (req, res) => userController.getById(req,res))
userRoutes.delete("/users/:id", (req,res) => userController.deleteUser(req,res))
userRoutes.put("/users/:id", (req,res) => userController.updateUser(req,res))
userRoutes.post("/users/recovery",(req,res) => userController.recoverUser(req,res))
userRoutes.post("/users/recovery/:token",(req,res) => userController.changePassword(req,res))

export default userRoutes