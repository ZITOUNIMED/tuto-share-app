import { ConfidentialityTypes } from "./confidentiality-types";
import { AppTargetTypes } from "./app.target-types";
import { RoleNameTypes } from "src/app/user/shared/model/role-name-types.enum";

export interface AppPermissions {
  targetType: AppTargetTypes;
  confidentialities?: ConfidentialityTypes[];
  roles?: RoleNameTypes[];
  targetObject?: any;
}

export const CLOSED_FEATURE_PERMISSIONS: AppPermissions = {
  targetType: AppTargetTypes.FEATURE,
  confidentialities: [ConfidentialityTypes.CLOSED_FEATURE]
};

export const ADMIN_AND_SOURCER_PERMISSIONS: AppPermissions = {
  targetType: AppTargetTypes.USER,
  roles: [RoleNameTypes.ROLE_ADMIN, RoleNameTypes.ROLE_SOURCER],
};

export const USER_PERMISSIONS: AppPermissions = {
  targetType: AppTargetTypes.USER,
  roles: [RoleNameTypes.ROLE_USER],
};

export const ADMIN_PERMISSIONS: AppPermissions = {
  targetType: AppTargetTypes.USER,
  roles: [RoleNameTypes.ROLE_ADMIN],
};
