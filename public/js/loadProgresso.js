// loadProgresso.js

document.addEventListener('DOMContentLoaded', function() {
    var jsonUrl = 'json/progresso.json';

    function extrairValores(dados, chave) {
        return dados.map(function(item) {
            return item[chave];
        });
    }

    function carregarEPlotarGrafico() {
        fetch(jsonUrl)
            .then(response => response.json())
            .then(dados => {
                var valoresAtivacao = extrairValores(dados, 'ativacao');
                var labelsSemana = extrairValores(dados, 'semana');

                var maiorValor = Math.max(...valoresAtivacao); // Encontrar o maior valor
                var indiceMaiorValor = valoresAtivacao.indexOf(maiorValor); // Encontrar o índice do maior valor
                var dataMaiorValor = labelsSemana[indiceMaiorValor]; // Obter a data associada ao maior valor

                var tituloH1 = document.createElement('h1');
                tituloH1.textContent = 'Histórico do Progresso';

                // Criar o elemento <h2> para exibir a mensagem
                var mensagemH2 = document.createElement('h2');
                mensagemH2.textContent = 'Olá!! O maior valor da sua ativação é ' + maiorValor + ' milivoltz na semana ' + dataMaiorValor;
                
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
                        aspectRatio: 3,
                        title: {
                            display: false
                        },
                        scales: {
                            x: [{
                                display: false, // Esconder o eixo x
                            }],
                            y: [{
                                display: false, // Esconder o eixo y
                            }]
                        }
                    }
                };

                var ctx = document.getElementById('meuGrafico').getContext('2d');
                ctx.canvas.width = 1000;
                ctx.canvas.height = 400;

                // Desenhar linha x e y
                ctx.beginPath();
                ctx.moveTo(0, ctx.canvas.height / 2);
                ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
                ctx.moveTo(ctx.canvas.width / 2, 0);
                ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
                ctx.strokeStyle = 'rgba(0, 0, 0, 1)'; // Cor preta
                ctx.stroke();

                new Chart(ctx, config);

                ctx.canvas.style.height = '80vh';
                ctx.canvas.style.margin = 'auto';

                // Adicionar o título <h1> antes do canvas do gráfico
                var graficoContainer = document.getElementById('meuGrafico').parentNode;
                graficoContainer.insertBefore(tituloH1, document.getElementById('meuGrafico'));

                // Adicionar a mensagem <h2> abaixo do canvas do gráfico
                graficoContainer.appendChild(mensagemH2);
            })
            .catch(error => console.error('Erro ao carregar os dados do JSON:', error));
    }

    carregarEPlotarGrafico();
});