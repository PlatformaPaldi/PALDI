import { NgModule } from '@angular/core';
import { UiModule } from 'app/ui/ui.module';
import { SharedModule } from 'app/shared/shared.module';

import { LogicComponent } from './logic.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { BlockEditorComponent } from './block-editor/block-editor.component';
import { AceEditorDirective, AceEditorComponent } from 'ng2-ace-editor';


@NgModule({
  imports: [
    SharedModule,
    UiModule
  ],
  declarations: [
    AceEditorDirective,
    AceEditorComponent,
    LogicComponent,
    CodeEditorComponent,
    BlockEditorComponent
  ],
  exports: [
    LogicComponent
  ]
})
export class LogicModule { }