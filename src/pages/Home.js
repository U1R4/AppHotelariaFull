import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";
import Card from "../components/RoomCard.js";
import dateSelector from "../components/dateSelector.js";

export default function renderHomePage(){

    const nav = document.getElementById('navbar');
    nav.innerHTML = '';
        
    const navbar = Navbar();
    nav.appendChild(navbar);

    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';
    
    const hero = Hero();
    divRoot.appendChild(hero);

    const datesSelector = dateSelector();
    divRoot.appendChild(datesSelector);

    const card = Card();
    divRoot.appendChild(card);

    const footer = document.getElementById('footer');
    footer.innerHTML = '';

    const footers = Footer();
    footer.appendChild(footers);
}