import { type NextFunction, type Response, type Request } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { Types } from 'mongoose';
import { JWT_PASSWORD } from "./config.js";

// Middleware to check if user is logged in via HTTP-only cookie. 
// If valid, it adds userId and userObjectId to the request object for downstream use.
export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        res.status(403).json({
            message: "You are not logged in"
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_PASSWORD);
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            });
            return;
        }
        req.userId = (decoded as JwtPayload).id;
        req.userObjectId = new Types.ObjectId(req.userId);
        next();
    } catch (e) {
        res.status(403).json({
            message: "You are not logged in"
        });
    }
}