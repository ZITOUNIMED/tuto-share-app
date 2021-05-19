import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppPermissionsDirective} from './app-permissions.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [AppPermissionsDirective],
  declarations: [AppPermissionsDirective],
})
export class AppDirectivesModule { }
