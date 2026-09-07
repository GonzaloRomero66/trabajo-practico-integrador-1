import express  from 'express'
import dotenv from 'dotenv'
import { sequelize } from './src/config/database.js'
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js"
import "./src/models/relations.js";
dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser());

app.use("/auth", authRoutes);

console.log(process.env.PORT)
const port = process.env.PORT

await sequelize.sync()
app.listen(port, () => {
    console.log(`Tu base de datos esta en perfecto funcionamiento en el puerto ${port}`)
})