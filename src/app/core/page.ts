import { Choice } from './choice';
import { Input } from './input';
import { Gadget, GadgetType } from './gadget';

export class Page {
  gadgets: Gadget[] = [];

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
