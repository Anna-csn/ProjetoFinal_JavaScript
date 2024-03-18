class Extrato {
    constructor(atualizarExtrato) {
        this.transacoes = [];
        this.saldos = localStorage.getItem('saldos') ? JSON.parse(localStorage.getItem('saldos')) : {};
        this.atualizarExtrato = atualizarExtrato;
    }

    adicionarTransacao(descricao, valor, moeda, convertido, desconto, valorComDesconto, data) {
        const transacao = {
            descricao,
            valor,
            moeda,
            convertido,
            desconto,
            valorComDesconto,
            data,
        };

        this.transacoes.push(transacao);

        if (!this.saldos.hasOwnProperty(moeda)) {
            this.saldos[moeda] = 0;
        }

        // Verifica se a conversão foi realizada com sucesso
        if (convertido !== 0) {
            this.saldos[moeda] += Number(transacao.convertido);
        }

        // Salvar os saldos no localStorage
        localStorage.setItem('saldos', JSON.stringify(this.saldos));

        // Atualizar o extrato
        atualizarExtrato();
    }

    gerarExtrato() {
        return this.transacoes;
    }

    atualizarSaldos() {
        const saldosElement = document.getElementById('saldos');

        if (saldosElement) {
            saldosElement.innerHTML = '';

            for (const moeda in this.saldos) {
                const saldoCard = document.createElement('div');
                saldoCard.className = 'card card-saldo mb-3';

                const saldoCardBody = document.createElement('div');
                saldoCardBody.className = 'card-body';

                const saldoTitulo = document.createElement('h3');
                saldoTitulo.className = 'card-title';
                saldoTitulo.textContent = `Saldo ${moeda}`;

                const saldoTexto = document.createElement('p');
                saldoTexto.className = 'card-text';
                saldoTexto.textContent = `${this.saldos[moeda].toFixed(2)}`;

                saldoCardBody.appendChild(saldoTitulo);
                saldoCardBody.appendChild(saldoTexto);

                saldoCard.appendChild(saldoCardBody);
                saldosElement.appendChild(saldoCard);
            }
        } else {
            console.error('Elemento com ID "saldos" não encontrado.');
        }
    }
}

export default Extrato;