import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignUpSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import  {JWT_PASSWORD}  from "../config";

const router = Router();

//@ts-ignore
router.post("/signup", async (req,res) => {
    const body = req.body;
    const parsedData = SignUpSchema.safeParse(body);
    if(!parsedData.success){
        return res.status(403).json({
            message: "error while signing up"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    })

    if(userExists){
        return res.status(403).json({
            message: "user already exists"
        })
    }

    await prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    })

    //await sendEmail();

    return res.json({
        messgae: "Please verify the account"
    })
})

//@ts-ignore
router.post("/signin", async (req,res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(403).json({
            message: "error while signing in"
        })
    }

    const user = await prismaClient.user.findFirst({
        where:{
            email:parsedData.data.username,
            password:parsedData.data.password
        }
    })

    if(!user){
        return res.status(404).json({
            message: "Check Creds"
        })
    }

    //sign the jwt
        if (!JWT_PASSWORD) {
            throw new Error('JWT_PASSWORD is not defined');
        }  
        const token = jwt.sign({
            id: user.id
        }, JWT_PASSWORD)

    res.json({
        token:token
    })
})

//@ts-ignore
router.get("/", authMiddleware, async (req,res) => {
    //TODO: fix the type
    //@ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            name:true,
            email:true
        }
    })
    return res.json({
        user
    })

})


export const userRouter = router;