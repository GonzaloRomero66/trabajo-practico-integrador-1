import { Router } from "express";

import {
    getTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

import {
    validationCreateTag,
    validationTagId
} from "../middlewares/Tag.validation.js";

import { validate } from "../middlewares/validate.js";

const router = Router();

router.get(
    "/",
    authMiddleware,
    getTags
);

router.get(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validationTagId,
    validate,
    getTagById
);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    validationCreateTag,
    validate,
    createTag
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validationTagId,
    validate,
    updateTag
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validationTagId,
    validate,
    deleteTag
);

export default router;