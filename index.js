import express from 'express'
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from 'body-parser'
import user from "./routes/user.routes.js"
import todoModel from './routes/todo.routes.js'

dotenv.config()
const app = express()

//Port link or Default
const port = process.env.PORT || 3000

//DataBase Connection
mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log('Connected!'))
    .catch((error) => console.log(error.message))


// middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

//Base Routes for login and signup
app.use("/api/user", user)

//Base Routes for todo tasks
app.use("/api/todo", todoModel)

// Server Runs on localhost
app.listen(port, () => {console.log(`Server started on port ${port}`)})