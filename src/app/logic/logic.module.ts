import { NgModule } from '@angular/core';
import { UiModule } from 'app/ui/ui.module';
import { SharedModule } from 'app/shared/shared.module';

import { LogicComponent } from './logic.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { BlockEditorComponent } from './block-editor/block-editor.component';


@NgModule({
  imports: [
    SharedModule,
    UiModule
  ],
  declarations: [
    LogicComponent,
    CodeEditorComponent,
    BlockEditorComponent
  ],
  exports: [
    LogicComponent
  ]
})
export class LogicModule { }