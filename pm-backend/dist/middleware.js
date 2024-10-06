"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!config_1.JWT_PASSWORD) {
            throw new Error('JWT_PASSWORD is not defined');
        }
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        //@ts-ignore
        req.id = payload.id;
        next();
    }
    catch (e) {
        return res.status(403).json({
            message: "Not looged in"
        });
    }
};
exports.authMiddleware = authMiddleware;
