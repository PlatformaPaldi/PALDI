import { RenameDialog } from './rename-dialog.component';
import { NgModule } from '@angular/core';
import { FlowComponent } from './flow.component';
import { SharedModule } from 'app/shared/shared.module';
import { UiModule } from 'app/ui/ui.module';
import { TextPageDialogComponent } from './textpage-dialog/textpage-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    UiModule
  ],
  declarations: [
    FlowComponent,
    RenameDialog,
    TextPageDialogComponent
],
  exports: [
    FlowComponent
  ],
  entryComponents: [
    RenameDialog,
    TextPageDialogComponent
  ]
})
export class FlowModule { }