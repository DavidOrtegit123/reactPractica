import "dotenv/config"
import express from "express"
import morgan  from "morgan"
import indexRoutes from "./routes/index.routes.js"
import usersRoutes from "./routes/users.routes.js"
import loginRoutes from "./routes/login.routes.js"
import {connectDB} from "./utils/db.js" 

connectDB()
const app = express()
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

    if (req.method === "OPTIONS") {
        return res.sendStatus(200)
    }

    next()
})
app.use(express.json())
app.use(morgan("dev"))
app.use(indexRoutes)
app.use(loginRoutes)
app.use(usersRoutes)


const PORT = 8000
app.listen(PORT,console.log("http://localhost:"+PORT))
