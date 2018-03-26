
let state: any = {
  type: "intervention",
  page: {
    gadgets: [
      {
        type: "text",
        content: "Texto da pergunta"
      },
      {
        type: "input"
      }
    ]
  },
  behavior: {
    type: "block",
    block: "<xml><block type=\"onnext\" x=\"10\" y=\"10\"><statement name=\"COMMANDS\"><block type=\"variables_set\"><field name=\"VAR\">name</field><value name=\"VALUE\"><block type=\"getgadgetvalue\"><field name=\"GADGET_TYPE\">input</field></block></value><next><block type=\"nextpage\"></block></next></block></statement></block></xml>"
  }
}

export default state;