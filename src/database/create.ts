import Tarefa from "../model/Tarefa";
import Usuario from "../model/Usuario";

async function create() {
    await Usuario.create()
    await Tarefa.create()
}
create()