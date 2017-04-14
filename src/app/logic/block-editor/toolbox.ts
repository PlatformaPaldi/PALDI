declare const Blockly: any;

Blockly.Blocks['onenter'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Quando a página for apresentada");
    this.appendStatementInput("COMMANDS")
      .setCheck(null);
    this.setColour(120);
    this.setTooltip('Comandos a executar quando a página for apresentada');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['onnext'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Quando o leitor pedir para seguir adiante");
    this.appendStatementInput("COMMANDS")
      .setCheck(null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['nextpage'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Segue para a próxima página");
    this.setPreviousStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['nexttransition'] = {
  init: function () {
    this.appendValueInput("TRANSITION")
      .setCheck(null)
      .appendField("Segue a transição identificada por");
    this.setPreviousStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['isanswered'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("A")
      .appendField(new Blockly.FieldDropdown([["escolha", "choice"], ["entrada de texto", "input"], ["valor numérico", "range"]]), "GADGET_TYPE")
      .appendField("foi respondida");
    this.setOutput(true, "Boolean");
    this.setColour(230);
    this.setTooltip('Verifica se o primeiro gadget de um determinado tipo foi respondido pelo leitor');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['isspecificgadgetanswered'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("O")
      .appendField(new Blockly.FieldDropdown([["primeiro", "0"], ["segundo", "1"], ["terceiro", "2"]]), "INDEX")
      .appendField("gadget foi respondido");
    this.setOutput(true, "Boolean");
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['getgadgetvalue'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("resposta do(a)")
      .appendField(new Blockly.FieldDropdown([["escolha", "choice"], ["entrada de texto", "input"], ["valor numérico", "range"]]), "GADGET_TYPE");
    this.setOutput(true, ["Number", "String"]);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.JavaScript['onenter'] = function (block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'COMMANDS');
  var code = `function onEnter() {\n${statements}}\n`;
  return code;
};

Blockly.JavaScript['onnext'] = function (block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'COMMANDS');
  var code = `function onNext() {\n${statements}}\n`;
  return code;
};

Blockly.JavaScript['nextpage'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'state.next();\n';
  return code;
};

Blockly.JavaScript['nexttransition'] = function (block) {
  var transition = Blockly.JavaScript.valueToCode(block, 'TRANSITION', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = `state.next(${transition});\n`;
  return code;
};

Blockly.JavaScript['isanswered'] = function (block) {
  var gadgettype = block.getFieldValue('GADGET_TYPE');
  var code = `state.page.get('${gadgettype}').isAnswered`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['isspecificgadgetanswered'] = function (block) {
  var index = block.getFieldValue('INDEX');
  var code = `state.page.get(${index}).isAnswered`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['getgadgetvalue'] = function (block) {
  var gadgettype = block.getFieldValue('GADGET_TYPE');
  var code = `state.page.get('${gadgettype}').value`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

export default `
<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
  <category name="Eventos" colour="#5ba55b">
    <block type="onenter"></block>
    <block type="onnext"></block>
  </category>
  <category name="Transição" colour="#a5935b">
    <block type="nextpage"></block>
    <block type="nexttransition"></block>
  </category>
  <category name="Lógica" colour="#5b5ba5">
    <block type="controls_if"></block>
    <block type="isanswered">
      <field name="gadgetType">choice</field>
    </block>
    <block type="isspecificgadgetanswered">
      <field name="index">0</field>
    </block>
  </category>
  <category name="Valores" colour="#5ba593">
    <block type="text">
      <field name="TEXT"></field>
    </block>
    <block type="getgadgetvalue">
      <field name="gadgetType">choice</field>
    </block>
  </category>
  <category name="Variáveis" colour="#A65C81" custom="VARIABLE"></category>
</xml>
`;