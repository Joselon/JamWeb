var models=require('../models/models.js');

//Autoload :id de comentarios
exports.load=function(req,res,next,commentId){
	models.Comment.findOne({
		where:{
			id:Number(commentId)
		}
	}).then(function(comment){
	if (comment) {
		req.comment=comment;
		next();
	} else{next(new Error('No existe commentId= '+commentId))}
       }
    ).catch(function(error){next(error)});
};

//GET /quizes/:quizId/comments/new
exports.new=function(req,res) {
 res.render('comments/new.ejs',{quizid: req.params.quizId, errors:[]});
};

//POST /quizes/:quizId/comments
exports.create=function(req,res) {
 var comment=models.Comment.build(
	{texto: req.body.comment.texto,
	 publicado: false,
	 QuizId: req.params.quizId
	});
 comment.validate().then(
	function(err){
		if(err){
			res.render('error.ejs',
				{comment: comment, quizid: req.params.quizId, errors:err.errors});
		}else{
			comment.save() //save: guarda en DB campo texto de comment
			.then( function(){ res.redirect('/quizes/'+req.params.quizId)})
		}	//res.redirect: Redireccion HTTP a lista de preguntas
	}
	).catch(function(error){next(error)});
};

// PUT /quizes/:quizId/comments/:commentId/publish
exports.publish=function(req,res) {
	req.comment.publicado=true;
	req.comment.texto=req.comment.texto+'(Autorizado por: '+req.session.user.username+')';
	req.comment.save({fields: ["texto","publicado"]})
		.then( function(){res.redirect('/quizes/'+req.params.quizId);})
		.catch(function(error){next(error)});
};

// PUT /quizes/:quizId/comments/:commentId/hide
exports.hide=function(req,res) {
	req.comment.publicado=false;
	
	req.comment.save({fields: ["publicado"]})
		.then( function(){res.redirect('/quizes/'+req.params.quizId);})
		.catch(function(error){next(error)});
};
//POST /quizes/:quizId/comments/:commentId/update
exports.update=function(req,res){
    req.comment.texto= req.body.comment.texto
    req.comment.save({fields: ["texto"]})
        .then( function(){res.redirect('/quizes/'+req.params.quizId);})
        .catch(function(error){next(error)});
};
 
//DELETE 

exports.destroy=function(req,res){
	req.comment.destroy().then(function(){
	 res.redirect('/quizes/'+req.params.quizId);})
	.catch(function(error){next(error)});
};
