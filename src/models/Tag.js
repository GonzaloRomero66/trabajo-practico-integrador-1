import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const TagModel = sequelize.define(
    "Tag",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

export default TagModel;