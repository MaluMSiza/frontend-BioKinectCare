var jsonUrl = 'json/progresso.json';
var chartInstance = null; // Variável para armazenar a instância do gráfico

function extrairValores(dados, chave) {
    return dados.map(function(item) {
        return item[chave];
    });
}

// Função para carregar o gráfico
async function carregarGrafico() {
    console.log('Iniciando requisição do JSON...');

    try {
        // Requisição do JSON
        var response = await fetch(jsonUrl);
        var dados = await response.json();

        console.log('JSON recebido:', dados);

        // Encontrar o maior valor de ativação
        var valoresAtivacao = extrairValores(dados, 'ativacao');
        var maiorValor = Math.max(...valoresAtivacao);
        var indiceMaiorValor = valoresAtivacao.indexOf(maiorValor);
        var dataMaiorValor = dados[indiceMaiorValor].semana;

        console.log('Maior valor de ativação:', maiorValor);
        console.log('Data associada ao maior valor:', dataMaiorValor);

        // Criar e exibir a mensagem
        var mensagemH2 = document.createElement('h2');
        mensagemH2.textContent = 'Olá!! O maior valor da sua ativação é ' + maiorValor + ' milivoltz na semana ' + dataMaiorValor;

        // Criar o gráfico
        var ctx = document.getElementById('meuGrafico').getContext('2d');
        var config = {
            type: 'line',
            data: {
                labels: extrairValores(dados, 'semana'),
                datasets: [{
                    label: 'Ativação',
                    backgroundColor: 'rgba(240, 77, 8, 0.0)', // Laranja com fill de 70%
                    borderColor: 'rgba(0, 0, 0, 1)', // Cor preta para as linhas x e y
                    data: extrairValores(dados, 'ativacao'),
                    fill: true,
                }]
            },
            options: {
                responsive: true,
            }
        };
        var chartInstance = new Chart(ctx, config);

        // Adicionar a mensagem abaixo do gráfico
        var chartContainer = document.querySelector('.chart-container');
        chartContainer.innerHTML = ''; // Limpar o conteúdo anterior
        chartContainer.appendChild(mensagemH2);
        chartContainer.appendChild(ctx.canvas);

        console.log('Gráfico criado e elementos adicionados ao DOM');
    } catch (error) {
        console.error('Erro ao carregar os dados do JSON:', error);
    }
}

// Função para chamar carregarGrafico() no carregamento da página e no redimensionamento da tela
function carregarGraficoOnLoadAndResize() {
    carregarGrafico(); // Chamar a função ao carregar a página

    // Adicionar um ouvinte de evento para redimensionamento da tela
    window.addEventListener('resize', carregarGrafico);
}

// Chamar a função carregarGraficoOnLoadAndResize() quando a página estiver carregada
document.addEventListener('DOMContentLoaded', carregarGraficoOnLoadAndResize);
