window.onload = () => {
    const flexes = document.getElementsByClassName('flex');
    console.log(flexes);
    for (let i = 0; i < flexes.length; i++) {
        const flex = flexes[i];
        flex.addEventListener('click', (e) => {
            openPopUp(flex.id);
        });
    }
    if (!!AOS)
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

const getPropsFromId = id => {
    switch(id) {
        case 'food':
            return {
                name: 'Food',
                attributes: [
                    {
                        name: 'Description',
                        type: 'text'
                    },
                    {
                        name: 'Date Made',
                        type: 'date'
                    },
                    {
                        name: 'Weight',
                        type: 'number'
                    },
                ]
            }
        case 'books':
            return {
                name: 'Stationary',
                attributes: [
                    {
                        name: 'Description',
                        type: 'text'
                    },
                    {
                        name: 'Weight',
                        type: 'number'
                    },
                ]
            }
        case 'Furniture':
            return {
                name: 'Furniture',
                attributes: [
                    {
                        name: 'Description',
                        type: 'text'
                    },
                    {
                        name: 'Material',
                        type: 'text'
                    },
                    {
                        name: 'Weight',
                        type: 'number'
                    },
                ]
            }
        case 'Electronics':
            return {
                name: 'Electronics',
                attributes: [
                    {
                        name: 'Description',
                        type: 'text'
                    },
                    {
                        name: 'Working Condition',
                        type: 'text'
                    },
                    {
                        name: 'Defects',
                        type: 'text'
                    }
                ]
            }
        case 'cloth':
            return {
                name: 'Electronics',
                attributes: [
                    {
                        name: 'Material',
                        type: 'text'
                    },
                    {
                        name: 'Clean',
                        type: 'text'
                    }
                ]
            }
        case 'medi':
            return {
                name: 'Medicines',
                attributes: [
                    {
                        name: 'Description',
                        type: 'text'
                    },
                    {
                        name: 'Expiry',
                        type: 'date'
                    }
                ]
            }
        case 'bed':
            return {
                name: 'Bedding',
                attributes: [
                    {
                        name: 'Description',
                        type: 'text'
                    },
                    {
                        name: 'Washed',
                        type: 'text'
                    }
                ]
            }
    }
}

const openPopUp = id => {
    const props = getPropsFromId(id);
    if (id === 'money')
        return;
    const h1 = document.querySelector('body > section.popup-container > div.popup > h1');
    const form = document.querySelector('body > section.popup-container > div.popup > form');
    while(form.firstChild) {
        form.removeChild(form.firstChild);
    }
    h1.innerText = props.name;
    props.attributes.forEach(attr => {
        const parentDiv = document.createElement('div');
        const attrInput = document.createElement('input');
        const attrLabel = document.createElement('label');
        attrLabel.innerText = attr.name;
        attrLabel.htmlFor = attr.name;
        attrInput.type = attr.type;
        if (attr.type === 'date') {
            M.Datepicker.init([attrInput]);
        }
        attrInput.id = attr.name;
        attrInput.name = attr.name;
        parentDiv.classList.add = "input-field"

        parentDiv.appendChild(attrLabel);
        parentDiv.appendChild(attrInput);

        form.appendChild(parentDiv);
        console.log(attrInput);
    });
    const button = document.createElement('button');
    button.type = 'submit';
    button.innerText = "SUBMIT";
    button.classList.add('button');
    button.classList.add('accent');
    form.appendChild(button);
    animateOnLogin('.popup-container');
}