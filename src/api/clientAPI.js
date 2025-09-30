export async function loginRequest(email, senha){
   
    const dados = {email, password: senha};
    const response = await fetch("api/client", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados),
       
       credentials: "same-origin"
    });

    
}

 