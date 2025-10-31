const key = "hotel_cart";

export function setCart(hotel_cart) {
    localStorage.setItem(key, JSON.stringify(hotel_cart));

}

export function getCart() {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : { status: "draft", items: []};
    } catch {
      return {status: "draft", items: []};
    }

}

export function addItemToHotelCart(item) {
    const hotel_cart = getCart();
    hotel_cart.items.push(item);
    setCart(hotel_cart);
    return hotel_cart;

}

export function removeItemFromHotelCart(i) {
    const hotel_cart = getCart();
    hotel_cart.items.splice(i, 1);
    setCart(hotel_cart);
    return hotel_cart;

}

export function clearHotelCart() {
    setCart({
        status: "draft",
        items: []
    });
}

export function getTotalItems() {
    const { items } = getCart();
    const total = items.reduce((acc, it) => 
        acc + Number(it.subtotal || 0), 0
    );
    
    return {
        total,
        qtde_items: items.length
    };
}