
import { obterTaxaDaAPI } from './api.js';
import realizarConversao from './realizarConvercao.js';


// Função para verificar se uma transação é nova
function verificarTransacaoNova(moeda, convertido) {
    const transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
    const transacaoExistente = transacoes.some(transacao => {
        return transacao.moeda === moeda && transacao.convertido === convertido;
    });
    return !transacaoExistente;
}

// Função para adicionar uma transação no localStorage
function adicionarTransacaoNoLocalStorage(transacao) {
    try {
        // Adiciona a data atual à transação
        transacao.data = new Date().toLocaleString();

        // Recupera os dados existentes do localStorage
        const dadosAntigos = JSON.parse(localStorage.getItem('transacoes')) || [];

        // Adiciona a nova transação aos dados existentes
        const novosDados = [...dadosAntigos, transacao];

        // Armazena os dados atualizados no localStorage
        localStorage.setItem('transacoes', JSON.stringify(novosDados));
    } catch (error) {
        console.error('Erro ao adicionar transação no localStorage:', error);
    }
}

async function converterMoeda() {
    const valorElement = document.getElementById('valor');
    const moedaElement = document.getElementById('moeda');
    const resultadoElement = document.getElementById('resultado');

    const valor = Number(valorElement.value) || 0;
    const moeda = moedaElement.options[moedaElement.selectedIndex].value;

    try {
        const taxa = await obterTaxaDaAPI(moeda);
        if (taxa === null) {
            Swal.fire({
                icon: "error",
                title: "Não foi possível converter",
                text: "Tente mais tarde",
                buttons: false,
                timer: 2500,
            });
            return;
        }

        const { convertido, desconto, valorComDesconto } = realizarConversao(valor, taxa);

        // Verificar se a transação é nova para evitar atualizar o saldo novamente
        const transacaoNova = verificarTransacaoNova(moeda, convertido);
        if (transacaoNova) {
            adicionarTransacaoNoLocalStorage({
                descricao: "Conversão",
                valor,
                moeda,
                convertido,
                desconto,
                valorComDesconto,
            });
        }

        // Somente atualiza o resultado e define a conversão como bem-sucedida se a transação for nova
        if (transacaoNova) {
            Swal.fire({
                icon: "success",
                text: "Conversão Realizada Com Sucesso",
                timer: 2500,
            });
            resultadoElement.textContent = `${convertido} (Desconto: R$ ${desconto}, Valor com Desconto: R$ ${valorComDesconto})`;
            localStorage.setItem('conversaoBemSucedida', 'true');
        }

        // Atualiza o extrato apenas se a transação for nova
        if (transacaoNova) {
            atualizarExtrato();
        }


    } catch (error) {
        console.error('Erro ao converter moeda:', error);
        resultadoElement.textContent = 'Erro ao converter moeda.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('botaoConverter').addEventListener('click', converterMoeda);

    const conversaoBemSucedida = localStorage.getItem('conversaoBemSucedida');
    if (conversaoBemSucedida === 'true') {
        localStorage.removeItem('conversaoBemSucedida');

    }
});
