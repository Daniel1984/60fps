(function() {
  'use strict';

  module.exports = {

    controller: require('../controllers/leader_list_ctrl'),

    view: function(ctrl) { return require('../views/leader_list')(ctrl); }

  };

})();
