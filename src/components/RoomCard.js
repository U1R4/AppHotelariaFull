export default function Card() {
    const card = document.createElement('div');
    card.className = 'containerCard';
    card.innerHTML = 
    `
    <div style = "display: flex; flex-direction: column;">
    <div class="card" style="width: 18rem;">
  
        <img src="public/assets/images/Minimalist-carrocel.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                <a href="#" class="btn btn-primary">Reservar</a>
            </div>
    </div>
    </div>
    `;

    return card;
}