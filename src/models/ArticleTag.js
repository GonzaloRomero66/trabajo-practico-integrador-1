import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const ArticleTagModel = sequelize.define(
    "ArticleTag",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

export default ArticleTagModel;