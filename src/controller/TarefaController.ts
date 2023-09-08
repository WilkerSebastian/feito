import Tarefa from "../model/Tarefa";
import { Request, Response } from "express"
import Security from "../assets/Security";

class TarefaController{

    public static async save(req:Request, res:Response){

        const id_user = Number(Security.decriptografar(req.params.id_usuario))

        let task = new Tarefa({
            titulo:req.body.titulo,
            data_de_conclusao:req.body.data_de_conclusao,
            data_de_criacao:req.body.data_de_criacao,
            id_usuario:id_user,
            concluida:false
        })
    }
}
export default TarefaController