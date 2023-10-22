const Usuario = require('../models/UsuarioModel');

exports.registerIndex = (req, res) => {
   res.render('register');
};
exports.loginIndex = (req, res) => {
   res.render('login');
};

exports.register = async (req, res) => {
  try{
    const usuario = new Usuario(req.body)
    await usuario.register();
  
    if(usuario.errors.length > 0) {
      req.flash('errors', usuario.errors)
      req.session.save(() => {
        return res.redirect('/register')
      });
      return;
    };
  
    req.flash('success', 'Usuario cadastrado com sucesso')
      req.session.save(() => {
        return res.redirect('/login')
      });
  
  } catch(e) {
    console.log(e);
    res.render('404')
  }
 
}

exports.login = async (req, res) => {
  try{
    const usuario = new Usuario(req.body)
    await usuario.login();
  
    if(usuario.errors.length > 0) {
      req.flash('errors', usuario.errors)
      req.session.save(() => {
        return res.redirect('/login')
      });
      return;
    };
  
    req.flash('success', 'Você entrou no sistema')
      req.session.save(() => {
        req.session.user = usuario.user;
        return res.redirect('/')
      });
  
  } catch(e) {
    console.log(e);
    res.render('404')
  }
}

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/')
  }