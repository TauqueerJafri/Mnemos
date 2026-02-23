import { type NextFunction, type Response, type Request } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { Types } from 'mongoose';
import { JWT_PASSWORD } from "./config.js";

// Middleware to check if user is logged in.
export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, JWT_PASSWORD)
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })
            return;    
        }
        req.userId = (decoded as JwtPayload).id;
        next()
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}

// Utility function to get user ObjectId from request, returns null if not logged in
export const getUserObjectId = (req: Request, res: Response) => {
    if (!req.userId) {
        res.status(403).json({
            message: "You are not logged in"
        })
        return null;
    }

    return new Types.ObjectId(req.userId);
}