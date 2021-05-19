
import { Element } from './element.model';
import { ConfidentialityTypes } from 'src/app/permissions/model/confidentiality-types';

export interface AppDocument {
  id: number;
  name: string;
  elements: Element[];
  ownerUsername: string;
  confidentiality?: ConfidentialityTypes;
  author: string;
  description: string;
  readonly lastUpdateDate?: string;
  readonly creationDate?: string;
}
