const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);

class Usuario {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;

    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await UsuarioModel.create(this.body)
  }

  async login() {
    this.valida();
    if(this.errors.length > 0) return;
    this.user = await UsuarioModel.findOne({ email: this.body.email });

    if(!this.user) {
      this.errors.push('Usuário não existe.');
      return;
    }

    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }
  }

  async userExists() {
    this.user = await UsuarioModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Usuário já existe.');
  }

  valida() {
    this.cleanUp();

    // Validação
    // E-mail precisa ser valido
    if (!validator.isEmail(this.body.email)) this.errors.push('E-mail invalido')
    // A senha precisa ter entre 3 e 50 caracteres
    if (this.body.password.length < 3 || this.body.password.length > 50) this.errors.push('A senha precisa ter entre 3 e 50 caracteres')
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    };
  }
}

module.exports = Usuario;