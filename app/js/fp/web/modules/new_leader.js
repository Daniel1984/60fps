(function() {
  'use strict';

  module.exports = {

    controller: require('../controllers/new_leader_ctrl'),

    view: function(ctrl) { return require('../views/new_leader')(ctrl); }

  };

})();
