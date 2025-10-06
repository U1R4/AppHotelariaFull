export async function loginRequest(email, senha, tipo){
    const response = await fetch("api/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email, 
            password: senha,
            tipo: tipo
        }),
        credentials: "same-origin"
    });

    const data = await response.json();

    if (!response.ok) {
        return {
            ok: false, 
            token: null, 
            message: data?.message || "Erro no login"
        };
    }

    return {
        ok: true,
        token: data.token,
        raw: data
    };
}

export function saveToken(token) {
    localStorage.setItem("auth_token", token);
}

export function getToken() {
    return localStorage.getItem("auth_token");
}

export function clearToken() {
    localStorage.removeItem("auth_token");
}