import { NgModule } from "@angular/core";
import { UserPermissionsService } from "./shared/service/user-permissions.service";
import { AddMemberToCollectionComponent } from './shared/modal/add-member-to-collection/add-member-to-collection.component';
import { AppMaterialModule } from "../app.material.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppDirectivesModule } from "../directive/app-directives.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [AppMaterialModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AppDirectivesModule],
  providers: [UserPermissionsService],
  declarations: [AddMemberToCollectionComponent],
  entryComponents: [AddMemberToCollectionComponent]
})
export class UserModule {}
