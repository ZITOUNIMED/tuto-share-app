import { NgModule } from "@angular/core";
import { AppCollectionComponent } from "./app-collection.component";
import { AppCollectionListComponent } from "./app-collection-list/app-collection-list.component";
import { CreateUpdateCollectionComponent } from "./shared/modal/create-update-collection/create-update-collection.component";
import { AppMaterialModule } from "../app.material.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AppDirectivesModule } from "../directive/app-directives.module";
import { AppCollectionService } from "./shared/service/app-collection.service";
import { AppCollectionSheetComponent } from './app-collection-sheet/app-collection-sheet.component';

@NgModule({
  imports: [
    AppMaterialModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AppDirectivesModule],
  declarations: [
    AppCollectionComponent,
    AppCollectionListComponent,
    CreateUpdateCollectionComponent,
    AppCollectionSheetComponent,
  ],
  providers: [AppCollectionService],
  entryComponents: [CreateUpdateCollectionComponent]
})
export class AppCollectionModule {}
