import ArticleModel from "../models/Article.js";
import UserModel from "../models/User.js";
import TagModel from "../models/Tag.js";

export const getArticles = async (req, res) => {
    try {
        const articles = await ArticleModel.findAll({
            where: {
                status: "published"
            },
            include: [
                {
                    model: UserModel,
                    as: "author",
                    attributes: ["id", "username", "email"]
                },
                {
                    model: TagModel,
                    as: "tags"
                }
            ]
        });

        return res.status(200).json(articles);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al obtener los artículos"
        });
    }
};


export const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await ArticleModel.findByPk(id, {
            include: [
                {
                    model: UserModel,
                    as: "author",
                    attributes: ["id", "username", "email"]
                },
                {
                    model: TagModel,
                    as: "tags"
                }
            ]
        });

        return res.status(200).json(article);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al obtener el artículo"
        });
    }
};


export const getMyArticles = async (req, res) => {
    try {
        const articles = await ArticleModel.findAll({
            where: {
                user_id: req.user.id
            },
            include: {
                model: TagModel,
                as: "tags"
            }
        });

        return res.status(200).json(articles);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al obtener tus artículos"
        });
    }
};


export const getArticlesByUser = async (req, res) => {
    try {
        const { id } = req.params;

        const articles = await ArticleModel.findAll({
            where: {
                user_id: id,
                status: "published"
            },
            include: {
                model: TagModel,
                as: "tags"
            }
        });

        return res.status(200).json(articles);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al obtener los artículos del usuario"
        });
    }
};


export const createArticle = async (req, res) => {
    try {
        const {
            title,
            content,
            excerpt,
            status
        } = req.body;

        const article = await ArticleModel.create({
            title,
            content,
            excerpt,
            status: status || "published",
            user_id: req.user.id
        });

        return res.status(201).json({
            message: "Artículo creado correctamente",
            article
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al crear el artículo"
        });
    }
};


export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await ArticleModel.findByPk(id);

        if (
            req.user.role !== "admin" &&
            article.user_id !== req.user.id
        ) {
            return res.status(403).json({
                message: "No tienes permisos para modificar este artículo"
            });
        }

        const {
            title,
            content,
            excerpt,
            status
        } = req.body;

        await article.update({
            title,
            content,
            excerpt,
            status
        });

        return res.status(200).json({
            message: "Artículo actualizado correctamente",
            article
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al actualizar el artículo"
        });
    }
};


export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await ArticleModel.findByPk(id);

        if (
            req.user.role !== "admin" &&
            article.user_id !== req.user.id
        ) {
            return res.status(403).json({
                message: "No tienes permisos para eliminar este artículo"
            });
        }

        await article.destroy();

        return res.status(200).json({
            message: "Artículo eliminado correctamente"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al eliminar el artículo"
        });
    }
};