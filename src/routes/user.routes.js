import { Router } from "express";

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

import {
    validationCreateUser,
    validationId
} from "../middlewares/User.validation.js";

import { validate } from "../middlewares/validate.js";

const router = Router();

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getUsers
);

router.get(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validationId,
    validate,
    getUserById
);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    validationCreateUser,
    validate,
    createUser
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validationId,
    validate,
    updateUser
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validationId,
    validate,
    deleteUser
);

export default router;