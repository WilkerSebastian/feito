import Tarefa from "../model/Tarefa";
import Usuario from "../model/Usuario";

async function create() {
    await Tarefa.create()
    await Usuario.create()
}
create()