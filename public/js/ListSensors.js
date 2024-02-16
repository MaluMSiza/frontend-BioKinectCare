
var ListSensors = [
    {
        "id": 1,
        "status": "ACTIVE",
        "activation_point": 0.75
    },
    {
        "id": 2,
        "status": "INACTIVE",
        "activation_point": 0.25
    },
    {
        "id": 3,
        "status": "ACTIVE",
        "activation_point": 0.9
    },
    {
        "id": 4,
        "status": "ACTIVE",
        "activation_point": 0.6
    },
    {
        "id": 5,
        "status": "INACTIVE",
        "activation_point": 0.4
    } 

];

$(document).ready(function() {
if (typeof ListSensors !== 'undefined') {
    
    for (var i = 0; i < ListSensors.length; i++) {
        var sensor = ListSensors[i];

        var sensorContainer = $('<div class="sensor-container"></div>');

        var sensorId = $('<h1 class="sensor"> SENSOR: ' + sensor.id + '</h1>');
        sensorContainer.append(sensorId);

        var sensorStatus = $('<h2 class="sensor">' + sensor.status  + '</h2>');
        sensorContainer.append(sensorStatus);

        if (sensor.status === "INACTIVE") {
            sensorStatus.css('color', 'red');
        } else {
            sensorStatus.css('color', 'green');
        }
<<<<<<< Updated upstream
        var sensorPoint = $('<h2 class="sensor"> Ponto de Ativação: ' + sensor.activation_point + ' milivoltz </h2>');
        sensorContainer.append(sensorPoint);

        var button = $('<button class="calibrate-button"></button>'); // Criando um elemento button
        var image = $('<img src="css/imgs/confg.png" alt="Configurações">'); // Criando a tag img com a imagem desejada
        button.append(image); // Adicionando a tag img dentro do button
        sensorContainer.append(button);

        $('#sensor-list').append(sensorContainer);
    }
} else {
    console.error('ListSensor não está definido. Verifique o conteúdo do arquivo.');
}
});
=======
        const sensorsBody = document.createElement('div');
        sensorsBody.className = 'content-container';
        // Para cada sensor no JSON, cria um elemento HTML correspondente e adiciona ao container
        sensors.forEach(sensor => {
            const sensorsContainer = document.createElement('div');
            sensorsContainer.className = 'sensor-container';
            
            const labelsDiv = document.createElement('div');
            const buttonsDiv = document.createElement('div');

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
            calibrateButton.className= 'primary-button sensorButton';
            calibrateButton.textContent='CALIBRAR';

            const detailsButton = document.createElement('button');
            detailsButton.id = 'detailsButton';
            detailsButton.className= 'primary-button detailsButton';
            detailsButton.textContent='DETALHES';

            labelsDiv.appendChild(sensorId);
            labelsDiv.appendChild(sensorStatus);
            labelsDiv.appendChild(sensorActivationPoint);

            buttonsDiv.appendChild(calibrateButton);
            buttonsDiv.appendChild(detailsButton);

            sensorsContainer.appendChild(labelsDiv);
            sensorsContainer.appendChild(buttonsDiv);
            
            sensorsBody.appendChild(sensorsContainer);
        });

        document.body.appendChild(sensorsBody);

            
    });
    document.addEventListener('click', (event) => {
            if (event.target.classList.contains('sensorButton')) {
                const sensorContainer = event.target.closest('.sensor-container');
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
>>>>>>> Stashed changes
