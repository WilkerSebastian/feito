import { log } from "console";
import db from "../database/connection"
import bcrypt from "bcryptjs"

class Usuario {

    id: number;
    nome: string;
    e_mail: string;
    senha: string;
    ativo: boolean = false

    constructor(user:{id?: number, nome: string, e_mail: string, senha: string, ativo?:boolean}) {
        this.id = user.id ?? 0
        this.nome = user.nome
        this.e_mail = user.e_mail
        this.senha = user.senha
        this.ativo = user.ativo ?? false
    }

    public static async create() {
        await db.query(`
            DROP TABLE IF EXISTS usuario CASCADE;
            CREATE TABLE IF NOT EXISTS usuario (
                id SERIAL PRIMARY KEY,
                nome VARCHAR,
                e_mail VARCHAR,
                senha VARCHAR,
                ativo BOOLEAN
            );
        `).then(() => console.log("Tabela usuário criada com sucesso"))
    }
    public static async save(user:Usuario){
        const hash = await bcrypt.hash(user.senha, await bcrypt.genSalt(10));
        user.senha = hash
        
        await db.query(` 
            INSERT INTO usuario(
                nome, e_mail, senha, ativo
            )VALUES ($1, $2, $3, $4) RETURNING id;
        `,[user.nome, user.e_mail, hash, user.ativo]).then(e => user.id = e.rows[0].id);

        return user; 
    }

    public static async update(user:Usuario){

        await db.query(`
            UPDATE usuario
            SET
                nome = $1,
                e_mail = $2,
                senha = $3,
                ativo = $4
            WHERE
                id = $5
        `,[user.nome, user.e_mail, user.senha, user.ativo, user.id]).catch(e=> console.log(e))

        return user;
    }

    public static async getById(id:number) {
        try {

            const user = await db.query(`
            SELECT * FROM usuario
            WHERE id = ${id}
            `);
            return user.rows[0];
        } catch (error) {
            console.log(error);
        }
    }
    
    public static async getByEmail(e_mail:string) {
        try {
            const usuario = await db.query(`
            SELECT * FROM usuario
            WHERE e_mail = $1
            `,[e_mail]);
            return usuario.rows[0]; 
        } catch (error) {
            console.log(error);
        }
    }
}

export default Usuario