import renderLoginPage from "./pages/Login.js";
import renderRegisterPage from "./pages/Register.js"; 
import renderHomePage from "./pages/Home.js";
import renderCartPage from "./pages/Cart.js";

const routes = {
    "/login": renderLoginPage,
    "/register": renderRegisterPage,
    "/home": renderHomePage,
    "/cart": renderCartPage
};

function getPath() {
    const url = (location.pathname || "").replace("/AppHotelariaFull/", "/").trim();
    console.log(url);
    return url && url.startsWith("/") ? url : "/register";
}

function renderRoutes() {
    const url = getPath();
    const render = routes[url] || routes["/register"];
    render();
}

document.addEventListener('DOMContentLoaded', renderRoutes);