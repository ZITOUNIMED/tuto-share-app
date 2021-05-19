import {FormGroup} from '@angular/forms';

import {ElementType} from '../element-type';
import {AppElementContent, AttachmentContent, emptyAppElementContent, TextContent} from "./app-element-content";

export interface Element {
  id: number;
  type: ElementType;
  text: string;
  row: number;
  page: number;
  form?: FormGroup;
  appElementContent?: AppElementContent | TextContent | AttachmentContent;
}

export const emptyElement = (): Element => {
  return {
    id: null,
    type: null,
    text: '',
    appElementContent: emptyAppElementContent(),
    row: -1,
    page: -1,
    form: null,
  };
}

export const MAX_TEXT_LENGTH = 1200;
