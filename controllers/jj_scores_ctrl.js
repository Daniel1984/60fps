Score = require(process.cwd() + "/models/jj_score");
var score = new Score();

module.exports.index = function(req, res) {
  score.index(function(scores, err) {
    if(err) return res.json({}, 422);
    res.json(scores, 200);
  });
};

module.exports.create = function(req, res) {
  score.create(req.body, function(score, err) {
    if(err) return res.json(422, err)
    res.json({}, 200)
  });
};
