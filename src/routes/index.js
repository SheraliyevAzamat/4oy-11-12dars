import express from "express"

import { userRouter } from "./users.routes.js"
import { blogRouter } from "./blog.routes.js"
import { commentRouter, } from "./comment.routes.js"

export const mainRouter = express.Router()

mainRouter.use('/users', userRouter)
mainRouter.use('/blogs', blogRouter)
mainRouter.use('/comments', commentRouter)
