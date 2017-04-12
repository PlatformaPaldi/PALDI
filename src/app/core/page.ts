import { Choice } from './choice';
import { Input } from './input';
import { Text } from './text';
import { Gadget, GadgetType } from './gadget';

export class Page {
  gadgets: Gadget[];

  constructor(gadgets: Gadget[] = []) {
    this.gadgets = [];
    for (let gadget of gadgets) {
      switch (gadget.type) {
        case 'text':
          let text = gadget as Text;
          this.gadgets.push(new Text(text.content));
          break;
        case 'choice':
          let choice = gadget as Choice;
          this.gadgets.push(new Choice(choice.options));
          break;
        case 'input':
          let input = gadget as Input;
          this.gadgets.push(new Input(input.value, input.info, input.help));
          break;
      }
    }
  }

  update() {
    for(let gadget of this.gadgets) {
      gadget.update();
    }
  }

  get(id: number | GadgetType): Gadget | Gadget[] {
    if (typeof id == 'number') {
      // consider id as an index
      if (id >= 0 && id < this.gadgets.length) {
        return this.gadgets[id];
      }
      else {
        return undefined;
      }
    }
    else {
      // consider id as a string (GadgetType)
      let gadgets = this.gadgets.filter(gadget => gadget.type == id);
      if (gadgets.length == 1) {
        return gadgets[0];
      }
      else  {
        return gadgets;
      }
    }
  }

  /**
   * Insert a new gadget in a given position of the page.
   * @param index Position where the new gadget will be inserted.
   * @param type Type of the new gadget.
   */
  add(index: number, type: GadgetType) {
    switch (type) {
      case 'input':
        this.gadgets.splice(index, 0, new Input());
        break;
      case 'choice':
        this.gadgets.splice(index, 0, new Choice());
        break;
      case 'text':
        this.gadgets.splice(index, 0, new Text());
        break;
    }
  }

  /**
   * Remove a gadget from the page.
   * @param index Position of the gadget to remove.
   */
  delete(index: number) {
    this.gadgets.splice(index, 1);
  }

  /**
   * Swap the order of two gadgets: the gadget pointed by a index the and the previous one.
   * @param index Array index
   */
  swapUp(index: number) {
    if (index > 0 && index < this.gadgets.length) {
      this.swapDown(index - 1);
    }
  }

  /**
   * Swap the order of two gadgets: the gadget pointed by a index the and the following one.
   * @param index Array index
   */
  swapDown(index: number) {
    if (index >= 0 && index < this.gadgets.length - 1) {
      this.gadgets.splice(index, 0, this.gadgets.splice(index + 1, 1)[0]);
    }
  }

}
