let update = false

let currentTask = null

$("#add").on("click", async () => {

    let data_conclusao = null

    if ($("#date").val().trim() != "" && $("#time").val().trim() != "") {

        const date = $("#date").val().split("-").map(e => parseInt(e))
        const time = $("#time").val().split(":").map(e => parseInt(e))

        const d = new Date()
        d.setUTCFullYear(date[0], date[1] - 1, date[2])
        d.setUTCHours(time[0], time[1], 0, 0)
        data_conclusao = d

    }

    if (update) {

        await fetch(`${location.origin}/task/update/${currentTask.id}`, {
            method: "PUT",
            body: JSON.stringify({
                task: $("#task").val().trim(),
                data_c: data_conclusao
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        
    } else {

        await fetch(`${location.origin}/task/add/${$("script[user]").attr("user")}`, {
            method: "POST",
            body: JSON.stringify({
                task: $("#task").val().trim(),
                data_c: data_conclusao,
                data_i: new Date(),
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })

    }

    await atualizaTasks()

})

$("#delete").on("click", async(e) => {

    await fetch(`${location.origin}/task/delete/${currentTask.id}`, { method: "DELETE" })

    update = false

    await atualizaTasks()

})
 
async function atualizaTasks() {

    update = false

    $("#task").val("")
    $("#date").val("")
    $("#time").val("")


    viewDelete(update)

    $("#tasks").html(" ")

    const resp = await fetch(`${location.origin}/task/list/${$("script[user]").attr("user")}`).catch(err => console.log(err))

    const { tasks } = await resp.json()

    tasks.forEach(task => {


        $("#tasks").append(`
        <div class="d-flex justify-content-center">
            <div class="my-3 bg-light p-3 rounded w-25 task-card linkagem" task="${task.id}">
                <p> ${task.titulo} </p>
                <p> ${new Date(task.data_de_conclusao).toLocaleString("pt-BR", {timeZone:"UTC"})} </p>
            </div>

            <input class="form-check-input ms-4 my-auto check border border-black" ${task.concluida ? `checked="checked"` : ""} type="checkbox" id="${task.id}" class="task">
        </div>
        `)

    })

    $(`.check`).on("change", async(e) => {
    
        await fetch(`${location.origin}/task/active/${e.target.id}`, {method:"PATCH"})
    
    })

    $(".task-card").on("click", e => {

        update = true
        currentTask = tasks.filter(task => task.id == e.currentTarget.getAttribute("task"))[0]

        viewDelete(update)

        const hora = currentTask.data_de_conclusao.split("T")[1].split(":")[0]
        const minuto = currentTask.data_de_conclusao.split("T")[1].split(":")[1]

        $("#task").val(currentTask.titulo)
        $("#date").val(currentTask.data_de_conclusao.split("T")[0])
        $("#time").val(`${hora}:${minuto}`)

        $("#adicionar").trigger("click")

    })

}

function viewDelete(view) {

    $("#delete").removeClass(view ? "d-none" : "d-block")
    $("#delete").addClass(view ? "d-block" : "d-none")

}

atualizaTasks()