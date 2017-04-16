
let state: any = {
  type: "intervention",
  page: {
    gadgets: [
      {
        type: "text",
        content: "Texto da pergunta"
      },
      {
        type: "choice",
        options: [
          {
            value: "opc1",
            text: "Primeira opção"
          },
          {
            value: "opc2",
            text: "Segunda opção"
          }
        ]
      }
    ]
  },
  behavior: {
    type: "block",
    block: "<xml><block type=\"onnext\" x=\"10\" y=\"10\"><statement name=\"COMMANDS\"><block type=\"controls_if\"><value name=\"IF0\"><block type=\"isanswered\"><field name=\"GADGET_TYPE\">choice</field></block></value><statement name=\"DO0\">AAAAA</statement></block></statement></block></xml>"
  }
}

export default state;