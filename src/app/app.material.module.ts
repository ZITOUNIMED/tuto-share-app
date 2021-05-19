import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatSnackBarModule,
  MatChipsModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatRadioModule,
  MatCardModule,
} from '@angular/material';

import {DragDropModule} from '@angular/cdk/drag-drop';

const modules = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatSnackBarModule,
  MatChipsModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatRadioModule,
  MatCardModule,
  DragDropModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMaterialModule {}
