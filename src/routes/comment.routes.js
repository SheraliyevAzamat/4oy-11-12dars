import experss from "express"
import { createCommit,getAllComment,getComment,updateComment,deleteComment } from "../controllers/comment.controller.js"

export const commentRouter=experss.Router()


commentRouter.post("/create",createCommit)
commentRouter.get("/",getAllComment)
commentRouter.get("/:id",getComment)
commentRouter.put("/:id",updateComment)
commentRouter.delete("/:id",deleteComment)