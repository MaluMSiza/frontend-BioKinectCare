const socket = io();
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Data',
      data: [],
      borderColor: 'blue',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    // Define a largura máxima e altura máxima do gráfico
    maxWidth: 900,
    maxHeight: 400
  }
});

socket.on('data', (data) => {
  const newData = parseFloat(data); // Convert the data to a number if needed
  chart.data.labels.push(new Date().toLocaleTimeString());
  chart.data.datasets[0].data.push(newData);
  chart.update();
});
