import { z } from "zod";

export const SignUpSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(5),
    name: z.string()
})

export const SigninSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(5),
})

export const ZapCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetaData: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetadata: z.any().optional()
    }))
});

