var scoresCtrl = require(process.cwd() + '/controllers/scores_ctrl');

module.exports = function(app) {
  
  app.get('/', require(process.cwd() + '/controllers/home_ctrl').index);

  app.get('/scores', scoresCtrl.index);
  app.post('/scores', scoresCtrl.create);

}
