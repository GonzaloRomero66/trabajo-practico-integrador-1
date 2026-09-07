import ArticleTagModel from "../models/ArticleTag.js";
import ArticleModel from "../models/Article.js";

export const addTagToArticle = async (req, res) => {
    try {
        const { article_id, tag_id } = req.body;

        const article = await ArticleModel.findByPk(article_id);

        if (
            req.user.role !== "admin" &&
            article.user_id !== req.user.id
        ) {
            return res.status(403).json({
                message: "No tienes permisos para modificar este artículo"
            });
        }

        const existingRelation = await ArticleTagModel.findOne({
            where: {
                article_id,
                tag_id
            }
        });

        if (existingRelation) {
            return res.status(400).json({
                message: "La etiqueta ya está asociada al artículo"
            });
        }

        const articleTag = await ArticleTagModel.create({
            article_id,
            tag_id
        });

        return res.status(201).json({
            message: "Etiqueta agregada al artículo correctamente",
            articleTag
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al agregar la etiqueta al artículo"
        });
    }
};


export const removeTagFromArticle = async (req, res) => {
    try {
        const { articleTagId } = req.params;

        const articleTag = await ArticleTagModel.findByPk(articleTagId);

        const article = await ArticleModel.findByPk(
            articleTag.article_id
        );

        if (
            req.user.role !== "admin" &&
            article.user_id !== req.user.id
        ) {
            return res.status(403).json({
                message: "No tienes permisos para modificar este artículo"
            });
        }

        await articleTag.destroy();

        return res.status(200).json({
            message: "Etiqueta eliminada del artículo correctamente"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al eliminar la etiqueta del artículo"
        });
    }
};