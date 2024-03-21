//Realiza a conversão do valor informado pelo usuário

export default function realizarConversao(valor, taxa) {
    const descontoIOF = valor * 0.011;
    const valorComDesconto = valor - descontoIOF;
    const convertido = valorComDesconto / taxa;

    return {
        convertido: convertido.toFixed(2),
        desconto: descontoIOF.toFixed(2),
        valorComDesconto: valorComDesconto.toFixed(2),
    };
}
