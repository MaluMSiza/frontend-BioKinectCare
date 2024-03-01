var jsonUrl = 'json/progresso.json';
var chartInstance = null; 

function extrairValores(dados, chave) {
    return dados.map(function(item) {
        return item[chave];
    });
}
async function carregarGrafico() {
    console.log('Iniciando requisição do JSON...');

    try {
        var response = await fetch(jsonUrl);
        var dados = await response.json();

        console.log('JSON recebido:', dados);

        var valoresAtivacao = extrairValores(dados, 'ativacao');
        var maiorValor = Math.max(...valoresAtivacao);
        var indiceMaiorValor = valoresAtivacao.indexOf(maiorValor);
        var dataMaiorValor = dados[indiceMaiorValor].semana;

        var mensagemH2 = document.createElement('h2');
        mensagemH2.textContent = 'O maior valor da sua ativação é ' + maiorValor + ' milivolts no dia ' + dataMaiorValor;

        var ctx = document.getElementById('meuGrafico').getContext('2d');
        var config = {
            type: 'line',
            data: {
                labels: extrairValores(dados, 'semana'),
                datasets: [{
                    label: 'Ativação',
                    backgroundColor: 'rgba(240, 77, 8, 0.0)',
                    borderColor: 'rgba(0, 0, 0, 1)', 
                    data: extrairValores(dados, 'ativacao'),
                    fill: true,
                }]
            },
        };
        var chartInstance = new Chart(ctx, config);

        var chartContainer = document.querySelector('.chart-container');
        chartContainer.appendChild(mensagemH2);
        var divChart = document.createElement('div');
        chartContainer.appendChild(divChart);
        chartContainer.appendChild(ctx.canvas);

        console.log('Gráfico criado e elementos adicionados ao DOM');
    } catch (error) {
        console.error('Erro ao carregar os dados do JSON:', error);
    }
}

function carregarGraficoOnLoad() {
    carregarGrafico(); 
}

document.addEventListener('DOMContentLoaded', carregarGraficoOnLoad);
