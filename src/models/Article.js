import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const ArticleModel = sequelize.define(
    "Article",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        excerpt: {
            type: DataTypes.STRING(500),
            allowNull: true
        },

        status: {
            type: DataTypes.ENUM("published", "archived"),
            allowNull: false,
            defaultValue: "published"
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true,
        paranoid: true
    }
);

export default ArticleModel;