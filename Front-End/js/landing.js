window.onload = () => {
    AOS.init();
}
const animateOnLogin = e => {
    const container = document.querySelector(e);
    container.style.opacity = 1;
    container.style.zIndex = 2;
}

const animateClose = e => {
    const container = document.querySelector(e);
    container.style.opacity = 0;
    setTimeout(() => {container.style.zIndex = -10}, 500);
}