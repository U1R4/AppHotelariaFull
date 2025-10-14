import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";
import Card from "../components/RoomCard.js";
import CardLounge from "../components/CardLounge.js";
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
    divRoot.appendChild(datesSelector.container);

    const {
        btnPesquisar,
        dateSelectorIn,
        dateSelectorOut,
        guestsAmount,
        errorCheckIn,
        errorCheckOut,
        errorGuests
    } = datesSelector.elements;

    const cardDiv = document.createElement('div');
    cardDiv.style.display ='grid';
    cardDiv.style.gridTemplateColumns ='auto auto auto auto auto';
    cardDiv.className = 'cards';
    cardDiv.style.gap = '15px';

    btnPesquisar.addEventListener("click", async (e) => {
        e.preventDefault();
    
        const inicio = dateSelectorIn.value;
        const fim = dateSelectorOut.value;
        const capacidadeTotal = parseInt(guestsAmount.value, 10);

        clearErrors();
    
        let hasError = false;
    
        if (!inicio) {
            showError(errorCheckIn, dateSelectorIn, 'Data de Check-in é obrigatória');
            hasError = true;
        }
    
        if (!fim) {
            showError(errorCheckOut, dateSelectorOut, 'Data de Check-out é obrigatória');
            hasError = true;
        }
    
        if (inicio && fim && new Date(inicio) >= new Date(fim)) {
            showError(errorCheckIn, dateSelectorIn, 'Check-in deve ser antes do Check-out');
            hasError = true;
        }
    
        if (!capacidadeTotal || isNaN(capacidadeTotal) || capacidadeTotal <= 0) {
            showError(errorGuests, guestsAmount, 'Quantidade de pessoas é obrigatória');
            hasError = true;
        }
    
        if (hasError) return;
    
        btnPesquisar.disabled = true;
        btnPesquisar.style.backgroundColor = 'gray';
        btnPesquisar.textContent = 'Buscando...';
    
        const result = await listAllRoomRequest(inicio, fim, capacidadeTotal);
    
        btnPesquisar.disabled = false;
        btnPesquisar.style.backgroundColor = '';
        btnPesquisar.textContent = 'Pesquisar';
        
        if(result.ok){
            cardDiv.innerHTML='';
            const quartosArray = result.raw;
            
            if (quartosArray && quartosArray.length > 0) {
                quartosArray.forEach((quarto, index) => {
                    const card = Card(quarto, index);
                    cardDiv.appendChild(card);
                });
            }
        }
    });

    function showError(errorElement, inputElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.style.borderColor = '#dc3545';
    }

    function clearErrors() {
        [errorCheckIn, errorCheckOut, errorGuests].forEach(error => {
            error.style.display = 'none';
        });
        [dateSelectorIn, dateSelectorOut, guestsAmount].forEach(input => {
            input.style.borderColor = '';
        });
    }

    divRoot.appendChild(cardDiv);



    const tituloLounge = document.createElement('h1');
    tituloLounge.textContent = 'Nossa infraestrutura'
    tituloLounge.className = 'titulo';
    tituloLounge.style.fontSize = '28px';
    tituloLounge.style.textAlign = 'center';
    tituloLounge.style.marginTop = '2%';
    divRoot.appendChild(tituloLounge);

    const cardLoungeDiv = document.createElement('div');
    cardLoungeDiv.className = 'cardLoungeDiv';
    cardLoungeDiv.style.marginTop = '2%';
    divRoot.appendChild(cardLoungeDiv);

    const loungeItems = [
        {path: "banheira-de-hidromassagem.jpg", title: "Restaurante", text: "Nosso restaurante é um espaço agradavel e familiar!"},
        {path: "melhores-piscinas-luxo.jpg", title: "SPA", text: "Nosso SPA é ideal para momentos de relaxamento!"},
        {path: "bar.jpg", title: "Bar", text: "Nosso bar oferece drinks sem metanol, confia!"}
    ];   
    
    for (let i = 0; i < loungeItems.length; i++) {
        const cardLoungeElement = CardLounge (loungeItems[i], i);
        cardLoungeDiv.appendChild(cardLoungeElement);
    }



    const footer = document.getElementById('footer');
    footer.innerHTML = '';

    const footers = Footer();
    footer.appendChild(footers);
}