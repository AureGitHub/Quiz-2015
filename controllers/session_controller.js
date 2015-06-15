// MW Comprueba si la session ha muerto (2 min)
exports.sessionDead = function(req, res, next) {
  if(req.session.user){
    var actual = new Date().getTime();
    console.log(actual);
    console.log(req.session.user.timeout);
    if(req.session.user.timeout > actual){
      var timeout = actual + 120000; //regenero el timeout
      req.session.user.timeout = timeout;
    }else{
      delete req.session.user;
      req.session.errors = [{"message": 'Sesion Finalizada '}];
      res.redirect('/login');
    }
  }
  next();
};

// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};


// Get /login   -- Formulario de login
exports.new = function(req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};

    res.render('sessions/new', {errors: errors});
};

// POST /login   -- Crear la sesion si usuario se autentica
exports.create = function(req, res) {

    var login     = req.body.login;
    var password  = req.body.password;

    var userController = require('./user_controller');
    userController.autenticar(login, password, function(error, user) {

        if (error) {  // si hay error retornamos mensajes de error de sesión
            req.session.errors = [{"message": 'Se ha producido un error: '+error}];
            res.redirect("/login");
            return;
        }

        // Crear req.session.user y guardar campos   id  y  username
        // La sesión se define por la existencia de:    req.session.user

        //le añado 2 minutos a fecha actual
        var timeout = new Date().getTime();
        timeout+= 120000;
        req.session.user = {id:user.id, username:user.username,timeout: timeout};

        res.redirect(req.session.redir.toString());// redirección a path anterior a login
    });
};

// DELETE /logout   -- Destruir sesion
exports.destroy = function(req, res) {
    delete req.session.user;
    res.redirect(req.session.redir.toString()); // redirect a path anterior a login
};
