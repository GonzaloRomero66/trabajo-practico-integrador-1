import TagModel from "../models/Tag.js";
import ArticleModel from "../models/Article.js";

export const getTags = async (req, res) => {
    try {
        const tags = await TagModel.findAll({
            include: {
                model: ArticleModel,
                as: "articles"
            }
        });

        return res.status(200).json(tags);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al obtener las etiquetas"
        });
    }
};


export const getTagById = async (req, res) => {
    try {
        const { id } = req.params;

        const tag = await TagModel.findByPk(id, {
            include: {
                model: ArticleModel,
                as: "articles"
            }
        });

        return res.status(200).json(tag);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al obtener la etiqueta"
        });
    }
};


export const createTag = async (req, res) => {
    try {
        const { name } = req.body;

        const tag = await TagModel.create({
            name
        });

        return res.status(201).json({
            message: "Etiqueta creada correctamente",
            tag
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al crear la etiqueta"
        });
    }
};


export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const tag = await TagModel.findByPk(id);

        await tag.update({
            name
        });

        return res.status(200).json({
            message: "Etiqueta actualizada correctamente",
            tag
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al actualizar la etiqueta"
        });
    }
};


export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;

        const tag = await TagModel.findByPk(id);

        await tag.destroy();

        return res.status(200).json({
            message: "Etiqueta eliminada correctamente"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al eliminar la etiqueta"
        });
    }
};