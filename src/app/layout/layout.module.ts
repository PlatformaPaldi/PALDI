import { UiModule } from 'app/ui/ui.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    SharedModule,
    UiModule
  ],
  declarations: [
    LayoutComponent,
    NavbarComponent
  ],
  exports: [
    NavbarComponent    
  ]
})
export class LayoutModule { }