const key = "HotelzinhoZica";

export function setCart(cart){
    localStorage.setItem(key ,JSON.stringify(cart));
}

export function getCart(){
    try{
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : {status: "draft", items :{}};
    }catch{
        return {status: "draft", items:[]};
    }
}

export function addItemCart(item){
    const cart = getCart();
    cart.items.push(item);
    setCart(cart);
    return cart;
}

export function removeItemCart(i){
    const fullCart = getCart();
    fullCart.items.splice(i,1);
    return fullCart;
}