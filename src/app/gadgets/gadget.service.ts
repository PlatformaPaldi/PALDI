import { Injectable, ComponentFactoryResolver, ComponentFactory, ViewContainerRef, Type } from '@angular/core';

import { Gadget } from "app/core/gadget";
import { ChoiceComponent } from './choice/choice.component';
import { ChoiceBoardComponent } from './choice/choice-board.component';
import { InputComponent } from './input/input.component';
import { InputBoardComponent } from "app/gadgets/input/input-board.component";

@Injectable()
export class GadgetService {

  constructor(private resolver: ComponentFactoryResolver) {
  }

  private _createComponent(compType: Type<any>, container: ViewContainerRef, gadget: Gadget) {
    let factory = this.resolver.resolveComponentFactory(compType);
    let component = container.createComponent(factory);
    component.instance.gadget = gadget;
    component.changeDetectorRef.detectChanges();
  }

  createComponent (gadget: Gadget, componentContainer: ViewContainerRef, boardContainer?: ViewContainerRef) {
    let component: Type<any>;
    let board: Type<any>;

    switch (gadget.type) {
      case 'text':   // TODO
        break;
      case 'choice':
        component = ChoiceComponent;
        board = ChoiceBoardComponent;
        break;
      case 'input':
        component = InputComponent;
        board = InputBoardComponent;
        break;
    }
    this._createComponent(component, componentContainer, gadget);
    if (boardContainer) {
      this._createComponent(board, boardContainer, gadget);
    }

  }
}