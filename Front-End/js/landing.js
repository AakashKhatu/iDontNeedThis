document.addEventListener("DOMContentLoaded", e => {
    console.log()
});

const animateOnLogin = e => {
    const container = document.querySelector(".auth-popup-container");
    container.classList.add('active');
}