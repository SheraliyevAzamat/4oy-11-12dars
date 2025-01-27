import fs from "fs"
import path from "path"

const userDataPath=process.cwd()
const pathh=path.join(userDataPath,"src","database","blogs.json")

const ReadData=(filePath)=>{
    if(!fs.existsSync(filePath)) return []
    const data=fs.readFileSync(filePath)
    return JSON.parse(data)
}
const writeData=(filePath,data)=>{
    fs.writeFileSync(filePath,JSON.stringify(data,null,2))
}


export const registerBlog=(req,res)=>{
    const blogs=ReadData(pathh)
    const {title,content,authorId}=req.body

    const newBlog={
       id:blogs.length+1,
       title,
       content,
       authorId
    }
    blogs.push(newBlog)
    writeData(pathh,blogs)
    res.status(201).json({ message: "succesfully joined", blog: newBlog });
}

export const getBlog=async(req,res)=>{
    const blogs= await ReadData(pathh)
    const {id}=req.params
    
    const blog=blogs.find((blog)=>blog.id==id)
    console.log(blog);
    
    if (!blog) {
        return res.status(404).json({ error: "not found" })
    }

    res.status(200).json(blog)
}

export const getAllBlogs=(req,res)=>{
    const blogs=ReadData(pathh)
    res.status(200).json(blogs)
}


export const updateBlog=(req,res)=>{
    const blogs=ReadData(pathh)
    const {id}=req.params
    const {title,content}=req.body

    const blog=blogs.find((blog)=>blog.id==id)
  if (!blog) {
    return res.status(404).json({ error: "not found" })
  }
  if(title)blog.title=title
  if(content)blog.content=content

  writeData(pathh , blogs)
  res.status(200).json(blog)
}


export const deleteBlog=(req,res)=>{
    const blogs=ReadData(pathh)
    const {id}=req.params

    const blog=blogs.findIndex((blog)=>blog.id==id)
    if(blog==-1){
    return res.status(404).json({ error: "not found" })
    }
    blogs.splice(blog)
    writeData(pathh,blogs)
  res.status(200).json({ message: "succesfully deleted" })

}
