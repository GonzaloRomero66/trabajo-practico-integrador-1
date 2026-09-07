import { body, param } from "express-validator";
import ArticleModel from "../models/Article.js";
import UserModel from "../models/User.js";

export const validationCreateArticle = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("El título no puede estar vacío")
        .isLength({ min: 3, max: 200 })
        .withMessage("El título debe tener entre 3 y 200 caracteres"),

    body("content")
        .notEmpty()
        .withMessage("El contenido no puede estar vacío")
        .isLength({ min: 50 })
        .withMessage("El contenido debe tener mínimo 50 caracteres"),

    body("excerpt")
        .optional()
        .isLength({ max: 500 })
        .withMessage("El extracto no puede superar los 500 caracteres"),

    body("status")
        .optional()
        .isIn(["published", "archived"])
        .withMessage("El estado debe ser published o archived")
];

export const validationArticleId = [
    param("id")
        .isInt()
        .withMessage("El ID debe ser un número entero")
        .custom(async (id) => {
            const article = await ArticleModel.findByPk(id);

            if (!article) {
                throw new Error("El artículo no existe");
            }

            return true;
        })
];

export const validationUserId = [
    param("id")
        .isInt()
        .withMessage("El ID debe ser un número entero")
        .custom(async (id) => {
            const user = await UserModel.findByPk(id);

            if (!user) {
                throw new Error("El usuario no existe");
            }

            return true;
        })
];