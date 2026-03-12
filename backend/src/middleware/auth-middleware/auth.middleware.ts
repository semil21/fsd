import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyAuthToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).send({
                message: "No token provided",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY as string
        ) as any;

        (req as any).user = decoded;

        next();

    } catch (err) {
        return res.status(401).send({
            message: "Invalid or expired token",
        });
    }
};