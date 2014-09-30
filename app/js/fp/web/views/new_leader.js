(function() {
  'use strict';

  module.exports = function(ctrl) {
    return m('div.page', [
      m('div.header.row-fluid', [
        m('div.container', [
          m("a.title[href='/']", [
            m("img[src='../img/logo2.png']")
          ])
        ])
      ]),
      m('div.body', [
        m('div.score-addition.container', [
          m('h1', 'You scored:'),
          m('div.score', score),
          m('div.col-md-6.col-md-offset-3', [
            m('table.table.table-bordered', [
              m('tbody', [
                m('tr', [
                  m('td.input-title', 'Enter your name and click submit:')
                ]),
                m('tr', [
                  m('td', [
                    m('p.bg-danger.hide', 'ctrl.model.nameError()'),
                    m("input.form-control.name-input[type='text'][maxlength='100'][placeholder='name']", {
                      onkeyup: m.withAttr('value', ctrl.model.name), value: ctrl.model.name() 
                    }),
                    m('button.btn.btn-default.btn-lg.btn-block', {
                      ontouchend: ctrl.submitLeader.bind(ctrl),
                      onclick: ctrl.submitLeader.bind(ctrl)
                    }, 'Submit'),
                    m('button.btn.btn-warning.btn-lg.btn-block', { 
                      ontouchend: ctrl.backToGame.bind(ctrl),
                      onclick: ctrl.backToGame.bind(ctrl)
                    }, 'Cancel')
                  ])
                ])
              ])
            ])
          ])
        ])
      ])
    ]);
  };

})();
