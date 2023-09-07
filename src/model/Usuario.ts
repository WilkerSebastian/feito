import db from "../database/connection"
import bcrypt from "bcryptjs"

class Usuario {

    id: number;
    nome: string;
    e_mail: string;
    senha: string;

    constructor(user:{id?: number, nome: string, e_mail: string, senha: string}) {
        this.id = user.id ?? 0
        this.nome = user.nome
        this.e_mail = user.e_mail
        this.senha = user.senha
    }

    public static async create() {
        await db.query(`
            DROP TABLE IF EXISTS usuario CASCADE;
            CREATE TABLE IF NOT EXISTS usuario (
                id SERIAL PRIMARY KEY,
                nome VARCHAR,
                e_mail VARCHAR,
                senha VARCHAR
            );
        `).then(() => console.log("Tabela usuário criada com sucesso"))
    }
    public static async save(user:Usuario){
        const hash = await bcrypt.hash(user.senha, await bcrypt.genSalt(10));
        user.senha = hash
        
        await db.query(`
            INSERT INTO usuario(
                nome, e_mail, senha
            )VALUES ($1, $2, $3) RETURNING id;
        `,[user.nome, user.e_mail, hash]).then(e => user.id = e.rows[0].id);

        return user;
    }
}

export default Usuario