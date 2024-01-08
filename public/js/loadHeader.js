// loadHeader.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML = data + document.body.innerHTML;
            console.log('header carregada');
        })
        .catch(error => console.error('Erro ao carregar o cabeçalho:', error));
});
