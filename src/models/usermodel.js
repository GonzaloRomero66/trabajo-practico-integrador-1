import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";


const UserModel = sequelize.define("User", {
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user"
    }
}, 
    {
        paranoid: true,
        timestamps: true
})