
let state: any = {
  id: undefined,
  type: "content",
  label: "página em branco",
  page: {
    gadgets: [
      {
        type: "text",
        content: ""
      }
    ]
  },
  outedges: [],
  behavior: {
    type: "block",
    block: "<xml><block type=\"onnext\" x=\"10\" y=\"10\"><statement name=\"COMMANDS\"><block type=\"nextpage\"></block></statement></block></xml>"
  }
}

export default state;