import validator from 'validator'

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }

    init() {
        this.events();
    };

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) {
        const erros = document.querySelectorAll ('.alert');
        for(let p of erros){
            p.remove();
        }

        const el = e.target;

        const emailInput = el.querySelector('input[name="email"]')
        const emailLabel = el.querySelector('label[name="email"]')

        const passwordInput = el.querySelector('input[name="password"]')
        const passwordLabel = el.querySelector('label[name="password"]')

        let error = false
       
        if (!validator.isEmail(emailInput.value)) {
            const p = document.createElement('p')
            const msg = document.createTextNode('E-mail inválido')
            p.appendChild(msg)
            p.classList.add('alert')
            p.classList.add('alert-danger')
            emailLabel.before(p)
            error = true
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            const p = document.createElement('p')
            const msg = document.createTextNode('Senha incorreta')
            p.appendChild(msg)
            p.classList.add('alert')
            p.classList.add('alert-danger')
            passwordLabel.before(p)
            error = true
        }

        if (!error) el.submit()
    }   
}