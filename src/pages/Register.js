 
import Form from "../components/Form.js";
import Navbar from "../components/Navbar.js";

export default function renderRegisterPage() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = '';
        
    const navbar = Navbar();
    nav.appendChild(navbar);

    const formulario = Form();

    const titulo = formulario.querySelector('h1');
    titulo.textContent = "Cadastre-se";

    const contentForm = formulario.querySelector('form');

    //Novos Elementos
    const nome = document.createElement('input');
    nome.type = 'text';
    nome.placeholder = "Digite seu nome";

    const inputEmail = formulario.querySelector('input[type="email"]');

    contentForm.insertBefore(nome, inputEmail);

    const conSenha = document.createElement('input');
    conSenha.type = 'password';
    conSenha.placeholder = "Confirme sua senha";

    contentForm.insertBefore(conSenha, contentForm.children[3]);

    const btnRegister =formulario.querySelector('button');
    btnRegister.textContent = "Criar conta";
    
    
    const linkVoltar = document.createElement('a');
    linkVoltar.textContent = "Voltar ao login";
    linkVoltar.className = '';
    linkVoltar.href = 'login';
    linkVoltar.style.textAlign = 'center';
    linkVoltar.style.fontSize = '12px';
    linkVoltar.style.margin = '15px';

    contentForm.appendChild(linkVoltar);
}