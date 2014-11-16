(function() {
  'use strict';

  var Model = require('../models/leader');

  module.exports = function() {
    this.model = new Model();
    this.model.getLeaderList();

    this.onCancelClick = function(e) {
      e.currentTarget.setAttribute("disabled", true);
      e.currentTarget.innerHTML = 'loading...';
      CocoonJS.App.enableTouchInCocoonJS();
      CocoonJS.App.hide();
    };

  };

})();
