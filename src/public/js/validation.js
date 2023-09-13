function getUser(login) {

    return {

        nome: login ? null : $("#nome").val().trim(),
        email: $("#email").val().trim(),
        senha: $("#senha").val().trim()

    }

}

function validaUser(user, type) {

    let msg

    let valid = true

    if (type == "register") {
        
        if (user.nome.lenght < 8) {
            
            valid = false
            msg = "nome deve ter pelo menos 8 caracteres"

        }
        else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email))) {
            
            valid = false
            msg = "informe um endereço de email valido"

        }
        else if(user.senha < 8) {

            valid = false
            msg = "a senha deve ter pelo menos 8 caracteres"

        }
        else if(user.senha != $("#senha_c").val().trim()) {

            valid = false
            msg = "a senhas devem ser iguais!"

        } else if(!$("#termo").prop("checked")) {

            valid = false
            msg = "aceite o termos de serviços para cadastrar"

        }

    }
    else if (type == "login") {

        if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email))) {
            
            valid = false
            msg = "informe um endereço de email valido"

        }
        else if(user.senha < 8) {

            valid = false
            msg = "a senha deve ter pelo menos 8 caracteres"

        }

    }

    if (!valid) {
        
        $("#alerta").text(msg)
        $("#alerta").css("display", "block")

    }

    return valid

}

$("#register").on("submit", async (e) => {

    e.preventDefault()

    const user = getUser()

    if (validaUser(user, "register")) {
     
        await fetch(location.origin + "/user/save", {
            method: "POST",
            body: JSON.stringify({ user }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then(() => {}).catch((err) => {

            console.log(err);

        })

        this.location.href = (location.origin + "/")

        return

    }

})