document.addEventListener('DOMContentLoaded', function () {
    console.log('entrou no obter perfl');
    fetch('/obter-perfil')
        .then(response => response.json())
        .then(data => {
            // Access the form and populate its fields
            const form = document.getElementById('profile-form');
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const inputField = form.querySelector(`[name="${key}"]`);
                    if (inputField) {
                        inputField.value = data[key];
                    }
                }
            }
        })
        .catch(error => console.error('Erro ao obter perfil:', error));      
});

function redirectToEditarPerfil() {
        console.log('entrou no botao editar');
        window.location.href = 'editarperfil.html';
    } 