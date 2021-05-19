export enum RegistrationRulesTypes {
  MANDATORY = 'MANDATORY',
  OPTIONAL = 'OPTIONAL',
}
export interface RegistrationRule {
  type: RegistrationRulesTypes;
  value: string;
}
