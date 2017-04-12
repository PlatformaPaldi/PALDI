function filterblocks(a) {
  return a.map(function (e) {
    if (!e.id) {
      // As the id (for logging), use the first (non-puncutation) word
      e.id = e.block.replace(/^\W*/, '').
        replace(/^new /, '').replace(/\W.*$/, '');
      // If that doesn't turn into anything, use the whole block text.
      if (!e.id) { e.id = e.block; }
    }
    return e;
  });
}


export default {
  mode: 'javascript',
  modeOptions: {
    functions: {
      onEnter: { command: true, color: 'red' },
      rt: { command: true, color: 'blue' },
      sin: { command: false, value: true, color: 'green' }
    },
    categories: {
      conditionals: { color: 'purple' },
      loops: { color: 'green' },
      functions: { color: '#49e' }
    }
  },
  palette: [
    {
      name: 'Controle',
      color: 'orange',
      blocks: filterblocks([
        {
          block: 'function onEnter() {\n  __\n}\n\n',
          title: 'Define o que ser realizado quando entrar no estado.'
        }, {
          block: 'while (__ < __) {\n  __\n}',
          title: '  Repeat while a condition is true'
        }, {
          block: 'if (__ === __) {\n  __\n}',
          title: 'Do something only if a condition is true'
        }, {
          block: 'if (__ === __) {\n  __\n} else {\n  __\n}',
          title:
          'Do something if a condition is true, otherwise something else',
          id: 'ifelse'
        }
      ])
    }
  ]
};