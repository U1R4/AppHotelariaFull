export default function dateSelector() {

    const dateSelectorDiv = document.createElement('div');
    dateSelectorDiv.style.display = 'flex';
    dateSelectorDiv.style.zIndex = '100';
    dateSelectorDiv.style.gap = '12px';
    dateSelectorDiv.className = 'dateSelector';
    
    const dateSelectorIn = document.createElement('input');
    dateSelectorIn.type = 'date';
    dateSelectorIn.className = 'card p-4 shadow-lg inputDate';
    dateSelectorIn.style.width = '300px';
    dateSelectorIn.style.height = '70px';
    dateSelectorIn.style.maxWidth = '300px';
    dateSelectorIn.style.maxHeight = '70px';
    dateSelectorDiv.appendChild(dateSelectorIn);
    
    const dateSelectorOut = document.createElement('input');
    dateSelectorOut.type = 'date';
    dateSelectorOut.className = 'card p-4 shadow-lg inputDate';
    dateSelectorOut.style.width = '300px';
    dateSelectorOut.style.height = '70px';
    dateSelectorOut.style.maxWidth = '300px';
    dateSelectorOut.style.maxHeight = '70px';
    dateSelectorDiv.appendChild(dateSelectorOut);

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
    dateSelectorDiv.appendChild(guestsAmount);

    
    const btnDateReserv = document.createElement('button');
    btnDateReserv.type = 'submit';
    btnDateReserv.textContent = "Pesquisar";
    btnDateReserv.className = 'btn btn-primary';
    btnDateReserv.style.fontWeight = '16px';
    btnDateReserv.style.height = '69px';
    btnDateReserv.style.width = '100px';
    dateSelectorDiv.appendChild(btnDateReserv)

    return dateSelectorDiv;
}
