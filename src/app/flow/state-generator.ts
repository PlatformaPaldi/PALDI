
export class StateGenerator {

  // -----------------------------------------------------------------------------------------------------
  static createEmpty(label: string) {
    let state: any = {
      label: label,
      type: "content",
      page: {
        gadgets: [
          { type: "text", content: "" }
        ]
      },
      behavior: {
        type: "block",
        block: `
          <xml>
            <block type=\"onnext\" x=\"10\" y=\"10\">
              <statement name=\"COMMANDS\">
                <block type=\"nextpage\"></block>
              </statement>
            </block>
          </xml>`
      }
    };
    return state;
  }

  // -----------------------------------------------------------------------------------------------------
  static createInput(label: string, varName: string) {
    let state: any = {
      label: label,
      type: "intervention",
      page: {
        gadgets: [
          { type: "text", content: "Texto da pergunta" },
          { type: "input" }
        ]
      }
    };

    let block = '<block type=\"nextpage\"></block>';
    if (varName) {
      block = `
        <block type=\"variables_set\">
          <field name=\"VAR\">${varName}</field>
          <value name=\"VALUE\">
            <block type=\"getgadgetvalue\">
              <field name=\"GADGET_TYPE\">input</field>
            </block>
          </value>
          <next>${block}</next>
        </block>
        `;
    }
    block = `
      <xml>
        <block type=\"onnext\" x=\"10\" y=\"10\">
          <statement name=\"COMMANDS\">${block}</statement>
        </block>
      </xml>`;
    state.behavior = {
      type: 'block',
      block: block
    };
    return state;
  }

  // -----------------------------------------------------------------------------------------------------
  static createChoice(label: string, varName: string) {
    let state: any = {
      label: label,
      type: "intervention",
      page: {
        gadgets: [
          { type: "text", content: "Texto da pergunta" },
          { type: 'choice',
            options: [
              { value: "opc1", text: "Primeira opção" },
              { value: "opc2", text: "Segunda opção" }
            ]
          }
        ]
      }
    };
    let block: string;
    if (varName) {
      block = `
        <block type=\"variables_set\">
          <field name=\"VAR\">${varName}</field>
          <value name=\"VALUE\">
            <block type=\"getgadgetvalue\">
              <field name=\"GADGET_TYPE\">choice</field>
            </block>
          </value>
          <next>
            <block type=\"nexttransition\">
              <value name=\"TRANSITION\">
                <block type=\"variables_get\">
                  <field name=\"VAR\">${varName}</field>
                </block>
              </value>
            </block>
          </next>
        </block>`;
    }
    else {
      block = `
        <block type=\"nexttransition\">
          <value name=\"TRANSITION\">
            <block type=\"getgadgetvalue\">
              <field name=\"GADGET_TYPE\">choice</field>
            </block>
          </value>
        </block>`;
    }
    block = `
      <xml>
        <block type=\"onnext\" x=\"10\" y=\"10\">
          <statement name=\"COMMANDS\">
            <block type=\"controls_if\">
              <value name=\"IF0\">
                <block type=\"isanswered\">
                  <field name=\"GADGET_TYPE\">choice</field>
                </block>
              </value>
              <statement name=\"DO0\">${block}</statement>
            </block>
          </statement>
        </block>
      </xml>`;
    state.behavior = {
      type: 'block',
      block: block
    };
    return state;
  }

  // -----------------------------------------------------------------------------------------------------
  static createQuiz(label: string, varName: string) {
    let state: any = {
      label: label,
      type: "intervention",
      //type: "content",
      page: {
        gadgets: [
          { type: "quiz" },
        ]
      }
    };
    let block: string;
    if (varName) {
      block = `
        <block type=\"variables_set\">
          <field name=\"VAR\">${varName}</field>
          <value name=\"VALUE\">
            <block type=\"getgadgetvalue\">
              <field name=\"GADGET_TYPE\">quiz</field>
            </block>
          </value>
          <next>
            <block type=\"nexttransition\">
              <value name=\"TRANSITION\">
                <block type=\"variables_get\">
                  <field name=\"VAR\">${varName}</field>
                </block>
              </value>
            </block>
          </next>
        </block>`;
    } else {
      block = `
        <block type=\"nexttransition\">
          <value name=\"TRANSITION\">
            <block type=\"getgadgetvalue\">
              <field name=\"GADGET_TYPE\">quiz</field>
            </block>
          </value>
        </block>`;
    }
    block = `
      <xml>
        <block type=\"onnext\" x=\"10\" y=\"10\">
          <statement name=\"COMMANDS\">
            <block type=\"controls_if\">
              <value name=\"IF0\">
                <block type=\"isanswered\">
                  <field name=\"GADGET_TYPE\">quiz</field>
                </block>
              </value>
              <statement name=\"DO0\">${block}</statement>
            </block>
          </statement>
        </block>
      </xml>`;
    state.behavior = {
      type: 'block',
      block: block
    };
    return state;
  }

