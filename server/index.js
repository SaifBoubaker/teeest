import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv"
import UserRouter from "./routes/user.js"

const app= express();
dotenv.config()
app.use(cors())
app.use(morgan("dev"))

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));

app.use("/users",UserRouter)


const PORT= process.env.PORT || PORT

mongoose.connect(process.env.CONNECTION_URL).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`)
    })
}).catch((error)=>{
    console.log(`${error} cant connect `)
})