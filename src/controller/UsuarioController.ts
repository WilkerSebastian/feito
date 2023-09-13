import Usuario from "../model/Usuario";
import Security from "../assets/Security";
import { Request, Response } from "express"
import EmailManager from "../assets/EmailManager";
import Tarefa from "../model/Tarefa";
import { compare } from "bcryptjs";

class UsuarioController{

    public static async save(req:Request, res:Response){

        let user = new Usuario({
            nome:req.body.user.nome,
            e_mail:req.body.user.email,
            senha:req.body.user.senha
        })

        if (!await Usuario.getByEmail(user.e_mail)) {
         
            user = await Usuario.save(user);

            res.cookie("id" , await Security.criptografar(user.id.toString()))

            const emailManager = new EmailManager()

            await emailManager.sendEmail(req.protocol + "://" + req.get("host") + "/user/active/" + await Security.criptografar(user.e_mail), {nome: user.nome,email:user.e_mail})

            return res.status(200).json({user:user})

        }

        return res.status(205).json({user:user})
    
    }

    public static async update(req:Request, res:Response){
        
        const id_user = Number(await Security.decriptografar(req.body.id))

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

    public static async register(req:Request, res:Response) {

        return res.render("form", {form:"register"})

    }

    public static async login(req:Request, res:Response) {

        return res.render("form", {form:"login"})

    }

    public static async loging(req:Request ,res:Response) {
        
        const user = await Usuario.getByEmail(req.body.email)
        
        if (user) {
            
            if (await compare(req.body.senha, user.senha)) {
                
                res.cookie("id", await Security.criptografar(user.id.toString()))

                return res.redirect("/")

            }

        }

        return res.redirect("/user/login")

    }

    public static logout(req:Request, res:Response) {

        res.clearCookie("id")

        return res.redirect("/")

    }

    public static async active(req:Request, res:Response) {

        const email = await Security.decriptografar(req.params.email)

        const user = await Usuario.getByEmail(email)

        if (user) {

            user.ativo = true

            await Usuario.update(user)

        }

        return res.redirect("/")

    }

    public static async delete(req:Request, res:Response) {

        await Tarefa.delete(Number(req.params.id))

        return res.status(200).json({ message:"tarefa deletada!" })

    }

}

export default UsuarioController