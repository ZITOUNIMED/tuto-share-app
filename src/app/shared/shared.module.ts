import {NgModule} from '@angular/core';
import {AppExcelExportComponent} from './app-excel-export/app-excel-export.component';
import { NotificationComponent } from './notification/notification.component';
import {CommonModule} from '@angular/common';
import { AppStoreService } from './service/app.store.service';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AppExcelExportComponent,
    NotificationComponent,
    LoadingComponent
  ],
  providers: [AppStoreService],
  exports: [
    AppExcelExportComponent,
    NotificationComponent,
    LoadingComponent,
  ]
})
export class SharedModule {

}
