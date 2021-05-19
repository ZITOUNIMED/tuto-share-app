import {NgModule} from '@angular/core';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {ToolBarComponent} from './tool-bar/tool-bar.component';
import {AppMaterialModule} from '../app.material.module';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AppDirectivesModule} from '../directive/app-directives.module';
import { AccountMenuComponent } from './account-menu/account-menu.component';

@NgModule({
  imports: [
    AppMaterialModule,
    RouterModule,
    BrowserModule,
    AppDirectivesModule],
  declarations: [NavBarComponent, ToolBarComponent, AccountMenuComponent],
  exports: [NavBarComponent, ToolBarComponent]
})
export class AppMenuModule {}
