var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController=require('../controllers/comment_controller');
var sessionController=require('../controllers/session_controller');
var statsController=require('../controllers/stats_controller');

/* GET home page. */
router.get('/', function(req, res) {
 // console.log("ESTOY EN INDEX");
  res.render('index', { title: 'JAMWeb2',errors:[] });
});

//GET pagina de autor
router.get('/author', function(req, res) {
  res.render('author',{errors:[]});	
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId
router.param('commentId', commentController.load); //autoload: commentId

//Definicion de rutas de sesion
router.get('/login',	sessionController.new);    //formulario login
router.post('/login',	sessionController.create); //crear sesion
router.get('/logout',	sessionController.destroy);//destruir sesion 

// Definicion de rutas de /quizes
router.get('/quizes',				quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/show2', 	quizController.show2);
router.get('/quizes/new',		sessionController.loginRequired, quizController.new);
router.post('/quizes/create',		sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',	sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',	sessionController.loginRequired, quizController.destroy);


// Definicion de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',	 commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
					 sessionController.loginRequired, commentController.publish);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/hide',
					 sessionController.loginRequired, commentController.hide);
router.post('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/update', sessionController.loginRequired, commentController.update);					 
router.delete('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)',	 sessionController.loginRequired,commentController.destroy);
// Definicion de rutas de Estadisticas
router.get('/statistics', statsController.index);

module.exports = router;
