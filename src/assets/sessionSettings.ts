import { NextFunction, Request, Response } from "express";
import Security from "./Security";
import Usuario from "../model/Usuario";

export async function sessionSettings(req:Request , res:Response , next:NextFunction) {

    try {
     
        res.header('HttpOnly', 'true');

        res.locals.id = req.cookies["id"]
        
        if (req.cookies["id"]) {

            const id = await Security.decriptografar(req.cookies["id"]);

            const user = await Usuario.getById(Number(id))

            if (user) {
            
                user.id = req.cookies["id"]

                res.locals.user = user

            }
            

        } else {

            res.locals.user = false

        }

    } catch (error) {
        
        console.log(error);
        
    }

    next()

}