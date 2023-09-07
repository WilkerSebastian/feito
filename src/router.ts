import { Router } from "express";
import HomeController from "./controller/HomeController";
import UsuarioController from "./controller/UsuarioController";

const router = Router()

router.get("/", HomeController.index)
router.post("/user/save", UsuarioController.save)

export default router