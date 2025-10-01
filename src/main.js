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
    const pathParts = location.pathname.split('/').filter(Boolean);
    pathParts.shift();
    const path = '/' + pathParts.join('/');
    console.log(path);
    return path;
}

// function getPath() {
//     const url = (location.pathname || "").replace("/AppHotelariaFull/", "/").trim();
//     console.log(url);
//     return url && url.startsWith("/") ? url : "/home";
// }

function renderRoutes() {
    const url = getPath();
    const render = routes[url] || routes["/home"];
    render();
}

document.addEventListener('DOMContentLoaded', renderRoutes);