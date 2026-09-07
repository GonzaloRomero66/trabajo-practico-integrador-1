import { body, param } from "express-validator";
import ArticleModel from "../models/Article.js";
import TagModel from "../models/Tag.js";

export const validationCreateArticleTag = [
    body("article_id")
        .notEmpty()
        .withMessage("El article_id es obligatorio")
        .isInt()
        .withMessage("El article_id debe ser un número entero")
        .custom(async (article_id) => {
            const article = await ArticleModel.findByPk(article_id);

            if (!article) {
                throw new Error("El artículo no existe");
            }

            return true;
        }),

    body("tag_id")
        .notEmpty()
        .withMessage("El tag_id es obligatorio")
        .isInt()
        .withMessage("El tag_id debe ser un número entero")
        .custom(async (tag_id) => {
            const tag = await TagModel.findByPk(tag_id);

            if (!tag) {
                throw new Error("La etiqueta no existe");
            }

            return true;
        })
];

export const validationArticleTagId = [
    param("articleTagId")
        .isInt()
        .withMessage("El articleTagId debe ser un número entero")
];