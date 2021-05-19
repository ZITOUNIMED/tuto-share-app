import {ElementType} from "../element-type";

export interface AppElementContent {
  id: number;
  type: ElementType;
}

export interface TextContent extends AppElementContent{
  text: string;
}

export interface AttachmentContent extends AppElementContent{
  name: string;
  data: any;
  width: number;
  height: number;
}

export const emptyAppElementContent = (): AppElementContent => {
  return {
    id: null,
    type: null,
  };
}
