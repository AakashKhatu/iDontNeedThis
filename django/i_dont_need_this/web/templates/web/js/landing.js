document.addEventListener("DOMContentLoaded", e => {
    setTimeout(() => {
        animateOnLogin();
    }, 3000);
});

const animateOnLogin = e => {
    const container = document.querySelector(".auth-popup-container");
    container.style.zIndex = 2;
    container.style.opacity = 1;
}

const animateClose = e => {
    const backdrop = document.querySelector('.auth-backdrop');
    const container = document.querySelector(".auth-popup-container");
    container.style.zIndex = -10;
    container.style.opacity = 0;
}