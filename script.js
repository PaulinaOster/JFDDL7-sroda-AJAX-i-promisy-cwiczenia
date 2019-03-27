class App {
    constructor(selector) {
        this.container = document.querySelector(selector) || document.body;
        this.numberOfUsers = 10;
        this.genderOfUsers = ''; //this.means both genders
        this.searchTerm = '';
        this.users = null;
        this.focusedElement = null;
        this.isLoading = false;
        this.isError = false;

        this.render();
    }

    loadUsers() {
        if (this.isLoading) return;

        this.isLoading = true;
        this.isError = false;
        
        fetch(`https://randomuser.me/api/?results=${this.numberOfUsers}&gender=${this.genderOfUsers}`)
            .then(response => response.json())
            .then(data => { this.users = data.results; console.log(this) })
            .catch(() => this.isError = true)
            .finally(() => this.isLoading = false)
    }

    render() {
        this.container.innerHTML = '';

        this.renderInput('number', 'numberOfUsers');
        this.renderInput('text', 'genderOfUsers');
        this.renderButton('Załaduj', this.loadUsers.bind(this)) // funkcja onClick jest przekazana do funkcji bez kontekstu zatem trzeba dodać kontekst poprzez .bind(this)
    }

    renderInput(type, propertyName) {
        const input = document.createElement('input');
        input.setAttribute('type', type);
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

    renderButton(label, onClick) {
        const button = document.createElement('button');
        button.innerText = label;
        button.addEventListener(
            'click',
            onClick
        )
        this.container.appendChild(button);
    }
}