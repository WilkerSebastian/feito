import express, { json, urlencoded } from "express"
import ejs from "express-ejs-layouts"
import * as dotenv from 'dotenv'
import router from "./router"
import cookieParser from "cookie-parser"
import { resolve } from "path"
import { sessionSettings } from "./assets/sessionSettings"
dotenv.config()

const PORT = process.env.PORT ?? 8080
const app = express()

// cookie parser
app.use(cookieParser(process.env.SECRET))

// encode POST
app.use(urlencoded({ extended:true }))
app.use(json())
 
// configuração de sessão
app.use(sessionSettings)

// configuração ejs
app.use(ejs)
app.set("views", resolve("./src/views"))
app.set("view engine", "ejs")
 
// url de acesso 
app.use("/jquery", express.static(resolve("./node_modules/jquery/dist")))
app.use("/bootstrap", express.static(resolve("./node_modules/bootstrap/dist")))
app.use("/public", express.static(resolve("./src/public")))


// linkando o router
app.use(router)

app.listen(PORT, () => {

    console.log(`servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV}`);

})