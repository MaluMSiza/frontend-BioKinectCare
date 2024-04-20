
//EVENTOS DE CADASTRO, LOGIN
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerButton = document.getElementById('registerButton');
    const registerModal = document.getElementById('registerModal');
    const closeButton = document.getElementById('closeButton');
    const saveButton = document.getElementById('saveButton');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        window.location.href = 'home.html';
    });
    registerButton.addEventListener('click', () => {
        registerModal.style.display = 'block';
    });
    closeButton.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });
    saveButton.addEventListener('click', () => {
        const fullName = document.getElementById('fullName').value;
        const cpf = document.getElementById('userName').value;
        const birthdate = document.getElementById('birthdate').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }
        const paciente = {
            "nome_completo": fullName,
            "cpf": usserName,
            "data_nascimento": birthdate,
            "senha": password,
        };

        fetch('/api/pacientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paciente)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensagem); 
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



