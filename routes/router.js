var fpScoresCtrl = require(process.cwd() + '/controllers/fp_scores_ctrl');
var jjScoresCtrl = require(process.cwd() + '/controllers/jj_scores_ctrl');

module.exports = function(app) {
  
  app.get('/', require(process.cwd() + '/controllers/home_ctrl').index);

  app.get('/fp_scores', fpScoresCtrl.index);
  app.post('/fp_scores', fpScoresCtrl.create);

  app.get('/jj_scores', jjScoresCtrl.index);
  app.post('/jj_scores', jjScoresCtrl.create);

}
