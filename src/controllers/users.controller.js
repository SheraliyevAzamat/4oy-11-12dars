import fs from "fs"
import path from "path"

const userDataPath=process.cwd()
const pathh=path.join(userDataPath,"src","database","users.json")

const ReadData=(filePath)=>{
    if(!fs.existsSync(filePath)) return []
    const data=fs.readFileSync(filePath)
    return JSON.parse(data)
     
}
const writeData=(filePath,data)=>{
    fs.writeFileSync(filePath,JSON.stringify(data,null,2))
}

export const registerUser=(req,res)=>{
    const users=ReadData(pathh)
    const {username,password,email}=req.body

    const newUser={
        id:users.length+1,
        username,
        password,
        email
    }
    users.push(newUser)
    writeData(pathh,users)
    res.status(201).json({ message: "succesfully joined", user: newUser });
}

export const login=(req,res)=>{
    const users=ReadData(pathh)
    const {username,password}=req.body

    const userExists=users.find((user)=>user.username===username)
    if (!userExists)
        return res.status(404).send({ message: "User not found" });
    
      if (userExists.password !== password)
        return res.status(401).send({ message: "username or password are error" });
  res.status(200).json({ message: "Welcome!", ...userExists });
} 

export const getAllUsers=(req,res)=>{
    const users=ReadData(pathh)
    if(users.length==0){
        return res.status(404).json({ error: "Users lists are empty" });

    }
    res.status(200).json({ users });
}

export const getUserProfile=(req,res)=>{
    const users=ReadData(pathh)    
    const {id}=req.params    
    const user=users.find((user)=>user.id==id)
    if (!user) return res.status(404).json({ error: "User not found" });

  res.status(200).json(user);
}

export const updateUserProfile=(req,res)=>{
    const users=ReadData(pathh)
    const { username, password, email } = req.body;
    
    const user=users.find((user)=>user.id==id)
    
    if (!user) return res.status(404).json({ error: "user not found" });

  if (username && username.length >= 3) user.username = username;
  if (password && password.length >= 5) user.password = password;
  if (email) user.email = email;

  writeData(pathh, users);

  res.status(200).json({ message: "succesfully updated", user });
}

export const deleteUserProfile=(req,res)=>{
    const users=ReadData(pathh)
    const {id}=req.params

    const userIndex=users.findIndex((user)=>user.id==id)    
    if (userIndex===-1) return res.status(404).json({ error: "users not found" });

    users.splice(userIndex, 1)
    writeData(pathh, users)
  

  res.status(200).json({ message: "succesfully deleted" });

}