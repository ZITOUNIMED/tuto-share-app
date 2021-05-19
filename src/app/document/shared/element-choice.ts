
import { ElementType } from './element-type';

export interface ElementChoice {
  key: ElementType;
  value: string;
}

export const ELEMENTS_CHOICES = [{
  key: ElementType.TEXT,
  value: 'Text'
},
{
  key: ElementType.SOURCE_CODE,
  value: 'Source code'
},
{
  key: ElementType.BIG_TITLE,
  value: 'Big title'
},
{
  key: ElementType.MEDIUM_TITLE,
  value: 'Medium title'
},
{
  key: ElementType.SMALL_TITLE,
  value: 'Small title'
},
{
  key: ElementType.VERY_SMALL_TITLE,
  value: 'Very small title'
},
{
  key: ElementType.LIST,
  value: 'List'
},
{
  key: ElementType.ATTACHMENT,
  value: 'Image'
},
{
  key: ElementType.HYPERLINK,
  value: 'Link'
}];
