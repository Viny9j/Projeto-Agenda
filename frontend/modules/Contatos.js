import validator from 'validator'

export default class Contatos {
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

        const inputNome = document.querySelector('input[name="nome"]')
        const labelNome = document.querySelector('label[name="nome"]')

        const inputEmail = document.querySelector('input[name="email"]')

        const inputTelefone = document.querySelector('input[name="telefone"]')

    
        let error = false

        if(!inputNome.value) {
            const p = document.createElement('p')
            const msg = document.createTextNode('Nome precisa ser preenchido')
            p.appendChild(msg)
            p.classList.add('alert')
            p.classList.add('alert-danger')
            labelNome.before(p)
            error = true
        }

        if(!inputEmail.value && !inputTelefone.value) {
            const p = document.createElement('p')
            const msg = document.createTextNode('Pelo menos um contato precisa ser enviado: E-mail ou Telefone')
            p.appendChild(msg)
            p.classList.add('alert')
            p.classList.add('alert-danger')
            labelNome.before(p)
            error = true
        }

        if(inputEmail.value && !validator.isEmail(inputEmail.value)) {
            const p = document.createElement('p')
            const msg = document.createTextNode('E-mail precisa ser valido')
            p.appendChild(msg)
            p.classList.add('alert')
            p.classList.add('alert-danger')
            labelNome.before(p)
            error = true
        }

        if (!error) {
            el.submit()
        } 
    }   
}