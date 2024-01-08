/*document.addEventListener('DOMContentLoaded', () => {
    const profileLoaded = sessionStorage.getItem('profileLoaded');

    if (!profileLoaded) {
        // Fetch data from your endpoint
        fetch('/obter-perfil')
            .then(response => response.json())
            .then(data => {
                // Access the form and populate its fields
                const form = document.getElementById('save-profile-form');
                for (const key in data) {
                    if (Object.hasOwnProperty.call(data, key)) {
                        const inputField = form.querySelector(`[name="${key}"]`);
                        if (inputField) {
                            inputField.value = data[key];
                        }
                    }
                }
                // Set sessionStorage to indicate profile data has been loaded
                sessionStorage.setItem('profileLoaded', 'true');
            })
            .catch(error => console.error('Erro ao obter perfil:', error));
    }
});*/
function salvarPerfil(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const form = document.getElementById('save-profile-form');
    const formData = new FormData(form);
    console.log(formData);

    let isEmpty = false;

    // Verifica se algum campo está vazio
    formData.forEach((value) => {
        if (!value) {
            isEmpty = true;
        }
    });

    if (isEmpty) {
        alert('Preencha todos os campos');
    } else {
        const json = {};
        formData.forEach((value, key) => {
            json[key] = value;
        });

        // Transformando o objeto json em uma string
        const reqString = JSON.stringify(json);
        console.log(json);
        console.log(reqString);

        fetch('/salvar-perfil', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: json // Enviando a string da requisição
        })
        window.location.href = 'perfil.html';
    }
}
function voltar() {
    event.preventDefault(); // Evita o comportamento padrão do formulário
        window.location.href = 'perfil.html';
}
