import Usuario from "../model/Usuario";
import { Request, Response } from "express"

class UsuarioController{

    public static async save(req:Request, res:Response){

        let user = new Usuario({
            nome:req.body.nome,
            e_mail:req.body.e_mail,
            senha:req.body.senha
        })
        
        user = await Usuario.save(user);

        return res.status(200).json({user:user})
        // res.redirect("/");
    }
}
export default UsuarioController