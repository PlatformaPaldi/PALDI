import { RenameDialog } from './rename-dialog.component';
import { NgModule } from '@angular/core';
import { FlowComponent } from './flow.component';
import { SharedModule } from 'app/shared/shared.module';
import { UiModule } from 'app/ui/ui.module';

@NgModule({
  imports: [
    SharedModule,
    UiModule
  ],
  declarations: [
    FlowComponent,
    RenameDialog
  ],
  exports: [
    FlowComponent
  ],
  entryComponents: [
    RenameDialog
  ]
})
export class FlowModule { }