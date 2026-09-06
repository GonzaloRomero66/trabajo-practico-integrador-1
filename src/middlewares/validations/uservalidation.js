import { body, param } from "express-validator";
import UserModel from "../models/User.js";

export const validationCreateUser = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("El username es obligatorio")
        .isLength({ min: 3, max: 20 })
        .withMessage("El username debe tener entre 3 y 20 caracteres")
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage("El username solo puede contener letras y números")
        .custom(async (username) => {
            const user = await UserModel.findOne({ where: { username } });

            if (user) {
                throw new Error("El username ya existe");
            }

            return true;
        })
]