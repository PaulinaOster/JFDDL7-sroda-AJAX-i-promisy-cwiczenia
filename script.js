class App {
    constructor (selector) {
        this.container = document.querySelector(selector) || document.body;
        this.numberOfUsers = 10;
        this.genderOfUsers = ''; //this.means both genders
        this.searchTerm = '';
        this.users = null;
        this.focusedElement = null;

        this.render();
    }

    render () {
        this.container.innerHTML = '';

        this.renderInput('number','numberOfUsers');
        this.renderInput('text','genderOfUsers');
        this.renderButton('Załaduj', () => {})
    }

    renderInput (type, propertyName) {
        const input = document.createElement('input');
        input.setAttribute('type',type);
        input.value = this[propertyName];
        input.addEventListener(
            'input',
            (event) => {
                this[propertyName] = event.target.value;
                this.focusedElement = propertyName;
                this.render()
            }
        )
        this.container.appendChild(input);
        if (this.focusedElement === propertyName) input.focus();
    }

    renderButton (label,onClick) {
        const button = document.createElement('button');
        button.innerText = label;
        button.addEventListener(
            'click',
            onClick
        )
        this.container.appendChild(button);
    }
}


fetch('https://randomuser.me/api/?results=100&nat=dk&gender=female')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.results.length; i++) {
            console.log(data.results[i].email)
        }
    }
    )