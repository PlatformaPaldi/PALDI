
Blockly.JavaScript['onenter'] = function (block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'COMMAND');
  // TODO: Assemble JavaScript into code variable.
  var code = 'function onEnter() {\n  ' + statements + '\n}\n';
  return code;
};

Blockly.JavaScript['onnext'] = function (block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['nextpage'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['nexttransition'] = function (block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['gotopage'] = function (block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['isanswered'] = function (block) {
  var dropdown_gadgettype = block.getFieldValue('gadgetType');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['isspecificgadgetanswered'] = function (block) {
  var dropdown_index = block.getFieldValue('index');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['getgadgetvalue'] = function (block) {
  var dropdown_gadgettype = block.getFieldValue('gadgetType');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
