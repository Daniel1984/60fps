(function() {
  'use strict';

  var m = require('mithril');

  module.exports = function() {

    var _this = this;
    this.leaders = m.prop([]);
    this.nameError = m.prop('name can\'t be blank');
    this.name = m.prop('');

    this.submitNewLeader = function() {
      m.request({
        method: 'POST',
        url: GO.url,
        data: {
          name: _this.name(),
          score: score
        }
      }).then(function(res) {
        m.module(document.body, require('../modules/leader_list'));
      });
    };

    this.getLeaderList = function() {
      m.request({
        method: 'GET',
        url: GO.url
      })
      .then(function(res) {
        _this.leaders(res);
        m.redraw();
      }, function(err) {
        console.log(GO.url);
      });
    };

  };

})();
