function cadastrarUsuario() {
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('data_nascimento').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const mensagemErro = document.getElementById("mensagem");

    // Calcular a idade com base na data de nascimento
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();

    const partesData = dataNascimento.split('-');
    const anoNascimento = parseInt(partesData[0]);
    const mesNascimento = parseInt(partesData[1]);
    const diaNascimento = parseInt(partesData[2]);

    let idade = anoAtual - anoNascimento;

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--;
    }

    
    let usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se o usuário já está cadastrado
    if (usuariosCadastrados.some(usuario => usuario.email === email)) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Usuário já cadastrado ",
            showConfirmButton: false,
            timer: 1500
        });
        mensagemErro.innerHTML = "Usuário já cadastrado.";
        return;
    }

    // Adiciona novo usuário ao vetor
    usuariosCadastrados.push({ nome, senha, dataNascimento, email });

    // Atualiza o Local Storage com os usuários cadastrados
    localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));

    mensagemErro.innerHTML = "Usuário cadastrado com sucesso.";
    Swal.fire({
        icon: "success",
        text: "Cadastro realizado Com Sucesso",
        timer: 2000
    })   
}

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar o envio tradicional do formulário
    cadastrarUsuario();
});

// Adicione um ouvinte de evento de mudança para verificar a idade ao mudar a data de nascimento
document.getElementById("data_nascimento").addEventListener("change", function() {
    const dataNascimento = new Date(this.value);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();

    // Se a idade for menor que 18, desabilite os campos
    if (idade < 18) {
        document.getElementById("nome").disabled = true;
        document.getElementById("data_nascimento").disabled = true;
        document.getElementById("email").disabled = true;
        document.getElementById("senha").disabled = true;

        Swal.fire({
            icon: "error",
            text: "Idade não suficiente, é preciso ter pelo menos 18 anos para se cadastrar",
            buttons: false,
            timer: 5500
        });

    } else {
        // Caso contrário, habilite os campos
        document.getElementById("nome").disabled = false;
        document.getElementById("data_nascimento").disabled = false;
        document.getElementById("email").disabled = false;
        document.getElementById("senha").disabled = false;
    }
});

            