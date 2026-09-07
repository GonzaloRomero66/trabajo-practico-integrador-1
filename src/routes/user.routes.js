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
    getUserById
);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createUser
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateUser
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteUser
);

export default router;