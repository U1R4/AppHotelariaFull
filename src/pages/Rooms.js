import Form from "../components/Form.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";

function toggleErrorState(errorElement, inputElement, message = null) {
    if (message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        inputElement.style.borderColor = 'red';
    } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        inputElement.style.borderColor = '';
    }
}

async function createRoomFormData(formData) {
    const response = await fetch("api/rooms", {
        method: "POST",
        body: formData,
        credentials: "same-origin"
    });
    
    let data = null;
    try {
        data = await response.json();
    } catch (error) {
        data = { message: "Resposta inválida do servidor" };
    }

    if (!response.ok) {
        const message = data?.message || `Erro ${response.status}: Falha ao criar o quarto.`;
        return { 
            ok: false, 
            data: null, 
            message 
        };
    }

    return {
        ok: true,
        data: data, 
        message: data?.message || "Quarto criado com sucesso."
    };
}

export default function renderRoomPage() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = '';
    
    const navbar = Navbar();
    nav.appendChild(navbar);

    const formulario = Form();
    const contentForm = formulario.querySelector('form');

    const titulo = document.querySelector('h1');
    titulo.textContent = "Cadastrar um novo quarto";
    titulo.style.textAlign = 'center';
    titulo.style.marginBottom = '20px';
    contentForm.insertBefore(titulo, contentForm.firstChild);

    const inputs = contentForm.querySelectorAll('input');
    const nome = inputs[0];
    const numero = inputs[1];

    nome.type = "text";
    nome.placeholder = "Nome do quarto";
    nome.className = "InputNome";
    nome.name = "nome";

    numero.type = "text";
    numero.placeholder = "Número do quarto";
    numero.className = "InputNumero";
    numero.name = "numero";

    const erroNome = document.createElement('span');
    erroNome.className = "error-Nome";
    contentForm.insertBefore(erroNome, nome.nextSibling);

    const erroNumero = document.createElement('span');
    erroNumero.className = "error-Numero";
    contentForm.insertBefore(erroNumero, numero.nextSibling);

    const qtdCamaCasal = document.createElement('input');
    qtdCamaCasal.placeholder = "Quantidade de camas de casal";
    qtdCamaCasal.className = "InputCamaCasal";
    qtdCamaCasal.type = "number";
    qtdCamaCasal.min = "0";
    qtdCamaCasal.name = "qnt_cama_casal";
    contentForm.insertBefore(qtdCamaCasal, erroNumero.nextSibling);

    const erroCamaCasal = document.createElement('span');
    erroCamaCasal.className = "error-CamaCasal";
    contentForm.insertBefore(erroCamaCasal, qtdCamaCasal.nextSibling);

    const qtdCamaSolteiro = document.createElement('input');
    qtdCamaSolteiro.placeholder = "Quantidade de camas de solteiro";
    qtdCamaSolteiro.className = "InputCamaSolteiro";
    qtdCamaSolteiro.type = "number";
    qtdCamaSolteiro.min = "0";
    qtdCamaSolteiro.name = "qnt_cama_solteiro";
    contentForm.insertBefore(qtdCamaSolteiro, erroCamaCasal.nextSibling);

    const erroCamaSolteiro = document.createElement('span');
    erroCamaSolteiro.className = "error-CamaSolteiro";
    contentForm.insertBefore(erroCamaSolteiro, qtdCamaSolteiro.nextSibling);

    const preco = document.createElement('input');
    preco.placeholder = "Preço por noite em R$";
    preco.className = "InputPreco";
    preco.type = "number";
    preco.step = "0.01";
    preco.min = "0";
    preco.name = "preco";
    contentForm.insertBefore(preco, erroCamaSolteiro.nextSibling);

    const erroPreco = document.createElement('span');
    erroPreco.className = "error-Preco";
    contentForm.insertBefore(erroPreco, preco.nextSibling);

    const selectDisponivel = document.createElement('select');
    selectDisponivel.className = 'form-select';
    selectDisponivel.name = "disponivel";

    const optionDefault = document.createElement('option');
    optionDefault.textContent = 'Disponibilidade';
    optionDefault.value = '';
    optionDefault.disabled = true;
    optionDefault.selected = true;
    selectDisponivel.appendChild(optionDefault);
    
    const optionSim = document.createElement('option');
    optionSim.textContent = 'Sim';
    optionSim.value = 'true';
    selectDisponivel.appendChild(optionSim);
    
    const optionNao = document.createElement('option');
    optionNao.textContent = 'Não';
    optionNao.value = 'false';
    selectDisponivel.appendChild(optionNao);

    contentForm.insertBefore(selectDisponivel, erroPreco.nextSibling);

    const erroDisponivel = document.createElement('span');
    erroDisponivel.className = "error-Disponivel";
    contentForm.insertBefore(erroDisponivel, selectDisponivel.nextSibling);

    const divFileInput = document.createElement('div');
    divFileInput.className = 'mb-3';

    const labelFile = document.createElement('label');
    labelFile.htmlFor = 'formFileMultiple';
    labelFile.className = 'form-label';
    labelFile.textContent = 'Adicionar Fotos do Quarto';

    const inputFileInput = document.createElement('input');
    inputFileInput.className = 'form-control';
    inputFileInput.type = 'file';
    inputFileInput.id = 'formFileMultiple';
    inputFileInput.multiple = true;
    inputFileInput.name = 'fotos[]';
    inputFileInput.accept = 'image/*';

    divFileInput.appendChild(labelFile);
    divFileInput.appendChild(inputFileInput);
    contentForm.insertBefore(divFileInput, erroDisponivel.nextSibling);

    const btnRegister = contentForm.querySelector('button');
    btnRegister.textContent = 'Cadastrar Quarto';

    contentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const inputNome = contentForm.querySelector('.InputNome');
        const inputNumero = contentForm.querySelector('.InputNumero');
        const inputCamaCasal = contentForm.querySelector('.InputCamaCasal');
        const inputCamaSolteiro = contentForm.querySelector('.InputCamaSolteiro');
        const inputPreco = contentForm.querySelector('.InputPreco');
        const inputDisponivel = contentForm.querySelector('.form-select');
        const inputFile = contentForm.querySelector('#formFileMultiple');

        toggleErrorState(erroNome, inputNome);
        toggleErrorState(erroNumero, inputNumero);
        toggleErrorState(erroCamaCasal, inputCamaCasal);
        toggleErrorState(erroCamaSolteiro, inputCamaSolteiro);
        toggleErrorState(erroPreco, inputPreco);
        toggleErrorState(erroDisponivel, inputDisponivel);

        let hasValidationErrors = false;

        const nome = inputNome.value.trim();
        const numero = inputNumero.value.trim();
        const qnt_cama_casal = inputCamaCasal.value.trim();
        const qnt_cama_solteiro = inputCamaSolteiro.value.trim();
        const preco = inputPreco.value.trim();
        const disponivel = inputDisponivel.value.trim();
        const fotos = inputFile.files;

        if (!nome) {
            toggleErrorState(erroNome, inputNome, 'O nome do quarto é obrigatório.');
            hasValidationErrors = true;
        }

        if (!numero) {
            toggleErrorState(erroNumero, inputNumero, 'O número do quarto é obrigatório.');
            hasValidationErrors = true;
        }

        if (qnt_cama_casal === '' || isNaN(parseInt(qnt_cama_casal)) || parseInt(qnt_cama_casal) < 0) {
            toggleErrorState(erroCamaCasal, inputCamaCasal, 'Quantidade de camas de casal inválida.');
            hasValidationErrors = true;
        }

        if (qnt_cama_solteiro === '' || isNaN(parseInt(qnt_cama_solteiro)) || parseInt(qnt_cama_solteiro) < 0) {
            toggleErrorState(erroCamaSolteiro, inputCamaSolteiro, 'Quantidade de camas de solteiro inválida.');
            hasValidationErrors = true;
        }

        if (preco === '' || isNaN(parseFloat(preco)) || parseFloat(preco) <= 0) {
            toggleErrorState(erroPreco, inputPreco, 'Preço inválido. Deve ser maior que zero.');
            hasValidationErrors = true;
        }

        if (disponivel === '') {
            toggleErrorState(erroDisponivel, inputDisponivel, 'Selecione a disponibilidade.');
            hasValidationErrors = true;
        }

        if (hasValidationErrors) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('numero', numero);
            formData.append('qnt_cama_casal', qnt_cama_casal);
            formData.append('qnt_cama_solteiro', qnt_cama_solteiro);
            formData.append('preco', preco);
            formData.append('disponivel', disponivel);

            for (let i = 0; i < fotos.length; i++) {
                formData.append('fotos[]', fotos[i]);
            }

            const result = await createRoomFormData(formData);
            
            if (result.ok) {
                alert("Quarto " + nome + " cadastrado com sucesso!");
                contentForm.reset();
            } else {
                alert("Erro ao cadastrar quarto: " + result.message);
            }

        } catch (error) {
            alert("Falha ao tentar cadastrar: Erro de comunicação.");
        }
    });

    const footer = document.getElementById('footer');
    footer.innerHTML = '';
    
    const footers = Footer();
    footer.appendChild(footers);
}