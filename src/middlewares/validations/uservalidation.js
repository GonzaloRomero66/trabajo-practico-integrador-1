import { body, param } from "express-validator";
import UserModel from "../models/User.js";

export const validationCreateUser = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("El username no puede estar vacio")
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
        }),
  body("email")
        .trim()
        .notEmpty()
        .withMessage("El email no puede estar vacio")
        .isEmail()
        .withMessage("El email debe ser válido")
        .custom(async (email) => {
            const user = await UserModel.findOne({ where: { email } });

            if (user) {
                throw new Error("El email ya existe");
            }

            return true;
        }),

    body("password")
        .notEmpty()
        .withMessage("La contraseña no debe estar vacia")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener mínimo 8 caracteres")
        .matches(/[A-Z]/)
        .withMessage("La contraseña debe tener al menos una mayúscula")
        .matches(/[a-z]/)
        .withMessage("La contraseña debe tener al menos una minúscula")
        .matches(/[0-9]/)
        .withMessage("La contraseña debe tener al menos un número"),

    body("role")
        .optional()
        .isIn(["user", "admin"])
        .withMessage("El role debe ser user o admin")
];