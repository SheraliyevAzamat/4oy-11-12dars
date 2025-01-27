import express from "express"
import { registerUser, login, getAllUsers, getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/users.controller.js"

export const userRouter = express.Router()


userRouter.post("/register", registerUser)
userRouter.post("/login", login)
userRouter.get("/", getAllUsers)
userRouter.get("/:id", getUserProfile)
userRouter.put("/:id", updateUserProfile)
userRouter.delete("/:id", deleteUserProfile)
