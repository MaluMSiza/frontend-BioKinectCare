
function loadMenu() {
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML = data + document.body.innerHTML;
            console.log('header carregada');

            // Depois que o cabeçalho é carregado, chame a função que configura os listeners do perfil
            configureProfileListeners();
        })
        .catch(error => console.error('Erro ao carregar o cabeçalho:', error));
}

document.addEventListener('DOMContentLoaded', loadMenu);

// Função para configurar os ouvintes de perfil
function configureProfileListeners() {
    const editProfileButton = document.getElementById('editProfileButton');
    const editModal = document.getElementById('editModal');
    const closeButton = document.getElementById('closeButton');
    const saveButton = document.getElementById('saveButton');
    console.log(editModal);
    console.log(editProfileButton);

    editProfileButton.addEventListener('click', () => {
        console.log("EMTENDEI CLICK");
        editModal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    saveButton.addEventListener('click', () => {
        // Aqui você pode adicionar a lógica para salvar os dados do formulário
        // Por exemplo, você pode acessar os valores dos campos de entrada usando document.getElementById('idDoCampo').value
        // e enviar esses dados para o servidor
        // Após salvar os dados, você pode fechar o modal
        editModal.style.display = 'none';
    });
}
