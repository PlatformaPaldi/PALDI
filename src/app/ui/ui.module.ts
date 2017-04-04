import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { MobileFrameComponent } from './mobile-frame/mobile-frame.component';
import { ScrollDirective } from './scroll/scroll.directive';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    MobileFrameComponent,
    ScrollDirective
  ],
  exports: [
    MobileFrameComponent,
    ScrollDirective
  ]
})
export class UiModule { }