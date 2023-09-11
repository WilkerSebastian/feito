import { Request, Response } from "express"

class HomeController {

    public static async index(req:Request, res:Response) {

        return res.render("index")

    }

    public static async term(req:Request, res:Response) {

        return res.render("term")

    }

}

export default HomeController