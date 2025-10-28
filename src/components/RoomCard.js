import { addItemToHotelCart } from "../store/CartStore.js";

function calcularDiaria(checkIn, checkOut) {
    const [yin, min, din] = String(checkIn).split("-").map(Number);
    const [yout, mout, dout] = String(checkOut).split("-").map(Number);

    const tin = Date.UTC(yin, min - 1, din);
    const tout = Date.UTC(yout, mout - 1, dout);
    
    const diffTime = Math.abs(tout - tin);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
}

export default function Card(quarto, index) {
    const {
        id,
        nome,
        numero,
        qnt_cama_casal,
        qnt_cama_solteiro,
        preco,
        fotos,
        capacidadeTotal
    } = quarto || {};

    let fotoPrincipal = fotos && fotos.length > 0 ? fotos[0] : 'FotoCard1.jpeg';
    
    const camas = [
        (qnt_cama_casal > 0 ? `${qnt_cama_casal} cama(s) de casal` : null),
        (qnt_cama_solteiro > 0 ? `${qnt_cama_solteiro} cama(s) de solteiro` : null),
    ].filter(Boolean).join(' - ');

    const card = document.createElement('div');
    card.className = 'containerCard';
    card.innerHTML = 
    `
    <div style="display: flex; flex-direction: column;">
        <div class="card" style="width: 18rem;">
            <img src="uploads/${fotoPrincipal}" class="card-img-top" alt="${nome}">
            <div class="card-body">
                <h5 class="card-title">${nome}</h5>
                <p class="card-text">
                    <strong>Número:</strong> ${numero}<br>
                    <strong>Capacidade:</strong> ${capacidadeTotal} pessoas<br>
                    ${camas ? `<strong>Camas:</strong> ${camas}<br>` : ''}
                    <strong>Preço:</strong> R$ ${preco}
                </p>
                <a href="#" class="btn btn-primary btn-reservar">Reservar</a>
            </div>
        </div>
    </div>
    `;

    card.querySelector(".btn-reservar").addEventListener('click', (e) => {
        e.preventDefault();

        const idDateCheckIn = document.getElementById("check-in");
        const idDateCheckOut = document.getElementById("check-out");
        const idGuestAmount = document.getElementById("guest-amount");
    
        const inicio = (idDateCheckIn?.value || "").trim();
        const fim = (idDateCheckOut?.value || "").trim();
        const qtdPessoas = parseInt((idGuestAmount?.value || "0").trim(), 10);

        if (!inicio || !fim || isNaN(qtdPessoas) || qtdPessoas <= 0) {
            console.log("Preencha todos os campos!");
            alert("Preencha todos os campos de data e número de hóspedes!");
            return;
        }

        const daily = calcularDiaria(inicio, fim);

        const subtotal = parseFloat(preco) * daily;

        const novoItemReserva = {
            id, 
            nome,
            checkIn: inicio,
            checkOut: fim,
            guest: qtdPessoas,
            daily,
            subtotal
        }

        addItemToHotelCart(novoItemReserva);
        alert(`Reserva do quarto ${nome} - Preço/Diária: R$ ${preco} - N° de diárias: ${daily} - Subtotal: R$ ${subtotal}`);
    });

    return card;
}