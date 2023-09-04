import { Request, Response } from "express"

class HomeController {

    public static async index(req:Request, res:Response) {

        return res.render("index")

    }

}

export default HomeController