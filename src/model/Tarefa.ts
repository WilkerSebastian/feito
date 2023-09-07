import db from "../database/connection"

class Tarefa {

    id: number;
    titulo: string;
    data_de_conclusao: Date;
    data_de_criacao: Date;
    concluida: boolean;
    id_usuario: number;

    constructor(task: { id: number | null, titulo: string, data_de_conclusao: Date, data_de_criacao: Date, concluida: boolean, id_usuario: number }){
        
        this.id = task.id ?? 0
        this.titulo = task.titulo
        this.data_de_conclusao = task.data_de_conclusao
        this.data_de_criacao = task.data_de_criacao
        this.concluida = task.concluida
        this.id_usuario = task.id_usuario
    }

    public static async create() {
        await db.query(`

            CREATE TABLE tarefa (
                id SERIAL PRIMARY KEY UNIQUE,
                titulo VARCHAR,
                data_de_conclusao TIMESTAMP,
                data_de_criacao TIMESTAMP,
                concluida BOOLEAN,
                id_usuario INTEGER
                FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
            );
        `).then(() => console.log("Tabela tarefa criada com sucesso"))
    }
}
export default Tarefa