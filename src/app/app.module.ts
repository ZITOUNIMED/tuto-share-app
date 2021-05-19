import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { GenerecDialogComponent } from './generec-dialog/generec-dialog.component';
import {AppModuleRouting} from './app.module.routing';
import {StoreModule} from '@ngrx/store';
import {AuthenticationModule} from './authentication/authentication.module';
import {AppMenuModule} from './menu/app.menu.module';
import {DocumentModule} from './document/document.module';
import {HomeComponent} from './home/home.component';
import {AccountComponent} from './account/account.component';
import {appReducer} from './shared/app.reducer';
import {XhrInterceptor} from './authentication/xhr.interceptor';
import { UserComponent } from './user/user.component';
import { CreateUpdateUserComponent } from './user/shared/modal/create-update-user/create-update-user.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AppCollectionModule } from './app-collection/app-collection.module';

@NgModule({
  declarations: [
    AppComponent,
    GenerecDialogComponent,
    HomeComponent,
    AccountComponent,
    UserComponent,
    CreateUpdateUserComponent,
  ],
  entryComponents: [
    GenerecDialogComponent,
    CreateUpdateUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    AppModuleRouting,
    StoreModule.forRoot(appReducer),
    AuthenticationModule,
    AppMenuModule,
    DocumentModule,
    SharedModule,
    UserModule,
    AppCollectionModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
