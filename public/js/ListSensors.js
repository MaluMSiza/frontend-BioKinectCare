const username = localStorage.getItem('username');
console.log(username);

fetch(`http://127.0.0.1:5000/api/sensores/?username=${username}`, {
    method: 'GET',
})
.then(response => response.json())
.then(data => {
    ListSensors = data;

    console.log(ListSensors);
    renderSensors();
})
.catch(error => {
    console.error('Erro ao obter lista de sensores:', error);
});

fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML = data + document.body.innerHTML;
            console.log('header carregada');
            
        })
        .catch(error => console.error('Erro ao carregar o cabeçalho:', error));

function renderSensors() {
    const sensorsBody = document.createElement('div');
    sensorsBody.className = 'content-container';

    ListSensors.forEach((sensor, index) => {
        const sensorsContainer = document.createElement('div');
        sensorsContainer.className = 'sensor-container';

        const sensorInfo = document.createElement('h2');
        sensorInfo.className = 'sensor';
        sensorInfo.innerHTML  = `Sensor ${index + 1}: <br>
        Músculo - ${sensor.musculo} <br>
        Calibragem - ${sensor.calibragem}`;

        const buttonContainer = document.createElement('div'); // Container para os botões
        buttonContainer.className = 'button-container';

        const detalhesButton = document.createElement('button');
        detalhesButton.className = 'primary-button detailsButton';
        detalhesButton.textContent = 'Detalhes';
        detalhesButton.addEventListener('click', () => {
            // Lógica para exibir detalhes
        });

        const calibrarButton = document.createElement('button');
        calibrarButton.className = 'primary-button sensorButton';
        calibrarButton.textContent = 'Calibrar';
        calibrarButton.addEventListener('click', () => {
            // Lógica para calibrar sensor
        });

        buttonContainer.appendChild(detalhesButton);
        buttonContainer.appendChild(calibrarButton);

        sensorsContainer.appendChild(sensorInfo);
        sensorsContainer.appendChild(buttonContainer); // Adicionando o container dos botões
        sensorsBody.appendChild(sensorsContainer);
    });

    document.body.appendChild(sensorsBody);
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('saveButtonNew').addEventListener('click', () => {
        const username = localStorage.getItem('username');
        console.log(username);

        const musculoSelecionado = document.getElementById('newMusculoCombobox').value;
    
        const data = {
            musculo: musculoSelecionado
        };
    
        fetch(`http://127.0.0.1:5000/api/pacientes/?username=${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensagem); // Exibir mensagem de retorno da API
            window.location.reload();
        })
        .catch(error => {
            console.error('Erro ao adicionar músculo:', error);
            alert("Erro ao adicionar músculo. Verifique o console para mais detalhes.");
        });
    });
        
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
});
