(function() {
  'use strict';

  var Model = require('../models/leader');

  module.exports = function() {
    this.model = new Model();

    this.backToGame = function(e) {
      e.currentTarget.setAttribute("disabled", true);
      e.currentTarget.innerHTML = 'loading...';
      m.module(document.body, require('../modules/leader_list'));
    };

    this.submitLeader = function(e) {
      e.currentTarget.setAttribute("disabled", true);
      e.currentTarget.innerHTML = 'loading...';
      this.model.submitNewLeader();
    };
  };

})();
