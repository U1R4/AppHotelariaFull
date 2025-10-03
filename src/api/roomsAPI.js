export async function listAllRoomRequest(data) {
    const { inicio, fim, capacidadeTotal } = data;
    console.log(inicio, fim, capacidadeTotal);

    const response = await fetch("api/rooms", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            inicio,
            fim,
            capacidadeTotal
        }),
        credentials: "same-origin"
    });

    let responseData = null;

    try {
        responseData = await response.json();
    } catch {
        responseData = null;
    }

    if (!response.ok) {
        const message = "Resposta inválida do servidor!";
        return {
            ok: false, 
            raw: responseData, 
            message
        };
    }

    return {
        ok: true,
        raw: responseData
    };
}