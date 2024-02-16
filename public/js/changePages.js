//da paginal inicial/getting started para login
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.gs-my-button');
    button.addEventListener('click', function() {
        window.location.href = 'login.html'; // Redireciona para login.html quando o botão é clicado
    });
});


//EVENTOS DE CADASTRO, LOGIN
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerButton = document.getElementById('registerButton');
    const registerModal = document.getElementById('registerModal');
    const closeButton = document.getElementById('closeButton');
    const saveButton = document.getElementById('saveButton');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário
        // Redirecionamento para home.html
        window.location.href = 'home.html';
    });
    registerButton.addEventListener('click', () => {
        registerModal.style.display = 'block';
    });
    closeButton.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });
    saveButton.addEventListener('click', () => {
        // Captura dos dados do formulário de registro
        const fullName = document.getElementById('fullName').value;
        const cpf = document.getElementById('cpf').value;
        const birthdate = document.getElementById('birthdate').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        // Constrói o objeto com os dados do novo paciente
        const paciente = {
            "nome_completo": fullName,
            "cpf": cpf,
            "data_nascimento": birthdate,
            "senha": password,
            // Adicione outros campos, se necessário
        };

        // Envia os dados para o servidor
        fetch('/api/pacientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paciente)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensagem); // Exibe a mensagem de retorno do servidor
            // Fecha o modal se o paciente foi inserido com sucesso
            if (data.mensagem === "Paciente inserido com sucesso") {
                registerModal.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Erro ao inserir paciente:', error);
            alert("Erro ao inserir paciente. Verifique o console para mais detalhes.");
        });
    });
});



