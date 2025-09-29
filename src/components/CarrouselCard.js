export default function CarrouselCard(){
    const carrousel =document.createElement('div');

    carrocel.innerHTML=`
    <div id="carouselExampleIndicators" class="carousel slide">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>

    <div class="carousel-inner shadow">

        <div class="carousel-item active">
            <img src="public/assets/images/Minimalist-carrocel.jpg" class="d-block w-100" alt="...">
        </div>

        <div class="carousel-item">
            <img src="public/assets/images/Minimalist-carrocel-2.jpg" class="d-block w-100" alt="...">
        </div>

        <div class="carousel-item">
            <img src="public/assets/images/Minimalist-carrocel-3.jpg" class="d-block w-100" alt="...">
        </div>

    </div>
    </div>
    `;
    
    return carrousel;

}