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
router.put("/user/update", UsuarioController.update)
router.get("/user/register", UsuarioController.register)
router.get("/user/login", UsuarioController.login)
router.post("/user/login", UsuarioController.loging)
router.get("/user/logout", UsuarioController.logout)
router.get("/user/active/:email", UsuarioController.active)

//Tarefas 

router.post("/task/add/:id", TarefaController.add)
router.get("/task/list/:id", TarefaController.list)
router.put("/task/update/:id", TarefaController.update)
router.patch("/task/active/:id", TarefaController.active)
router.delete("/task/delete/:id", TarefaController.delete)

export default router