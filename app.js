import express  from 'express'
import dotenv from 'dotenv'
import { sequelize } from './src/config/database.js'

const app = express()
app.use(express.json())


console.log(process.env.PORT)
const port = process.env.PORT

await sequelize.sync()
app.listen(port, () => {
    console.log(`Tu base de datos esta en perfecto funcionamiento en el puerto ${port}`)
})