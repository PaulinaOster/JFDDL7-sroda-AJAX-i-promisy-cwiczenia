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
        this.render();

        fetch(`https://randomuser.me/api/?results=${this.numberOfUsers}&gender=${this.genderOfUsers}`)
            .then(response => response.json())
            .then(data => this.users = data.results)
            .catch(() => this.isError = true)
            .finally(() => {
                this.isLoading = false;
                this.render()
            })
    }

    render() {
        this.container.innerHTML = '';
        this.renderForm();
        this.renderContent();
    }

    renderForm() {
        const formsDiv = document.createElement('div');
        const numberInput = this.renderInput('number', 'numberOfUsers');
        const textInput = this.renderInput('text', 'genderOfUsers');
        const button = this.renderButton('Załaduj', this.loadUsers.bind(this)) // funkcja onClick jest przekazana do funkcji bez kontekstu zatem trzeba dodać kontekst poprzez .bind(this)
        formsDiv.appendChild(numberInput);
        formsDiv.appendChild(textInput);
        formsDiv.appendChild(button);
        this.container.appendChild(formsDiv);

        if (this.focusedElement === 'numberOfUsers') numberInput.focus();
        if (this.focusedElement === 'genderOfUsers') textInput.focus();   
    }

    renderContent() {
        const renderUser = (user) => {
            const userDiv = document.createElement('div');
            const avatarDiv = document.createElement('div');
            const avatar = document.createElement('img');
            const nameAndEmailDiv = document.createElement('div');
            const nameDiv = document.createElement('div');
            const emailDiv = document.createElement('div');

            nameDiv.innerText = `${user.name.first} ${user.name.last}`;
            emailDiv.innerText = user.email;
            avatar.setAttribute('src', user.picture.thumbnail)

            userDiv.appendChild(avatarDiv);
            avatarDiv.appendChild(avatar);
            userDiv.appendChild(nameAndEmailDiv);
            nameAndEmailDiv.appendChild(nameDiv);
            nameAndEmailDiv.appendChild(emailDiv);

            userDiv.style.display = 'flex';
            nameAndEmailDiv.style.display = 'flex';
            nameAndEmailDiv.style.flexDirection = 'column'

            return userDiv
        }
        const renderUsers = () => {
            const usersContainerDiv = document.createElement('div');
            this.users.forEach(
                user => usersContainerDiv.appendChild(renderUser(user))
            );
            return usersContainerDiv
        }
        const getContent = () => {
            if (this.isError) {
                return document.createTextNode("Wystąpił błąd, spróbuj ponownie później.")
            }
            if (this.isLoading) {
                return document.createTextNode("Ładuję...");
            }
            if (this.users === null) {
                return document.createTextNode("Kliknij przycisk, aby załadować.")
            }
            if (this.users && this.users.length === 0) {
                return document.createTextNode("Nie ma żadnych użytkowników!")
            }
            if (this.users) {
                return renderUsers()
            }
        }

        const div = document.createElement('div');
        div.appendChild(getContent());
        this.container.appendChild(div);
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
        return input
    }

    renderButton(label, onClick) {
        const button = document.createElement('button');
        button.innerText = label;
        button.addEventListener(
            'click',
            onClick
        )
        return button
    }
}