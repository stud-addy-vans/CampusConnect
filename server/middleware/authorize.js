// server/middleware/authorize.js

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Forbidden: User with role '${req.user.role}' cannot access this resource.`
            });
        }
        next();
    };
};