export default function Card(quarto, index) {
    const card = document.createElement('div');
    card.className = 'containerCard';
    card.innerHTML = 
    `
    <div style="display: flex; flex-direction: column;">
        <div class="card" style="width: 18rem;">
            <img src="uploads/${quarto.fotoNome}" class="card-img-top" alt="${quarto.nome}">
            <div class="card-body">
                <h5 class="card-title">${quarto.nome}</h5>
                <p class="card-text">
                    <strong>Número:</strong> ${quarto.numero}<br>
                    <strong>Capacidade:</strong> ${quarto.capacidadeTotal} pessoas<br>
                    <strong>Preço:</strong> R$ ${quarto.preco}
                </p>
                <a href="#" class="btn btn-primary">Reservar</a>
            </div>
        </div>
    </div>
    `;

    return card;
}