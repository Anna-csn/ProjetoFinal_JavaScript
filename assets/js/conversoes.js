class ValorAconverter {
    constructor(valor) {
        this.valor = Number(valor) || 0;
    }

    impostoIOF() {
        this.descontoIOF = this.valor * 0.011;
        this.valor = this.valor - this.descontoIOF;
        this.valor = Number(this.valor.toFixed(2));
    }
}

// Mapear o nome da moeda para o código correspondente na API
function obterCodigoDaMoeda(moeda) {
    const mapaMoedas = {
        'AED-BRL': 'AED',
        'USD-BRL': 'USD',
        'AUD-BRL': 'AUD',
        'EUR-BRL': 'EUR',
        'GBP-BRL': 'GBP',
        'JPY-BRL': 'JPY',
        'ZAR-BRL': 'ZAR',
        'INR-BRL': 'INR',
    };

    return mapaMoedas[moeda] || '';
}

async function obterTaxaDaAPI(moeda) {
    const codigoMoeda = obterCodigoDaMoeda(moeda);

    console.log('Código da Moeda:', codigoMoeda);

    const url = 'https://economia.awesomeapi.com.br/json/last/' + codigoMoeda + '-BRL';

    console.log('URL da API:', url);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error('Erro na resposta da API. Status:', response.status);
            return null;
        }

        const corpo = await response.json();

        const precoMoeda = parseFloat(corpo[codigoMoeda + 'BRL'].bid).toFixed(2);
        console.log('Preço da Moeda:', precoMoeda);
        document.getElementById('cotacao').innerHTML = `1 ${codigoMoeda} equivale a R$ ${precoMoeda}`;

        return precoMoeda;
    } catch (error) {
        console.error('Erro ao obter taxa da API:', error);
        return null;
    }
}

function realizarConversao(valor, taxa) {
    const descontoIOF = valor * 0.011;
    const valorComDesconto = valor - descontoIOF;
    const convertido = valorComDesconto / taxa;

    return {
        convertido: convertido.toFixed(2),
        desconto: descontoIOF.toFixed(2),
        valorComDesconto: valorComDesconto.toFixed(2),
    };
}

function adicionarTransacaoNoLocalStorage(transacao) {

    // Adiciona a data atual à transação
    transacao.data = new Date().toLocaleString();

    // Recupera os dados existentes do localStorage
    const dadosAntigos = JSON.parse(localStorage.getItem('transacoes')) || [];

    // Adiciona a nova transação aos dados existentes
    const novosDados = [...dadosAntigos, transacao];

    // Armazena os dados atualizados no localStorage
    localStorage.setItem('transacoes', JSON.stringify(novosDados));
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
        Swal.fire({
            icon: "success",
            text: "Conversão Realizada Com Sucesso",
            timer: 2500,
          });
        resultadoElement.textContent = `${convertido} (Desconto: R$ ${desconto}, Valor com Desconto: R$ ${valorComDesconto})`;

        // Adiciona transação no localStorage
        adicionarTransacaoNoLocalStorage({
            descricao: "Conversão",
            valor,
            moeda,
            convertido,
            desconto,
            valorComDesconto,
        });

        // Define o indicador de conversão bem-sucedida no localStorage
        localStorage.setItem('conversaoBemSucedida', 'true');
        window.location.href = './extrato.html';
        
    } catch (error) {
        console.error('Erro ao converter moeda:', error);
        resultadoElement.textContent = 'Erro ao converter moeda.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('botaoConverter').addEventListener('click', converterMoeda);

    // Verifica se houve uma conversão bem-sucedida ao carregar a página
    const conversaoBemSucedida = localStorage.getItem('conversaoBemSucedida');
    if (conversaoBemSucedida === 'true') {
        // Se houve uma conversão bem-sucedida, remove o indicador do localStorage
        localStorage.removeItem('conversaoBemSucedida');

         // Atualiza o extrato apenas se a conversão foi bem-sucedida
         atualizarExtrato();
    }
    document.getElementById('botaoConverter').addEventListener('click', converterMoeda);
});
