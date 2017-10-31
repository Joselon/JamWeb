var models= require('../models/models');

//Estadisticas iniciales
exports.index=function(req,res){
	var stats={
	  nQuizes:0,
	  nComments:0,
	  nmedioCommentsXQuiz:0,
	  nQuizSinComment:0,
	  nQuizConComment:0,
	  
};
	var listQuizComment=['~'];

models.Quiz.findAll({
	include: [{model: models.Comment}]
	}
	).then(
	 function(quizes) {
		stats.nQuizes=quizes.length;
		for (var i=0;i<quizes.length;i++){
		  if (quizes[i].Comments.length>0){
			console.log(quizes[i].Comments.length +' comentarios en '+quizes[i].pregunta);
			stats.nComments += (quizes[i].Comments.length);
			stats.nQuizConComment++;
			//listQuizComment.push(quizes[i].id);
		  }
		 if (quizes[i].tema==null){stats.nQuizSinComment++;}
		}
		stats.nmedioCommentsXQuiz=stats.nComments/stats.nQuizes;
		stats.nmedioCommentsXQuiz=stats.nmedioCommentsXQuiz.toFixed(2);
		
		res.render('statistics/show', {
			stats: stats,
			errors:[],
			listQuizComment:listQuizComment
		});
	}).catch(function(error){
		next(error);
	});
};
