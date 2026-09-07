import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const ProfileModel = sequelize.define(
    "Profile",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },

        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        biography: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        avatar_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    },
    {
        timestamps: true
    }
);

export default ProfileModel;