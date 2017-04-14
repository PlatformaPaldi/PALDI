declare const Blockly: any;

Blockly.Blocks['onenter'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Quando a página for apresentada");
    this.appendStatementInput("COMMAND")
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
    this.appendStatementInput("NAME")
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
    this.appendValueInput("NAME")
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
      .appendField("O gadget")
      .appendField(new Blockly.FieldDropdown([["escolha", "choice"], ["entrada de texto", "input"], ["valor numérico", "range"]]), "gadgetType")
      .appendField("foi respondido");
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
      .appendField(new Blockly.FieldDropdown([["primeiro", "0"], ["segundo", "1"], ["terceiro", "2"]]), "index")
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
      .appendField(new Blockly.FieldDropdown([["escolha", "choice"], ["entrada de texto", "input"], ["valor numérico", "range"]]), "gadgetType");
    this.setOutput(true, ["Number", "String"]);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};