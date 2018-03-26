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
      next: { command: true, color: 'blue' },
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
      name: 'Eventos',
      color: 'green',
      blocks: filterblocks([
        {
          block: 'function onEnter() {\n  __\n}\n\n',
          title: 'Define o que ser realizado quando entrar no estado.'
        }, {
          block: 'function onNext() {\n  __\n}\n\n',
          title: 'O que fazer quando o usuário pedir para seguir adiante'
        }
      ])
    },
    {
      name: 'Transição',
      color: 'brown',
      blocks: filterblocks([
        {
          block: 'next();\n',
          title: 'Segue para a próxima página.'
        }, {
          block: 'next(__);\n',
          title: 'Segue a transição passada.'
        }
      ])
    }
  ]
};