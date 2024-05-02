document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerButton = document.getElementById('registerButton');
    const registerModal = document.getElementById('registerModal');
    const closeButton = document.getElementById('closeButton');
    const saveButton = document.getElementById('saveButton');

    let username = '';

    loginForm.addEventListener('submit', function(event) {
        const userLogin = document.getElementById('userLogin').value; // Corrigido aqui
        const password = document.getElementById('passwordLogin').value;
        const paciente = {
            "username": userLogin,  // Corrigido aqui
            "senha": password
        };
        event.preventDefault(); 
        fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paciente)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensagem); 
            if (data.mensagem === "Login realizado!") {
                username = userLogin;  // Armazenar o username na variável global
                localStorage.setItem('username', username);
                window.location.href = 'home.html';
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert("Erro ao fazer o login. Verifique o console para mais detalhes.");
        });
    });

    registerButton.addEventListener('click', () => {
        registerModal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });

    saveButton.addEventListener('click', () => {
        const fullName = document.getElementById('fullName').value;
        const userRegister = document.getElementById('username').value; // Corrigido aqui
        const birthdate = document.getElementById('birthdate').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }
        const paciente = {
            "nome_completo": fullName,
            "username": userRegister, // Corrigido aqui
            "data_nascimento": birthdate,
            "musculo": '',
            "senha": password,
            "calibragem": ''
        };
 
        console.log(paciente);
        fetch('http://127.0.0.1:5000/api/pacientes', {
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
