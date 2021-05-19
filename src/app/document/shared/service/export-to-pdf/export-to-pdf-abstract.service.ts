import { AppPdfHtmlNode } from "./export-to-pdf-utils";
import {Element} from '../../model/element.model';

export abstract class ExportToPdfGenericService {
    protected abstract convertElementToHtmlNodes(element: Element): AppPdfHtmlNode[];
}