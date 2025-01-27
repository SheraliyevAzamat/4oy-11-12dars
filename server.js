import express, { json } from "express"
import { mainRouter } from "./src/routes/index.js"

const app=express()
const port = 4000

app.use(express.json())

app.use('/', mainRouter);

app.listen(port, () => {
  console.log('Server is running port: http://localhost:'+port);
});