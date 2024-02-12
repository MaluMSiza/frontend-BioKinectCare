
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