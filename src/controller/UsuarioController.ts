import Usuario from "../model/Usuario";
import Security from "../assets/Security";
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

    public static async update(req:Request, res:Response){
        
        // const id_user = Number(Security.decriptografar(req.params.id_usuario))
        
        const id_user = req.body.id

        let user = new Usuario({
            nome:req.body.nome,
            e_mail:req.body.e_mail,
            senha:req.body.senha,
            ativo:req.body.ativo,
            id:id_user
        })

        await Usuario.update(user);

        return res.status(200).json({user:user})
    }
}
export default UsuarioController