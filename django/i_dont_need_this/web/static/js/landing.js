window.onload = () => {
    AOS.init();
}
const animateOnLogin = e => {
    const container = document.querySelector(e);
    container.style.opacity = 1;
    container.style.zIndex = 2;
}

const openPassword = () => {
    const passwords = document.getElementsByClassName('password');
    console.log(passwords);
    for (let i = 0; i < passwords.length; i++) {
        const pass = passwords[i];
        pass.style.display = 'initial';
        pass.style.opacity = 1;
        console.log(pass)
    }

    document.getElementById('logsubmit').innerText = "SUBMIT";
}


const clickedNext = () => {
    const phoneField = document.getElementById('phone');
    const phone = phoneField.value;
    const isValidP = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
    if (isValidP.test(phone)) {
       openPassword(); 
    }
    console.log(isValidP.test(phone));
}

const animateClose = e => {
    const container = document.querySelector(e);
    container.style.opacity = 0;
    setTimeout(() => {container.style.zIndex = -10}, 500);
}