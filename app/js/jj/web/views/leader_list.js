(function() {
  'use strict';

  module.exports = function(ctrl) {
    return m('div.page', [
      m('div.header.row-fluid', [
        m('div.container', [
          m("a.title", [
            m("img[src='../img/logo2.png']")
          ])
        ])
      ]),
      m('div.body', [
        m('div.leaderboard.container', [
          m('h2', 'Flappy plane leaderboard'),
          m('h4', 'Top 100 scores:'),
          m('div.col-md-6.col-md-offset-3', [
            m('table.table.table-bordered', [
              m('tbody', ctrl.model.leaders().map(function(item) {
                return m('tr', [
                  m('td', item.name),
                  m('td', item.score)
                ]);  
              })),
              m('tfoot', [
                m('tr', [
                  m("td[colspan='2']", [
                    m('button.btn.btn-default.btn-lg.btn-block', {
                      onclick: ctrl.onCancelClick.bind(ctrl),
                      ontouchend: ctrl.onCancelClick.bind(ctrl)
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
