function toggleNav() {
    var navItems = document.querySelectorAll('.main-nav li:not(:first-child)');
    navItems.forEach(function(item) {
        item.classList.toggle('show');
    });
}

//Da pagina login para home
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        // Redirecionamento para home.html
        window.location.href = 'home.html';
    });
});

//da paginal inicial/getting started para login
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.gs-my-button');
    button.addEventListener('click', function() {
        window.location.href = 'login.html'; // Redireciona para login.html quando o botão é clicado
    });
});

//scripts para carregar inputs entre sensores e calibragem
// Função para obter parâmetros da Query String

