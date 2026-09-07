import { body } from "express-validator";

export const validationUpdateProfile = [
    body("first_name")
        .trim()
        .notEmpty()
        .withMessage("El nombre no puede estar vacío")
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre debe tener entre 2 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("El nombre solo puede contener letras"),

    body("last_name")
        .trim()
        .notEmpty()
        .withMessage("El apellido no puede estar vacío")
        .isLength({ min: 2, max: 50 })
        .withMessage("El apellido debe tener entre 2 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("El apellido solo puede contener letras"),

    body("biography")
        .optional()
        .isLength({ max: 500 })
        .withMessage("La biografía no puede superar los 500 caracteres"),

    body("avatar_url")
        .optional()
        .isURL()
        .withMessage("El avatar_url debe ser una URL válida"),

    body("birth_date")
        .optional()
        .isISO8601()
        .withMessage("La fecha de nacimiento debe ser válida")
];