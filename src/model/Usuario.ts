import db from "../database/connection"

class Usuario {

    id: number;
    nome: string;
    e_mail: string;
    senha: string;

    constructor(user:{id: number | null, nome: string, e_mail: string, senha: string}) {
        this.id = user.id ?? 0
        this.nome = user.nome
        this.e_mail = user.e_mail
        this.senha = user.senha
    }

    public static async create() {
        await db.query(`
            CREATE TABLE usuario (
                id SERIAL PRIMARY KEY,
                nome VARCHAR,
                e_mail VARCHAR,
                senha VARCHAR
            ');
        `).then(() => console.log("Tabela usuário criada com sucesso"))
    }
}

export default Usuario