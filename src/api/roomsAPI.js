import { getToken } from "./authAPI";

export async function listAllRoomRequest(){

    const token = getToken();

    const response = await fetch("api/rooms", {
        method:"GET",
        headers:{
            "Accept":"aplication;json",
            "Content-Type":"aplication/json"
        }
    })
}