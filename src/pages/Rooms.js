import Form from "../components/Form.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";
import {createRoom} from "../api/roomsAPI.js";

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

    numero.type = "text";
    numero.placeholder = "Número do quarto";
    numero.className = "InputNumero";

    const qtdCamaCasal = document.createElement('input');
    qtdCamaCasal.placeholder = "Quantidade de camas de casal";
    qtdCamaCasal.className = "InputCamaCasal";
    qtdCamaCasal.type = "number";
    qtdCamaCasal.min = "0";
    contentForm.insertBefore(qtdCamaCasal, numero.nextSibling);

    const qtdCamaSolteiro = document.createElement('input');
    qtdCamaSolteiro.placeholder = "Quantidade de camas de solteiro";
    qtdCamaSolteiro.className = "InputCamaSolteiro";
    qtdCamaSolteiro.type = "number";
    qtdCamaSolteiro.min = "0";
    contentForm.insertBefore(qtdCamaSolteiro, qtdCamaCasal.nextSibling);

    const preco = document.createElement('input');
    preco.placeholder = "Preço por noite em R$";
    preco.className = "InputPreco";
    preco.type = "number";
    preco.step = "0.01";
    preco.min = "0";
    contentForm.insertBefore(preco, qtdCamaSolteiro.nextSibling);

    const selectDisponivel = document.createElement('select');
    selectDisponivel.className = 'form-select';

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

    contentForm.insertBefore(selectDisponivel, preco.nextSibling);

    const btnRegister = contentForm.querySelector('button');
    btnRegister.textContent = 'Cadastrar Quarto';

    const inputNome = contentForm.querySelector('.InputNome');
    const inputNumero = contentForm.querySelector('.InputNumero');
    const inputCamaCasal = contentForm.querySelector('.InputCamaCasal');
    const inputCamaSolteiro = contentForm.querySelector('.InputCamaSolteiro');
    const inputPreco = contentForm.querySelector('.InputPreco');
    const inputDisponivel = contentForm.querySelector('.form-select');

    contentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = inputNome.value.trim();
        const numero = inputNumero.value.trim();
        const qnt_cama_casal = parseInt(inputCamaCasal.value.trim());
        const qnt_cama_solteiro = parseInt(inputCamaSolteiro.value.trim());
        const preco = parseFloat(inputPreco.value.trim());
        const disponivel = inputDisponivel.value.trim();

        try {
            const result = await createRoom(
                nome,
                numero,
                qnt_cama_casal,
                qnt_cama_solteiro,
                preco,
                disponivel
            );
            
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