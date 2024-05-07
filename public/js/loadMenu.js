function loadMenu() {
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML = data + document.body.innerHTML;
            console.log('header carregada');
            
        })
        .catch(error => console.error('Erro ao carregar o cabeçalho:', error));
}

document.addEventListener('DOMContentLoaded', loadMenu);
