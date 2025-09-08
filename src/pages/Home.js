import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";

export default function renderHomePage(){

    const nav = document.getElementById('navbar');
    nav.innerHTML = '';
        
    const navbar = Navbar();
    nav.appendChild(navbar);

    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';
    
    const hero = Hero();
    divRoot.appendChild(hero);

    const footer = document.getElementById('footer');
    footer.innerHTML = '';

    const footers = Footer();
    footer.appendChild(footers);
}