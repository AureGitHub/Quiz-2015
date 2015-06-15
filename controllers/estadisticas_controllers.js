var models = require('../models/models.js');

exports.mostrar = function(req, res) {


  models.Quiz.findAll({
             include: [{
                 model: models.Comment
             }]
         }).then(function(quizes) {
       if (quizes) {

          var countQuizes=quizes.length;
          var countComent=0;
          var countQuizSinComentarios =0;
          var countQuizConComentarios =0;
          var i;
          for (i=0; i < quizes.length; i++) {
            if(quizes[i].Comments.length > 0){
                  countComent+=quizes[i].Comments.length;
                  countQuizConComentarios+=1;
            }
            else{
              countQuizSinComentarios+=1;
            }
          }

          var MediaComentarioXPregunta=countComent == 0 ? 0 : Math.round((countComent/countQuizes)*100)/100;
          var model = {
            estadistica: {
              countQuizes: countQuizes,
              countComent: countComent,
              countQuizSinComentarios : countQuizSinComentarios,
              countQuizConComentarios : countQuizConComentarios,
              MediaComentarioXPregunta : MediaComentarioXPregunta
            },
            errors: []
            };
          res.render('statistics/show', model);
       }
     }
   ).catch(function(error){
     console.log(error);
     next(error)
     });
}
  /*
  var quizes = 0;
  var comments = 0;
  var avgComments = 0;
  var partialQuizes = 0;
  models.Quiz.count().then(function(count){
    quizes = count;
    models.Comment.count().then(function(count){
      comments = count;
      avgComments = comments != 0 ? comments/quizes : 0;
      models.Quiz.count({ where: ['Comments.id IS NULL'], include: [{model: models.Comment}] }).then(function(count){
        partialQuizes = count;
        var model = {
          statistics: {
            questions: quizes,
            comments: comments,
            commentsavg: avgComments,
            questionswocomment: partialQuizes,
            questionswcomments: quizes - partialQuizes
          },
          errors: []
          };
        res.render('statistics/show', model);
      });
    });
  });
};*/
