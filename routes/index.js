
var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// Página de entrada (home page)
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});


// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

router.get('/author', function(req, res) {
  res.render('author', { author: 'Jose Aurelio de Sande Villarroel' });
});
// Definición de rutas de /quizes
//router.get('/quizes/:search?',quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:search?',quizController.index);

router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
