//Exibe o saldo dos moedas
function exibirSaldos() {
  console.log('Chamando exibirSaldos');
  const saldosElement = document.getElementById('saldos');

  if (!saldosElement) {
    console.error('Elemento com ID "saldos" não encontrado.');
    return;
  }

  // Limpa os saldos antes de atualizar
  saldosElement.innerHTML = '';

  const saldos = JSON.parse(localStorage.getItem('saldos')) || {};
  //relação com os simbolos das moedas
  const simbolosMoedas = {
    'AUD-BRL': '$',
    'AED-BRL': 'د.إ',
    'EUR-BRL': '€',
    'GBP-BRL': '£',
    'JPY-BRL': '¥',
    'ZAR-BRL': 'R',
    'INR-BRL': '₹',
    'USD-BRL': '$',


  };

  //cria os cards dinamicamente
  for (const moeda in saldos) {
    const saldoCard = document.createElement('div');
    saldoCard.className = 'card card-saldo mb-3';

    const saldoCardBody = document.createElement('div');
    saldoCardBody.className = 'card-body';

    const saldoTitulo = document.createElement('h3');
    saldoTitulo.className = 'card-title';
    saldoTitulo.textContent = `Saldo ${moeda}`;

    const saldoTexto = document.createElement('p');
    saldoTexto.className = 'card-text';
    saldoTexto.innerHTML = `${simbolosMoedas[moeda]} ${saldos[moeda].toFixed(2)}`;

    saldoCardBody.appendChild(saldoTitulo);
    saldoCardBody.appendChild(saldoTexto);

    saldoCard.appendChild(saldoCardBody);
    saldosElement.appendChild(saldoCard);
  }
}

// Chama a função para exibir saldos no início
window.addEventListener('load', function () {
  exibirSaldos();
});
//simula a transferencia de moedas entre os usuários
function realizarTransferencia() {
  var destinatario = document.getElementById('destinatario').value;
  var moeda = document.getElementById('moeda').value;
  var valor = parseFloat(document.getElementById('valor').value);

  if (!destinatario || !moeda || isNaN(valor) || valor <= 0) {
    Swal.fire({
      icon: "warning",
      title: "Por favor, preencha todos os campos para continuar",
      showConfirmButton: false,
      timer: 1500
    });

    return;
  }

  // Verifica se o usuário do destinatário está cadastrado e armazenado no Local Storage
  const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
  const destinatarioCadastrado = usuariosCadastrados.find(usuario => usuario.email === destinatario);

  if (!destinatarioCadastrado) {
    Swal.fire({
      title: "Usuário não cadastrado",
      icon: "question",
      text: "Recomende o App",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      showCancelButton: true,
      showCloseButton: true
    });

    return;
  }

  const saldos = JSON.parse(localStorage.getItem('saldos')) || {};

  // Verifica se há saldo suficiente
  if (!saldos.hasOwnProperty(moeda) || saldos[moeda] < valor) {
    Swal.fire({
      icon: "error",
      title: "Saldo Insuficiente",
      showConfirmButton: false,
      timer: 1500
    });
    return;
  }

  // Solicita o e-mail e a senha do usuário usando SweetAlert2
  Swal.fire({
    title: 'Confirmação de Transferência',
    html: '<input id="email" class="swal2-input" placeholder="Seu email" type="email">' +
      '<input id="senha" class="swal2-input" placeholder="Sua senha" type="password">',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const email = Swal.getPopup().querySelector('#email').value;
      const senha = Swal.getPopup().querySelector('#senha').value;

      // Verifica se o e-mail informado existe no localStorage de usuários e não é igual ao destinatário
      const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuarioEncontrado = usuariosCadastrados.find(usuario => usuario.email === email && usuario.email !== destinatario);

      if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
        // Exibe um alerta de "carregando"
        Swal.fire({
          title: "Transferindo...",
          html: "<b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then(() => {
          //Executa a transferência
          console.log(`Transferência de ${valor} ${moeda} para ${destinatario} realizada com sucesso.`);
          // Atualiza os saldos
          saldos[moeda] = parseFloat((saldos[moeda] - valor).toFixed(2));
          localStorage.setItem('saldos', JSON.stringify(saldos));

          // Exibe os saldos atualizados
          exibirSaldos();

          // Exibe um alerta de "transação realizada"
          Swal.fire({
            icon: "success",
            title: "Transação realizada com sucesso",
            showConfirmButton: false,
            timer: 1500
          });
        });
        return;
      } else {
        Swal.showValidationMessage('Operação inválida');
      }
    }
  }).then((result) => {
    if (result.isDismissed) {
      Swal.fire({
        icon: "error",
        title: "Operação Cancelada",
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
}










