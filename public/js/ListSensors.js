const ListSensors = [
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

function renderSensors() {
    const sensorsBody = document.createElement('div');
    sensorsBody.className = 'content-container';

    ListSensors.forEach(sensor => {
        const sensorsContainer = document.createElement('div');
        sensorsContainer.className = 'sensor-container';

        const labelsDiv = document.createElement('div');
        const buttonsDiv = document.createElement('div');

        const sensorId = document.createElement('h1');
        sensorId.className = 'sensor';
        sensorId.textContent = 'SENSOR: ' + sensor.id;

        const sensorStatus = document.createElement('h2');
        sensorStatus.className = 'sensor';
        sensorStatus.textContent = sensor.status;
        sensorStatus.style.color = (sensor.status === 'INACTIVE') ? 'red' : 'green';

        const sensorActivationPoint = document.createElement('h2');
        sensorActivationPoint.className = 'sensor';
        sensorActivationPoint.textContent = 'Ponto de Ativação: ' + sensor.activation_point + ' milivoltz';

        const calibrateButton = document.createElement('button');
        calibrateButton.className = 'primary-button sensorButton';
        calibrateButton.textContent = 'CALIBRAR';

        const detailsButton = document.createElement('button');
        detailsButton.className = 'primary-button detailsButton';
        detailsButton.textContent = 'DETALHES';

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
}

document.addEventListener('DOMContentLoaded', () => {
    renderSensors();

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('sensorButton')) {
            const sensorContainer = event.target.closest('.sensor-container');
            const sensorId = sensorContainer.querySelector('h1').textContent.split(':')[1].trim();
            const sensorStatus = sensorContainer.querySelector('h2').textContent;
            const sensorActivationPoint = sensorContainer.querySelectorAll('h2')[1].textContent.split(':')[1].trim();
            console.log('Calibrando sensor:', sensorId);
            console.log('Status:', sensorStatus);
            console.log('Ponto de Ativação:', sensorActivationPoint);
            window.location.href = `calibrar.html?sensorId=${encodeURIComponent(sensorId)}&status=${encodeURIComponent(sensorStatus)}&activationPoint=${encodeURIComponent(sensorActivationPoint)}`;
        }
    });
});
