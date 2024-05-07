const ListSensors = [
    {
        "id": 1,
        "musculo": "BICEPS",
        "activation_point": 0.75
    },
    {
        "id": 2,
        "musculo": "BICEPS",
        "activation_point": 0.25
    },
    {
        "id": 3,
        "musculo": "TRICEPS",
        "activation_point": 0.9
    },
    {
        "id": 4,
        "musculo": "TRICEPS",
        "activation_point": 0.6
    },
    {
        "id": 5,
        "musculo": "BICEPS",
        "activation_point": 0.4
    }
];

function loadMenu() {
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.createElement('div');
            headerContainer.innerHTML = data;

            // Adicione o conteúdo do cabeçalho ao início do corpo do documento
            document.body.insertBefore(headerContainer, document.body.firstChild);
            console.log('header carregada');

            renderSensors();
        })
        .catch(error => console.error('Erro ao carregar o cabeçalho:', error));
}

document.addEventListener('DOMContentLoaded', loadMenu);

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

        const sensorMuscle = document.createElement('h2');
        sensorMuscle.className = 'sensor';
        sensorMuscle.textContent = sensor.musculo;

        // const sensorActivationPoint = document.createElement('h2');
        // sensorActivationPoint.className = 'sensor';
        // sensorActivationPoint.textContent = 'Ponto de Ativação: ' + sensor.activation_point + ' milivolts';

        const calibrateButton = document.createElement('button');
        calibrateButton.className = 'primary-button sensorButton';
        calibrateButton.textContent = 'CALIBRAR';

        const detailsButton = document.createElement('button');
        detailsButton.className = 'primary-button detailsButton';
        detailsButton.textContent = 'DETALHES';

        labelsDiv.appendChild(sensorId);
        labelsDiv.appendChild(sensorMuscle);
        // labelsDiv.appendChild(sensorActivationPoint);

        buttonsDiv.appendChild(calibrateButton);
        buttonsDiv.appendChild(detailsButton);

        sensorsContainer.appendChild(labelsDiv);
        sensorsContainer.appendChild(buttonsDiv);

        sensorsBody.appendChild(sensorsContainer);
    });

    document.body.appendChild(sensorsBody);
}

document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('sensorButton')) {
            document.getElementById('calibrarSensorModal').style.display = 'block';

            const sensorContainer = event.target.closest('.sensor-container');
            const sensorId = sensorContainer.querySelector('h1').textContent.split(':')[1].trim();
            const sensorMusculo = sensorContainer.querySelector('h2').textContent;
            const sensorActivationPoint = sensorContainer.querySelectorAll('h2')[1].textContent.split(':')[1].trim();

            document.getElementById('sensorName').value = sensorId;
            document.getElementById('ativacaoInput').value = sensorActivationPoint;

            const musculoCombobox = document.getElementById('musculoCombobox');
            for (let i = 0; i < musculoCombobox.options.length; i++) {
                if (musculoCombobox.options[i].text === sensorMusculo) {
                    musculoCombobox.selectedIndex = i;
                    break;
                }
            }
        }
    });
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('detailsButton')) {
            document.getElementById('detailsSensorModal').style.display = 'block';
        }
    });

    document.getElementById('newSensorButton').addEventListener('click', () => {
        document.getElementById('newSensorModal').style.display = 'block';
    });

    document.getElementById('closeButtonDetails').addEventListener('click', () => {
        document.getElementById('detailsSensorModal').style.display = 'none';
    });
    document.getElementById('closeButtonCalibra').addEventListener('click', () => {
        document.getElementById('calibrarSensorModal').style.display = 'none';
    });
    document.getElementById('closeButtonNew').addEventListener('click', () => {
        document.getElementById('newSensorModal').style.display = 'none';
    });
    document.getElementById('saveButtonCalibra').addEventListener('click', function() {
        var count = 0;
        var maxCount = 5;
        var calibrarModal = document.getElementById('calibrarSensorModal');
        var imageModal = document.getElementById('imageDisplayModal');
        var displayImage = document.getElementById('displayImage');
        calibrarModal.style.display = 'none';
        
        function toggleImages() {
            if (count < maxCount) {
                var imageName = count % 2 === 0 ? "css/imgs/contra.png" : "css/imgs/relax.png";
                displayImage.src = imageName;
                setTimeout(function() {
                    imageModal.style.display = 'block';
                    count++;
                    toggleImages(); // Recursively call to continue the sequence
                }, 2000); // Time interval each image is shown
            } else {
                alert('Calibração concluída');
                imageModal.style.display = 'none'; // Show the image modal
            }
        }
        
        toggleImages(); // Initiate the image toggle sequence
    });
    
});
