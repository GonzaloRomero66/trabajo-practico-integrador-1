export const ownerMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: "No estás autenticado"
        });
    }

    const userId = Number(req.params.id);

    if (req.user.role === "admin" || req.user.id === userId) {
        return next();
    }

    return res.status(403).json({
        message: "No tienes permisos para realizar esta acción"
    });
};