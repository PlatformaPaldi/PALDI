import { RenameDialog } from './rename-dialog.component';
import { NgModule } from '@angular/core';
import { FlowComponent } from './flow.component';
import { SharedModule } from 'app/shared/shared.module';
import { UiModule } from 'app/ui/ui.module';
import { TextPageDialogComponent } from './textpage-dialog/textpage-dialog.component';
import { PassDialog } from '../flow/pass-dialog/pass-dialog.component';
import { ErrorPassDialog } from '../flow/pass-dialog/error-pass-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    UiModule
  ],
  declarations: [
    FlowComponent,
    RenameDialog,
    TextPageDialogComponent,
    PassDialog,
    ErrorPassDialog
],
  exports: [
    FlowComponent
  ],
  entryComponents: [
    RenameDialog,
    TextPageDialogComponent,
    PassDialog,
    ErrorPassDialog
  ]
})
export class FlowModule { }
