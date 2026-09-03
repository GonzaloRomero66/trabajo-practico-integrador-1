import { Sequelize } from "sequelize";
import  dotenv  from "dotenv";
import { error } from "node:console";

dotenv.config()
export const sequelize = new Sequelize(
    process.env.DB_USER,
    process.env.DB_NAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
)
export const startDB = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("Tu base de datos esta funcionando")
    }
    catch (error){
        console.log(error)
        console.log("Error en arrancar el servidor", error)
    }
}