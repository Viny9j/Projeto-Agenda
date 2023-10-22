import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import './assets/css/style.css'

import Register from './modules/Register'
const register = new Register('.form-register')

import Login from './modules/Login'
const login = new Login('.form-login')

import Contatos from './modules/Contatos'
const contatos = new Contatos('.form-contato')

register.init()
login.init()
contatos.init()

console.log('Oi')