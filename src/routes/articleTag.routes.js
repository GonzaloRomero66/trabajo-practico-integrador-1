import { Router } from "express";

import {
    addTagToArticle,
    removeTagFromArticle
} from "../controllers/articleTag.controller.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
    validationCreateArticleTag,
    validationArticleTagId
} from "../middlewares/ArticleTag.validation.js";

import { validate } from "../middlewares/validate.js";

const router = Router();

router.post(
    "/",
    authMiddleware,
    validationCreateArticleTag,
    validate,
    addTagToArticle
);

router.delete(
    "/:articleTagId",
    authMiddleware,
    validationArticleTagId,
    validate,
    removeTagFromArticle
);

export default router;