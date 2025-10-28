import { removeItemFromHotelCart, getCart } from "../store/CartStore.js";

export default function Grid(cartItems = [], onUpdateCart) {
    const Grid = document.createElement('div');
    Grid.className = "grid";
    
    const items = Array.isArray(cartItems) ? cartItems : [];
    const totalGeral = items.reduce((total, item) => total + (item.subtotal || 0), 0);

    const linhasQuartos = items.map((item, index) => `
        <tr>
            <th>${item.nome || 'Nome do Quarto'}</th>
            <td>
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        ${item.guest || 0} ${item.guest === 1 ? 'hóspede' : 'hóspedes'}
                        <br>
                        <small class="text-muted">
                            ${item.checkIn || ''} a ${item.checkOut || ''}<br>
                            ${item.daily || 0} diária(s)
                        </small>
                    </div>
                    <button
                        class="btn btn-sm btn-outline-danger remove-item"
                        data-item-index="${index}"
                        title="Remover item"
                    >
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
            <td>${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.subtotal || 0)}</td>
        </tr>
    `).join('');

    Grid.innerHTML = `
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Quarto</th>
              <th scope="col">Detalhes da Reserva</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            ${items.length > 0 ? linhasQuartos : `
                <tr>
                    <td colspan="3" class="text-center text-muted">
                        Nenhum quarto reservado
                    </td>
                </tr>
            `}
          </tbody>
          <tfoot>
            <th>Total:</th>
            <td class="text-center">
                ${items.length > 0 ? `
                    <button type="submit" class="btn btn-primary">Finalizar Reserva</button>
                ` : ''}
            </td>
            <td>${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalGeral)}</td>
          </tfoot>
        </table>
    `;

    Grid.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-item-index'));
            removeItemFromHotelCart(index);
            
            if (onUpdateCart) {
                onUpdateCart();
            }
        });
    });

    return Grid;
}