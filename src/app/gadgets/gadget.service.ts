import { Injectable, ComponentFactoryResolver, ComponentFactory, ViewContainerRef, Type } from '@angular/core';

import { Gadget } from "app/core/gadget";
import { ChoiceComponent } from './choice/choice.component';
import { ChoiceBoardComponent } from './choice/choice-board.component';
import { InputComponent } from './input/input.component';
import { InputBoardComponent } from "app/gadgets/input/input-board.component";
import { TextComponent } from './text/text.component';
import { TextBoardComponent } from "./text/text-board.component";

@Injectable()
export class GadgetService {

  constructor(private resolver: ComponentFactoryResolver) {
  }

  private _createComponent(compType: Type<any>, container: ViewContainerRef, gadget: Gadget) {
    let factory = this.resolver.resolveComponentFactory(compType);
    let component = container.createComponent(factory);
    component.instance.gadget = gadget;
    component.changeDetectorRef.detectChanges();
    return component;
  }

  createComponent (gadget: Gadget, edition: boolean, componentContainer: ViewContainerRef, boardContainer?: ViewContainerRef) {
    let componentType: Type<any>;
    let boardType: Type<any>;

    switch (gadget.type) {
      case 'text':
        componentType = TextComponent;
        boardType = TextBoardComponent;
        break;
      case 'choice':
        componentType = ChoiceComponent;
        boardType = ChoiceBoardComponent;
        break;
      case 'input':
        componentType = InputComponent;
        boardType = InputBoardComponent;
        break;
    }
    let component = this._createComponent(componentType, componentContainer, gadget);
    component.instance.edition = edition;
    if (edition && boardContainer && boardType) {
      let board = this._createComponent(boardType, boardContainer, gadget);
      if (component.instance.setBoard) {
        component.instance.setBoard(board);
      }
    }
  }
}