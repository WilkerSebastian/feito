function getUser() {

    return {

        nome: $("")
        

    }

}


document.getElementById("register").addEventListener("submit", async () => {

    await fetch("", {

        method: "POST",
        body: JSON.stringify({ conteudo:conteudo }),
        headers: {"Content-type": "application/json; charset=UTF-8"}

    })

})