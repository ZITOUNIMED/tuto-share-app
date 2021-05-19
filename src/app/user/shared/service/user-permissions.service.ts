import { Injectable } from "@angular/core";
import { AppPermissions } from "src/app/permissions/model/app.permissions.model";
import { AppStoreService } from "src/app/shared/service/app.store.service";
import { oc, isNotEmptyArray } from "src/app/shared/app-utils";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { VisibilityStates } from "src/app/permissions/model/visibility-states";

@Injectable()
export class UserPermissionsService {

  constructor(private appStoreService: AppStoreService){}

  managePermissions(appPermissions: AppPermissions): Observable<VisibilityStates>{
    return this.appStoreService.getUser()
    .pipe(map(user => {
      let visibility = VisibilityStates.VISIBLE;
      if(isNotEmptyArray(oc(user).roles) && isNotEmptyArray(oc(appPermissions).roles)
         && !appPermissions.roles.some(role => user.roles.some(r => r.name === role))){
        visibility = VisibilityStates.REMOVED;
      }
      return visibility;
    }));
  }
}