  static createMenu(label: string, varName: string) {
    let state: any = {
      label: label,
      type: "menu",
      page: {
        gadgets: [
          { type: "text" },
        ]
      }
    };
    let block: string;
    if (varName) {
      block = `
        <block type=\"variables_set\">
          <field name=\"VAR\">${varName}</field>
          <value name=\"VALUE\">
            <block type=\"getgadgetvalue\">
              <field name=\"GADGET_TYPE\">choice</field>
            </block>
          </value>
          <next>
            <block type=\"nexttransition\">
              <value name=\"TRANSITION\">
                <block type=\"variables_get\">
                  <field name=\"VAR\">${varName}</field>
                </block>
              </value>
            </block>
          </next>
        </block>`;
    }
    else {
      block = `
        <block type=\"nexttransition\">
          <value name=\"TRANSITION\">
            <block type=\"getgadgetvalue\">
              <field name=\"GADGET_TYPE\">choice</field>
            </block>
          </value>
        </block>`;
    }
    block = `
      <xml>
        <block type=\"onnext\" x=\"10\" y=\"10\">
          <statement name=\"COMMANDS\">
            <block type=\"controls_if\">
              <value name=\"IF0\">
                <block type=\"isanswered\">
                  <field name=\"GADGET_TYPE\">choice</field>
                </block>
              </value>
              <statement name=\"DO0\">${block}</statement>
            </block>
          </statement>
        </block>
      </xml>`;
    state.behavior = {
      type: 'code',
      code: `
        function onNext() {
          state.goToPage((state.page.get('choice').value));
        }
      `
    };
    return state;
  }

  static createSummary(label: string, varName: string) {
    let state: any = {
      label: label,
      type: "content",
      page: {
        gadgets: [
          { type: 'choice',
            options: [
              { value: "inicio", text: "Início" },
              { value: "historia 1", text: "Início da história" },
              { value: "capa", text: "Casa" }
            ]
          }
        ]
      }
    };
    let block: string;
    if (varName) {
      block = `
        <block type=\"variables_set\">
          <field name=\"VAR\">${varName}</field>
          <value name=\"VALUE\">
            <block type=\"getgadgetvalue\">
              <field name=\"GADGET_TYPE\">choice</field>
            </block>
          </value>
          <next>
            <block type=\"nexttransition\">
              <value name=\"TRANSITION\">
                <block type=\"variables_get\">
                  <field name=\"VAR\">${varName}</field>
                </block>
              </value>
            </block>
          </next>
        </block>`;
    }
    else {
      block = `
        <block type=\"nexttransition\">
          <value name=\"TRANSITION\">
            <block type=\"getgadgetvalue\">
              <field name=\"GADGET_TYPE\">choice</field>
            </block>
          </value>
        </block>`;
    }
    block = `
      <xml>
        <block type=\"onnext\" x=\"10\" y=\"10\">
          <statement name=\"COMMANDS\">
            <block type=\"controls_if\">
              <value name=\"IF0\">
                <block type=\"isanswered\">
                  <field name=\"GADGET_TYPE\">choice</field>
                </block>
              </value>
              <statement name=\"DO0\">${block}</statement>
            </block>
          </statement>
        </block>
      </xml>`;
    state.behavior = {
      type: 'code',
      code: `
        function onNext() {
          state.goToPage((state.page.get('choice').value));
        }
      `
    };
    return state;
  }
}
