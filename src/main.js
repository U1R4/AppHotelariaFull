import renderLoginPage from "./pages/Login.js";
import renderRegisterPage from "./pages/Register.js"; 
import renderHomePage from "./pages/Home.js";

const routes = {
    "/login": renderLoginPage,
    "/register": renderRegisterPage,
    "/home": renderHomePage
};

function getPath() {
    const url = (location.pathname || "").replace("/AppHotelariaFull/", "/").trim();
    console.log(url);
    return url && url.startsWith("/") ? url : "/home";
}

function renderRoutes() {
    const url = getPath();
    const render = routes[url] || routes["/home"];
    render();
}

document.addEventListener('DOMContentLoaded', renderRoutes);