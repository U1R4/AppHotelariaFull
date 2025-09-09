import { loginRequest, saveToken } from "../api/authAPI.js";
import Form from "../components/Form.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";
 
export default function renderLoginPage() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = '';
    
    const navbar = Navbar();
    nav.appendChild(navbar);


    const formulario = Form();
    const contentForm = formulario.querySelector('form');

    const inputEmail = contentForm.querySelector('input[type="email"]');
    const inputSenha = contentForm.querySelector('input[type="password"]');
    const btn = contentForm.querySelector('input[type="submit"]');

    contentForm.addEventListener("submit", async (e)=> {
        e.preventDefault();
        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();

        try{
            const result = await loginRequest(email, senha);
            saveToken(result.token);
        }
        catch{
            console.log("Puta");
        }
    });
    
    const linkVoltar = document.createElement('a');

    linkVoltar.textContent = "Não possui uma conta? Crie uma!";
    linkVoltar.href = 'register';
    linkVoltar.style.textAlign = 'center';
    linkVoltar.style.fontSize = '16px';
    linkVoltar.style.padding = '15px';

    
    contentForm.insertBefore(linkVoltar, contentForm.children[3]);
    
    const footer = document.getElementById('footer');
    footer.innerHTML = '';

    const footers = Footer();
    footer.appendChild(footers);
}