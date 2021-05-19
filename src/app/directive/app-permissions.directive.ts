import {Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { AppPermissions } from '../permissions/model/app.permissions.model';
import { oc } from '../shared/app-utils';
import { UserPermissionsService } from '../user/shared/service/user-permissions.service';
import { AppTargetTypes } from '../permissions/model/app.target-types';
import { DocumentPermissionsService } from '../document/shared/service/document-permissions.service';
import { VisibilityStates } from '../permissions/model/visibility-states';
import { Observable, of } from 'rxjs';
import { ConfidentialityTypes } from '../permissions/model/confidentiality-types';

@Directive({
  selector: '[appPermissions]'
})
export class AppPermissionsDirective implements OnInit, OnChanges {

  @Input() appPermissions: AppPermissions;

  constructor(private el: ElementRef,
    private userPermissionsService: UserPermissionsService,
    private documentPermissionsService: DocumentPermissionsService,
  ) {
  }

  ngOnInit(){}

  private managePermissions(appPermissions: AppPermissions): Observable<VisibilityStates> {
    switch (this.appPermissions.targetType) {
      case AppTargetTypes.USER:
        return this.userPermissionsService.managePermissions(appPermissions);
      case AppTargetTypes.DOCUMENT:
        return this.documentPermissionsService.managePermissions(appPermissions);
      case AppTargetTypes.FEATURE:
        return this.manageFeaturePermissions(appPermissions);
      default: of(VisibilityStates.VISIBLE);
    }
  }

  private manageFeaturePermissions(appPermissions: AppPermissions): Observable<VisibilityStates> {
    if(appPermissions.confidentialities && appPermissions.confidentialities.some(confidentiality => confidentiality === ConfidentialityTypes.CLOSED_FEATURE)){
      return of(VisibilityStates.REMOVED);
    }
    return of(VisibilityStates.VISIBLE);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(oc(changes).appPermissions){
      const appPermissions = changes.appPermissions.currentValue;
      if(appPermissions.targetType){
        this.managePermissions(appPermissions)
        .subscribe(visibility => {
          if(visibility === VisibilityStates.REMOVED){
            this.el.nativeElement.remove();
          } else {
            this.el.nativeElement.style.visibility = (visibility === VisibilityStates.HIDEN) ?
            'hidden' : 'visible';
          }
        });

      }
    }
  }

}
