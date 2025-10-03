import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";
import Card from "../components/RoomCard.js";
import dateSelector from "../components/dateSelector.js";
import { listAllRoomRequest } from "../api/roomsAPI.js";

export default function renderHomePage() {
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

    const btnPesquisar = datesSelector.querySelector('button');
    const dateSelectorIn = datesSelector.querySelector('.check-in');
    const dateSelectorOut = datesSelector.querySelector('.check-out');
    const guestsAmount = datesSelector.querySelector('select');

    btnPesquisar.addEventListener("click", async (e) => {
        e.preventDefault();
 
        const inicio = dateSelectorIn.value;
        const fim = dateSelectorOut.value;
        const capacidadeTotal = parseInt(guestsAmount.value, 10);
 
        if (!inicio || !fim || !capacidadeTotal || isNaN(capacidadeTotal)) {
            alert('Por favor, preencha as datas e o número de pessoas.');
            return;
        }
 
        btnPesquisar.disabled = true;
        btnPesquisar.style.backgroundColor = 'gray';
        btnPesquisar.textContent = 'Buscando...';

        console.log(`Buscando quartos de ${inicio} até ${fim} para ${capacidadeTotal} pessoas...`);
 
        const result = await listAllRoomRequest({
            inicio: inicio,
            fim: fim,
            capacidadeTotal: capacidadeTotal
        });
 
        btnPesquisar.disabled = false;
        btnPesquisar.style.backgroundColor = '';
        btnPesquisar.textContent = 'Pesquisar';
 
        if (result.ok) {
            console.log("Quartos Disponíveis Encontrados:", result.raw);
            // alert(`Sucesso! Encontrados ${result.raw.length} quartos.`);
 
        } else {
            console.error("Erro na busca de quartos:", result.message);
            alert(`Erro na busca: ${result.message}`);
        }
    });

    const tituloCard = document.createElement('h1');
    tituloCard.textContent = 'Conheça nossos quartos'
    tituloCard.className = 'titulo';
    tituloCard.style.fontSize = '24px';
    tituloCard.style.textAlign = 'center';
    tituloCard.style.marginTop = '3%';
    divRoot.appendChild(tituloCard)
 
    const subTituloCard = document.createElement('h2');
    subTituloCard.textContent = 'O melhor local para se hospedar traquilamente aqui nas Maldivas.'
    subTituloCard.className = 'subTitulo';
    subTituloCard.style.fontSize = '18px';
    subTituloCard.style.textAlign = 'center';
    divRoot.appendChild(subTituloCard);

    const cardDiv = document.createElement('div');
    cardDiv.style.display ='grid';
    cardDiv.style.gridTemplateColumns ='auto auto auto auto auto';
    cardDiv.className = 'cards';
    cardDiv.style.gap = '15px';

    for(var i=0; i < 5; i++){
        const card = Card();
        cardDiv.appendChild(card);
    }

    divRoot.appendChild(cardDiv);

    const footer = document.getElementById('footer');
    footer.innerHTML = '';

    const footers = Footer();
    footer.appendChild(footers);
}