export async function listAllRoomRequest(inicio, fim, capacidadeTotal) {
    const dados = {
        inicio: inicio,
        fim: fim,
        capacidadeTotal: capacidadeTotal
    };
    
    try {
        const response = await fetch("api/rooms", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados),
            credentials: "same-origin"
        });
        
        const responseText = await response.text();
        
        let data = null;
        try {
            data = JSON.parse(responseText);
        } catch (error) {
            data = null;
        }

        if (!response.ok) {
            const message = data?.message || "Resposta inválida do servidor!";
            return {
                ok: false, 
                raw: data, 
                message: message
            };
        }

        return {
            ok: true,
            raw: data
        };

    } catch (error) {
        return {
            ok: false,
            raw: null,
            message: `Erro de rede: ${error.message}`
        };
    }
}

export async function createRoom(nome, numero, qnt_cama_casal, qnt_cama_solteiro, preco, disponivel) {

    const qntCamaCasal = parseInt(qnt_cama_casal) || 0;
    const qntCamaSolteiro = parseInt(qnt_cama_solteiro) || 0;
    const precoNum = parseFloat(preco) || 0;
    const disponivelBool = disponivel === 'true';

    const dados = {
        nome: nome.trim(), 
        numero: numero.trim(), 
        qnt_cama_casal: qntCamaCasal,
        qnt_cama_solteiro: qntCamaSolteiro,
        preco: precoNum, 
        disponivel: disponivelBool
    };

   const response = await fetch("api/rooms", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados),
        credentials: "same-origin"
    });
    
    let data = null;
    try {
        data = await response.json();
    } catch (error) {
        data = { message: "Resposta inválida do servidor" };
    }

    if (!response.ok) {
        const message = data?.message || `Erro ${response.status}: Falha ao criar o quarto.`;
        return { 
            ok: false, 
            data: null, 
            message 
        };
    }

    return {
        ok: true,
        data: data, 
        message: data?.message || "Quarto criado com sucesso."
    };
}
