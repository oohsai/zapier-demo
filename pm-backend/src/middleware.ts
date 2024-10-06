import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export const authMiddleware = (req:Request, res: Response, next:NextFunction) => {
    const token = req.headers.authorization as unknown as string;

    try {
        if (!JWT_PASSWORD) {
            throw new Error('JWT_PASSWORD is not defined');
        }       
        const payload = jwt.verify(token, JWT_PASSWORD);
        //@ts-ignore
        req.id = payload.id;
        next();
    } catch (e) {
        return res.status(403).json({
            message: "Not looged in"
        })
    }
}