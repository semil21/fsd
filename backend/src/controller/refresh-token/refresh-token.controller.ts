
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const refreshTokenController = (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).send({
            message: "No refresh token",
        });
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET as string
        ) as any;

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "15m" }
        );

        res.send({
            accessToken: newAccessToken,
        });

    } catch (err) {
        res.status(401).send({
            message: "Invalid refresh token",
        });
    }
};