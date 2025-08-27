import renderLoginPage from "./pages/Login.js";
import renderRegisterPage from "./pages/Register.js"; 
import renderHomePage from "./pages/Home.js";

const routes = {
    "/login": renderLoginPage,
    "/register": renderRegisterPage,
    "/home": renderHomePage
};

function getPath() {
    const url = (location.hash || "").replace(/^#/, "").trim();
    return url && url.startsWith("/") ? url : "/login";
}

function renderRoutes() {
    const url = getPath();
    const render = routes[url] || routes["/login"];
    render();
}

window.addEventListener('hashchange', renderRoutes);

document.addEventListener('DOMContentLoaded', renderRoutes);