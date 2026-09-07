import { body, param } from "express-validator";
import TagModel from "../models/Tag.js";

export const validationCreateTag = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre de la etiqueta no puede estar vacío")
        .isLength({ min: 2, max: 30 })
        .withMessage("El nombre debe tener entre 2 y 30 caracteres")
        .matches(/^\S+$/)
        .withMessage("El nombre de la etiqueta no puede contener espacios")
        .custom(async (name) => {
            const tag = await TagModel.findOne({
                where: { name }
            });

            if (tag) {
                throw new Error("La etiqueta ya existe");
            }

            return true;
        })
];

export const validationTagId = [
    param("id")
        .isInt()
        .withMessage("El ID debe ser un número entero")
        .custom(async (id) => {
            const tag = await TagModel.findByPk(id);

            if (!tag) {
                throw new Error("La etiqueta no existe");
            }

            return true;
        })
];