import fs from "node:fs";
import path from "node:path";

const usersDataPath = process.cwd();
const pathh = path.join(usersDataPath, "src", "database", "comment.json");

const readData = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  console.log(data);
  
  return JSON.parse(data);
};

const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const createCommit =(req,res)=>{
    const comments=readData(pathh)
    const {postId,content,authorId}=req.body

    const newComment={
        id:comments.length+1,
        postId,
        content,
        authorId
    }
    comments.push(newComment)
    writeData(pathh,comments)
  res.status(201).json({ message: "Comment succesfully created",comment:comments});

}

export const getAllComment=(req,res)=>{
    const comments=readData(pathh)
    res.status(200).send({comments})
}

export const getComment=(req,res)=>{
    const comments=readData(pathh)
    const {id}=req.params
    const comment=comments.find((comment)=>comment.id==id)

    if (!comment) {
        return res.status(404).json({ error: "comment not found" });
      }
    
      res.status(200).json(comment);
}

export const updateComment=(req,res)=>{
    const comments=readData(pathh)
    const {id}=req.params
    const {content}=req.body
    const comment=comments.find((comment)=>comment.id==id)
    console.log(comment);
    
    if (!comment) {
        return res.status(404).json({ error: "comment not found" });
      }
    
      if (content) comment.content=content
    
      writeData(pathh,comments);
    
      res.status(200).json({ message: "comment succesfully updated", comment });
}

export const deleteComment=(req,res)=>{
    const comments=readData(pathh)
    const {id}=req.params
    const comment=comments.findIndex((comment)=>comment.id==id)
    console.log(comment);
    
    if (comment === -1) {
        return res.status(404).json({ error: "comment not found" });
      }
      comments.splice(comment)
      writeData(pathh,comments)
  res.status(200).json({ message: "comment succesfully deleted" });
}