import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppPermissions } from "src/app/permissions/model/app.permissions.model";
import { AppStoreService } from "src/app/shared/service/app.store.service";
import { map } from "rxjs/operators";
import { oc } from "src/app/shared/app-utils";
import { VisibilityStates } from "src/app/permissions/model/visibility-states";
import { AppDocument } from '../model/document.model';
import { RoleNameTypes } from "src/app/user/shared/model/role-name-types.enum";

@Injectable()
export class DocumentPermissionsService {

  constructor(private appStoreService: AppStoreService){}

  managePermissions(appPermissions: AppPermissions): Observable<VisibilityStates> {
    return this.appStoreService.getUser()
    .pipe(map(user => {
      let visibility = VisibilityStates.HIDEN;
      if(oc(appPermissions).targetObject && user){
        const doc = appPermissions.targetObject as AppDocument;

        // everything is visible for admin
        if(user.roles.some(role => role.name === RoleNameTypes.ROLE_ADMIN)){
          visibility = VisibilityStates.VISIBLE;
        }
        // by default: owner confidentiality
        else if(doc.ownerUsername === user.username){
          visibility = VisibilityStates.VISIBLE;
        }
      }
      return visibility;
    }));
  }

  // if(isNotEmptyArray(oc(appPermissions).confidentialities) &&
  //   appPermissions.confidentialities.some(c => c === .PRIVATE)){
  //   visibility = VisibilityStates.HIDEN;
  // } else
}
