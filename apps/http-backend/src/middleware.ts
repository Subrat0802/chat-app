import { JWT_SECRET } from "@repo/backend-common/be-common";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const middleware = (req:Request, res:Response, next:NextFunction) => {
    try{
        //@ts-ignore
        const cookie = req.cookies.token;
        if(!cookie){
            return res.status(404).json({
                message:"Cookie is not present",
                success:false
            })
        }
        const decodeId = jwt.verify(cookie, JWT_SECRET);
        if(!decodeId){
            return
        }
        //@ts-ignore
        req.userId = decodeId;

        next();

    }catch(error){
        return res.status(500).json({
            message:"Server error while validating token",
            success:false
        })
    }
}