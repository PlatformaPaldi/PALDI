import { UiModule } from './../ui/ui.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { PlayerComponent } from './player.component';

@NgModule({
  imports: [
    SharedModule,
    UiModule
  ],
  declarations: [PlayerComponent],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }