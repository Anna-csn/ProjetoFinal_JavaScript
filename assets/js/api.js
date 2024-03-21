
export async function obterTaxaDaAPI(moeda) {
    const mapaMoedas = { // Mapa de moedas para códigos
        'AED-BRL': 'AED',
        'USD-BRL': 'USD',
        'AUD-BRL': 'AUD',
        'EUR-BRL': 'EUR',
        'GBP-BRL': 'GBP',
        'JPY-BRL': 'JPY',
        'ZAR-BRL': 'ZAR',
        'INR-BRL': 'INR',
    };

    //chamada da api e utilização da api
    const codigoMoeda = mapaMoedas[moeda] || '';
    const url = `https://economia.awesomeapi.com.br/json/last/${codigoMoeda}-BRL`;
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

//código das moedas
export function obterCodigoDaMoeda(moeda) {
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
