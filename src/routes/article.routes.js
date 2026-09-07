import { Router } from "express";

import {
    getArticles,
    getArticleById,
    getMyArticles,
    getArticlesByUser,
    createArticle,
    updateArticle,
    deleteArticle
} from "../controllers/article.controller.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
    validationCreateArticle,
    validationArticleId,
    validationUserId
} from "../middlewares/Article.validation.js";

import { validate } from "../middlewares/validate.js";

const router = Router();

router.get(
    "/",
    authMiddleware,
    getArticles
);

router.get(
    "/user",
    authMiddleware,
    getMyArticles
);

router.get(
    "/user/:id",
    authMiddleware,
    validationUserId,
    validate,
    getArticlesByUser
);

router.get(
    "/:id",
    authMiddleware,
    validationArticleId,
    validate,
    getArticleById
);

router.post(
    "/",
    authMiddleware,
    validationCreateArticle,
    validate,
    createArticle
);

router.put(
    "/:id",
    authMiddleware,
    validationArticleId,
    validate,
    updateArticle
);

router.delete(
    "/:id",
    authMiddleware,
    validationArticleId,
    validate,
    deleteArticle
);

export default router;