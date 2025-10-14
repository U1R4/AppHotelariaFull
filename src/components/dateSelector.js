export default function dateSelector() {
    function getTodayDateISO() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const todayISO = getTodayDateISO();

    const dateSelectorDiv = document.createElement('div');
    dateSelectorDiv.style.display = 'flex';
    dateSelectorDiv.style.zIndex = '100';
    dateSelectorDiv.style.gap = '12px';
    dateSelectorDiv.className = 'dateSelector';
    dateSelectorDiv.style.alignItems = 'flex-start';

    const checkInContainer = document.createElement('div');
    checkInContainer.style.display = 'flex';
    checkInContainer.style.flexDirection = 'column';
    
    const dateSelectorIn = document.createElement('input');
    dateSelectorIn.type = 'date';
    dateSelectorIn.className = 'card p-4 shadow-lg inputDate check-in';
    dateSelectorIn.style.width = '300px';
    dateSelectorIn.style.height = '70px';
    dateSelectorIn.style.maxWidth = '300px';
    dateSelectorIn.style.maxHeight = '70px';
    dateSelectorIn.min = todayISO;
    checkInContainer.appendChild(dateSelectorIn);

    const errorCheckIn = document.createElement('div');
    errorCheckIn.className = 'error-message';
    errorCheckIn.style.display = 'none';
    errorCheckIn.style.color = '#dc3545';
    errorCheckIn.style.fontSize = '12px';
    errorCheckIn.style.marginTop = '5px';
    errorCheckIn.style.width = '300px';
    errorCheckIn.style.textAlign = 'center';
    checkInContainer.appendChild(errorCheckIn);
    
    dateSelectorDiv.appendChild(checkInContainer);

    const checkOutContainer = document.createElement('div');
    checkOutContainer.style.display = 'flex';
    checkOutContainer.style.flexDirection = 'column';
    
    const dateSelectorOut = document.createElement('input');
    dateSelectorOut.type = 'date';
    dateSelectorOut.className = 'card p-4 shadow-lg inputDate check-out';
    dateSelectorOut.style.width = '300px';
    dateSelectorOut.style.height = '70px';
    dateSelectorOut.style.maxWidth = '300px';
    dateSelectorOut.style.maxHeight = '70px';
    dateSelectorOut.min = todayISO;
    checkOutContainer.appendChild(dateSelectorOut);

    // Validação corrigida: check-out não pode ser no mesmo dia do check-in
    dateSelectorIn.addEventListener('change', function() {
        if (this.value) {
            const checkInDate = new Date(this.value);
            // Adiciona 1 dia para garantir que check-out seja pelo menos 1 dia depois
            checkInDate.setDate(checkInDate.getDate() + 1);
            const minCheckOut = `${checkInDate.getFullYear()}-${String(checkInDate.getMonth() + 1).padStart(2, '0')}-${String(checkInDate.getDate()).padStart(2, '0')}`;
            dateSelectorOut.min = minCheckOut;
            
            // Se o check-out atual for no mesmo dia ou antes do check-in, limpa o valor
            if (dateSelectorOut.value && new Date(dateSelectorOut.value) <= new Date(this.value)) {
                dateSelectorOut.value = '';
            }
        }
    });

    const errorCheckOut = document.createElement('div');
    errorCheckOut.className = 'error-message';
    errorCheckOut.style.display = 'none';
    errorCheckOut.style.color = '#dc3545';
    errorCheckOut.style.fontSize = '12px';
    errorCheckOut.style.marginTop = '5px';
    errorCheckOut.style.width = '300px';
    errorCheckOut.style.textAlign = 'center';
    checkOutContainer.appendChild(errorCheckOut);
    
    dateSelectorDiv.appendChild(checkOutContainer);

    const guestsContainer = document.createElement('div');
    guestsContainer.style.display = 'flex';
    guestsContainer.style.flexDirection = 'column';
    
    const guestsAmount = document.createElement('select');
    guestsAmount.innerHTML = `
        <option value="">Quantidade de Hospedes</option>
        <option value="1">1 pessoa</option>
        <option value="2">2 pessoas</option>
        <option value="3">3 pessoas</option>
        <option value="4">4 pessoas</option>
        <option value="5">5 ou mais pessoas</option>`;
    guestsAmount.className = 'card p-4 shadow-lg';
    guestsAmount.style.width = '300px';
    guestsAmount.style.height = '70px';
    guestsAmount.style.maxWidth = '300px';
    guestsAmount.style.maxHeight = '70px';
    guestsContainer.appendChild(guestsAmount);
    
    const errorGuests = document.createElement('div');
    errorGuests.className = 'error-message';
    errorGuests.style.display = 'none';
    errorGuests.style.color = '#dc3545';
    errorGuests.style.fontSize = '12px';
    errorGuests.style.marginTop = '5px';
    errorGuests.style.width = '300px';
    errorGuests.style.textAlign = 'center';
    guestsContainer.appendChild(errorGuests);
    
    dateSelectorDiv.appendChild(guestsContainer);
    
    const btnDateReserv = document.createElement('button');
    btnDateReserv.type = 'submit';
    btnDateReserv.textContent = "Pesquisar";
    btnDateReserv.className = 'btn btn-primary';
    btnDateReserv.style.fontWeight = '16px';
    btnDateReserv.style.height = '69px';
    btnDateReserv.style.width = '100px';
    btnDateReserv.style.marginTop = '0';

    dateSelectorDiv.appendChild(btnDateReserv);

    return {
        container: dateSelectorDiv,
        elements: {
            btnPesquisar: btnDateReserv,
            dateSelectorIn: dateSelectorIn,
            dateSelectorOut: dateSelectorOut,
            guestsAmount: guestsAmount,
            errorCheckIn: errorCheckIn,
            errorCheckOut: errorCheckOut,
            errorGuests: errorGuests
        }
    };
}