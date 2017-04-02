import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { GadgetService } from './gadget.service';
import { GadgetsComponent } from './gadgets.component';
import { ChoiceComponent } from './choice/choice.component';
import { ChoiceBoardComponent } from './choice/choice-board.component';
import { InputComponent } from './input/input.component';
import { InputBoardComponent } from "app/gadgets/input/input-board.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    GadgetsComponent,
    ChoiceBoardComponent,
    ChoiceComponent,
    InputComponent,
    InputBoardComponent
  ],
  entryComponents: [
    ChoiceComponent,
    ChoiceBoardComponent,
    InputComponent,
    InputBoardComponent
  ],
  providers: [
    GadgetService
  ],
  exports: [
    GadgetsComponent
  ]
})
export class GadgetsModule { }