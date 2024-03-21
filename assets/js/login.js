
document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loadingScreen');
    const loginMessage = document.getElementById('mensagemLogin');
    //teve que utilizar o function(event) para não fazer o envio tradicional do formulário, visto que o botão submit não funciona para redirecionamente de pagina em um formulario
    //para isso teve que interromper o envio para redirecionar a execução de outras atividades que antecediam o envio do formulário
    document.getElementById("formLogin").addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioEncontrado = usuariosCadastrados.find(usuario => usuario.email === email && usuario.senha === senha);


        if (usuarioEncontrado) {


            loginMessage.innerHTML = "Login bem-sucedido!";

            loadingScreen.style.display = 'flex'; // Exibe a tela de carregamento
            // utilização do time out com uma promisse para simular o carregamento da página
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

            delay(2000) // Espera por 2 segundos
                .then(() => {
                    // Execute o código após o tempo de espera
                    Swal.fire({
                        icon: "success",
                        text: "Login realizado Com Sucesso",
                        button: false,
                        timer: 5000,
                    });
                    return delay(5000);

                })

                .then(() => {
                    loadingScreen.style.display = 'none';
                    window.location.href = 'conversoes.html';

                });
        } else {
            Swal.fire({
                icon: "error",
                text: "Credenciais inválidas.Tente novamente",
                buttons: false,
                timer: 5500,
            });

        }

    });

});
