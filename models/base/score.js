var db = require(process.cwd() + "/db/mongo");
var validate = require('mongoose-validator').validate;

function Score(model_name) {
	var ScoreSchema = new db.Schema({
	  name: {
	    type: String,
	    validate: validate('len', 1, 100)
	   },
	  score: {
	    type: Number,
	    required: true,
	    max: 4000
	  },
	  created_at: {
	    type: Date,
	    default: Date.now
	  }
	});
	
	this.score = db.mongoose.model(model_name, ScoreSchema);
	
}

Score.prototype.create = function(score, cb) {
  this.score(score).save(function(err, post) {
    if(err) return cb(null, err);
    cb(post, null);
  });
};

Score.prototype.index = function(cb) {
  this.score.find().sort({ score: -1 }).limit(100).exec(function(err, scores) {
    if(err) return cb(null, err);
    cb(scores, null);
  });
};

module.exports = Score;
