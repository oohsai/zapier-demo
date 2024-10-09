"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZapCreateSchema = exports.SigninSchema = exports.SignUpSchema = void 0;
const zod_1 = require("zod");
exports.SignUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(5),
    name: zod_1.z.string()
});
exports.SigninSchema = zod_1.z.object({
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(5),
});
exports.ZapCreateSchema = zod_1.z.object({
    availableTriggerId: zod_1.z.string(),
    triggerMetaData: zod_1.z.any().optional(),
    actions: zod_1.z.array(zod_1.z.object({
        availableActionId: zod_1.z.string(),
        actionMetadata: zod_1.z.any().optional()
    }))
});
