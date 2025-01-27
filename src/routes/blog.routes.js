import experss from "express"
import { registerBlog,getAllBlogs,getBlog,updateBlog,deleteBlog } from "../controllers/blog.controller.js"

export const blogRouter=experss.Router()

blogRouter.post("/create",registerBlog)
blogRouter.get("/", getAllBlogs)
blogRouter.get("/:id",getBlog)
blogRouter.put("/:id",updateBlog)
blogRouter.delete("/:id",deleteBlog)