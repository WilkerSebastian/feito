import express, { json, urlencoded } from "express"
import ejs from "express-ejs-layouts"
import * as dotenv from 'dotenv'
import router from "./router"
import { resolve } from "path"
dotenv.config()

const PORT = process.env.PORT ?? 8080
const app = express()

// encode POST
app.use(urlencoded({ extended:true }))
app.use(json())

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