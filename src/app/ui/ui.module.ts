import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { MobileFrameComponent } from './mobile-frame/mobile-frame.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [MobileFrameComponent],
  exports: [MobileFrameComponent]
})
export class UiModule { }