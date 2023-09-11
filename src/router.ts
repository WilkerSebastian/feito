import { Router } from "express";
import HomeController from "./controller/HomeController";
import UsuarioController from "./controller/UsuarioController";
import TarefaController from "./controller/TarefaController";

const router = Router()

//Home

router.get("/", HomeController.index)
router.get("/term", HomeController.term)

//Usuário

router.post("/user/save", UsuarioController.save)
router.patch("/user/update", UsuarioController.update)
router.get("/user/register", UsuarioController.register)

//Tarefas

router.post("/task/save", TarefaController.save)

export default router