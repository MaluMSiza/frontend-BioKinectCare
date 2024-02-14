document.addEventListener('DOMContentLoaded', () => {

    function readSensorsJSON(callback) {
        // Caminho relativo para o arquivo JSON
        const filePath = 'json/sensores.json';

        // Lê o arquivo JSON de forma assíncrona
        fetch(filePath)
            .then(response => response.json())
            .then(data => callback(null, data))
            .catch(error => callback(error, null));
    }

    // Usa a função para ler o arquivo JSON de sensores e montar o HTML
    readSensorsJSON((err, sensors) => {
        if (err) {
            // Se houver um erro, exibe no console
            console.error('Erro ao ler o arquivo JSON de sensores:', err);
            return;
        }
        const sensorsBody = document.createElement('div');
        // Para cada sensor no JSON, cria um elemento HTML correspondente e adiciona ao container
        sensors.forEach(sensor => {
            const sensorsContainer = document.createElement('div');
            sensorsContainer.className = 'sensor-container';
            
            const sensorId = document.createElement('h1');
            sensorId.id = 'sensorId'
            sensorId.className = 'sensor'
            sensorId.textContent = 'SENSOR: ' + sensor.id;
            
            const sensorStatus = document.createElement('h2');
            sensorStatus.id = 'sensorStatus'
            sensorStatus.className = 'sensor'
            sensorStatus.textContent = sensor.status;
            sensorStatus.style.color = (sensor.status === 'INACTIVE') ? 'red' : 'green';
            
            const sensorActivationPoint = document.createElement('h2');
            sensorActivationPoint.id = 'sensorActivPoint'
            sensorActivationPoint.className = 'sensor'
            sensorActivationPoint.textContent = 'Ponto de Ativação: ' + sensor.activation_point + ' milivoltz';

            const calibrateButton = document.createElement('button');
            calibrateButton.id = 'sensorButton';
            calibrateButton.className= 'calibrate-button';
            calibrateButton.textContent='CALIBRAR';

            // // Crie um elemento img
            // const img = document.createElement('img');
            // // Defina o atributo src com o caminho da imagem
            // img.src = 'css/imgs/confg.png';
            // // Defina o atributo alt com o texto alternativo da imagem
            // img.alt = 'Configurações';
           
            sensorsContainer.appendChild(sensorId);
            sensorsContainer.appendChild(sensorStatus);
            sensorsContainer.appendChild(sensorActivationPoint);
            // calibrateButton.appendChild(img);
            sensorsContainer.appendChild(calibrateButton);
            console.log('Carregou contai');
            sensorsBody.appendChild(sensorsContainer);
        });

        // Adiciona o container de sensores ao documento
        document.body.appendChild(sensorsBody);

        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('calibrate-button')) {
                const sensorContainer = event.target.parentElement;
                const sensorId = sensorContainer.querySelector('#sensorId').textContent.split(':')[1].trim();
                const sensorStatus = sensorContainer.querySelector('#sensorStatus').textContent;
                const sensorActivationPoint = sensorContainer.querySelector('#sensorActivPoint').textContent.split(':')[1].trim();
                console.log('Calibrando sensor:', sensorId);
                console.log('Status:', sensorStatus);
                console.log('Ponto de Ativação:', sensorActivationPoint);
                window.location.href = `calibrar.html?sensorId=${encodeURIComponent(sensorId)}&status=${encodeURIComponent(sensorStatus)}&activationPoint=${encodeURIComponent(sensorActivationPoint)}`;
            }
        });
        
    });
});
