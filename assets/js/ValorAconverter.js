//classe de valor a converter, recebe o valor digitado pelo usuário e aplica a taxa de conversão sobre o valor
class ValorAconverter {
    constructor(valor) {
        this.valor = Number(valor) || 0;
    }

    impostoIOF() {
        this.descontoIOF = this.valor * 0.011;
        this.valor -= this.descontoIOF;
        this.valor = Number(this.valor.toFixed(2));
    }
}

export default ValorAconverter;
