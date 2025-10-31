import { removeItemFromHotelCart, getCart, clearHotelCart } from "../store/CartStore.js";
import { finishedOrder } from "../api/reserveAPI.js";
import { getToken } from "../api/authAPI.js";

function mostrarPopupPagamento() {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.className = 'modal fade show d-block';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Selecione o Método de Pagamento</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="radio" name="pagamento" id="pagamentoCredito" value="credito" checked>
                            <label class="form-check-label" for="pagamentoCredito">
                                Cartão de Crédito
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="radio" name="pagamento" id="pagamentoDebito" value="debito">
                            <label class="form-check-label" for="pagamentoDebito">
                                Cartão de Débito
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="pagamento" id="pagamentoPix" value="pix">
                            <label class="form-check-label" for="pagamentoPix">
                                PIX
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary btn-confirmar">Confirmar</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const btnConfirmar = modal.querySelector('.btn-confirmar');
        const btnCancelar = modal.querySelector('.btn-cancelar');

        btnConfirmar.addEventListener('click', () => {
            const metodoSelecionado = modal.querySelector('input[name="pagamento"]:checked').value;
            document.body.removeChild(modal);
            resolve(metodoSelecionado);
        });

        btnCancelar.addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve(null);
        });
    });
}

async function finalizarReserva(cartItems, metodoPagamento) {
    try {
        const token = getToken();
        
        if (!token) {
            alert("Você precisa estar logado para fazer uma reserva");
            return false;
        }

        const result = await finishedOrder(cartItems, metodoPagamento);
        
        if (result.ok) {
            alert("Reserva realizada com sucesso!");
            clearHotelCart();
            return true;
        } else {
            alert("Erro ao realizar reserva: " + (result.message || "Erro desconhecido"));
            return false;
        }

    } catch (error) {
        console.error("Erro na reserva:", error);
        alert("Erro de comunicação ao tentar reservar");
        return false;
    }
}

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
                    <button type="button" class="btn btn-primary btn-finalizar-reserva">
                        Finalizar Reserva
                    </button>
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

    const btnFinalizar = Grid.querySelector('.btn-finalizar-reserva');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', async function() {
            const metodoPagamento = await mostrarPopupPagamento();
            
            if (!metodoPagamento) {
                return;
            }

            this.disabled = true;
            this.textContent = "Processando...";
            
            const success = await finalizarReserva(items, metodoPagamento);
            
            if (success && onUpdateCart) {
                onUpdateCart();
            } else {
                this.disabled = false;
                this.textContent = "Finalizar Reserva";
            }
        });
    }

    return Grid;
}