
var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var estadisticasController = require('../controllers/estadisticas_controllers');


router.use(sessionController.sessionDead);

// Página de entrada (home page)
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});



router.param('quizId', quizController.load);  // autoload :quizId
router.param('commentId', commentController.load);  // autoload :commentId

// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión


// Definición de rutas de /author
router.get('/author', function(req, res) {
  res.render('author', { author: 'Jose Aurelio de Sande Villarroel' , errors: []});
});


// Definición de rutas de /quizes
//router.get('/quizes/:search?',quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);


router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/new', 				         sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new',            commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',               commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
	                                    sessionController.loginRequired, commentController.publish);

router.get('/quizes/statistics', estadisticasController.mostrar);
router.get('/quizes/:search?',             quizController.index);

module.exports = router;
