import { Injectable } from "@angular/core";

import {Element} from '../../model/element.model';
import {ElementType} from '../../element-type';
import { ExportDocumentService } from "./export-document.service";
import { AppPdfHtmlNode, LINES_LEFT_MARGIN } from "./export-to-pdf-utils";

@Injectable()
export class ExportPdfDocumentAdvancedService extends ExportDocumentService {
    protected convertElementToHtmlNodes(element: Element): AppPdfHtmlNode[]{
        if(element.type === ElementType.LIST){
            return this.convertListToHtmlNodes(element);
        } else if(element.type === ElementType.ATTACHMENT){
            return this.convertAttachmentToHtmlNodes(element);
        }
        return super.convertElementToHtmlNodes(element);
    }

    private convertListToHtmlNodes(element): AppPdfHtmlNode[]{
        const list = {
            items: [],
            title: '',
            ...JSON.parse(element.text)
        };
        list.items.unshift('');
        return [{
            leftPosition: LINES_LEFT_MARGIN,
            text: `<br/><span>${list.title}</span>`+ '<ol>'
            +list.items.reduce((e1, e2) => e1 + `<li>${e2}</li>`)+'</ol>'
        }];
    }

    private convertAttachmentToHtmlNodes(element: Element): AppPdfHtmlNode[]{
        return [{
            leftPosition: LINES_LEFT_MARGIN,
            text: `<img [src]="'data:image/jpeg;base64,'+ ${element.attachment.data}" 
            width="${element.attachment.width}"
            height="${element.attachment.height}"
          />`
        }];
    }
}