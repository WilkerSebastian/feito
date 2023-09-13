import Tarefa from "../model/Tarefa";
import { Request, Response } from "express"
import Security from "../assets/Security";

class TarefaController{

    public static async add(req:Request, res:Response) {

        const id_user = Number(await Security.decriptografar(req.params.id))

        let task = new Tarefa({
            titulo:req.body.task,
            data_de_conclusao:req.body.data_c,
            data_de_criacao:req.body.data_i,
            id_usuario:id_user,
            concluida:false
        })

        await Tarefa.save(task)

        return res.status(200).json({task})

    }

    public static async list(req:Request, res:Response) {

        const id_user = Number(await Security.decriptografar(req.params.id))

        const tasks = await Tarefa.list(id_user)

        return res.status(200).json({ tasks:tasks })

    }

    public static async update(req:Request, res:Response) {

        const task = await Tarefa.getById(Number(req.params.id))

        task.data_de_conclusao = req.body.data_c
        task.titulo = req.body.task

        await Tarefa.update(task)

        return res.status(200).json({ task })

    }

    public static async active(req:Request, res:Response) {

        const id = Number(req.params.id)

        const task = await Tarefa.getById(id)
        task.concluida = !task.concluida

        await Tarefa.update(task)

        return res.status(200).json({ task })

    }

    public static async delete(req:Request, res:Response) {

        const id = Number(req.params.id)

        await Tarefa.delete(id)

        return res.status(200).json({ msg: "tarefa deletada!" })

    }

}

export default TarefaController