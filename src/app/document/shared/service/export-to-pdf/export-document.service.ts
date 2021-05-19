import {AppDocument} from '../../model/document.model';
import {Element} from '../../model/element.model';
import {ElementType} from '../../element-type';
import * as jsPDF from 'jspdf';
import {excelReportConfig} from '../../../../../environments/report/excel.config';
import { ExportToPdfGenericService } from './export-to-pdf-abstract.service';
import { AppPdfHtmlNode, FIRST_LINE, MAX_CONTENT_WITH, LINES_MARGIN, PAGE_CENTER, LINES_LEFT_MARGIN } from './export-to-pdf-utils';

export class ExportDocumentService extends ExportToPdfGenericService{

  exportAsPdf(doc: AppDocument): any {
    const pdf = new jsPDF();
    pdf.page = 1;
    const htmlStringNodes: AppPdfHtmlNode[] = this.convertdocumentElementstoHtmlNodes(doc.elements);
    let nextLine = FIRST_LINE;
    this.insertPageHeader(doc, pdf);
    for (let i = 0; i < htmlStringNodes.length; i++) {
      const appPdfHtmlNode = htmlStringNodes[i];
      pdf.fromHTML(appPdfHtmlNode.text, appPdfHtmlNode.leftPosition, nextLine);
      
      if (nextLine >= MAX_CONTENT_WITH) {
        pdf.addPage();
        this.insertPageHeader(doc, pdf);
        nextLine = FIRST_LINE;
      } else {
        nextLine += LINES_MARGIN;
      }
    }

    this.addFooters(pdf);
    return pdf;
  }

  // iframe.nativeElement.src = pdf.output('datauristring');
  // pdf.save(document.name + '.pdf');

  private insertPageHeader(doc: AppDocument, pdf: any) {
    const page = pdf.internal.getCurrentPageInfo().pageNumber;
    if (page === 1) { // first page
      pdf.fromHTML(`<h3>${doc.name}<h3>`, PAGE_CENTER - 20, 10);
    }
  }

  private addFooters(pdf: any) {
    const pageCount = pdf.internal.getNumberOfPages();
    pdf.setFontSize(11);
    for (let i = 0; i < pageCount; i++) {
      pdf.setPage(i);
      const page = pdf.internal.getCurrentPageInfo().pageNumber;
      const text = `Page ${page}/${pageCount}`;
      pdf.text(text, PAGE_CENTER, 280);
    }
  }

  private convertdocumentElementstoHtmlNodes(elements: Element[]): AppPdfHtmlNode[] {
    const documentHtmlTextElements = [];
    const biggerPage = this.getElementsBiggerPage(elements);
    for (let page = 0; page <= biggerPage; page++) {
      const pageHtmlElements = this.convertPageElementstoHtmlNodes(elements, page);
      if (pageHtmlElements && pageHtmlElements.length) {
        documentHtmlTextElements.push(...pageHtmlElements);
      }
    }

    return documentHtmlTextElements;
  }

  private convertPageElementstoHtmlNodes(elements: Element[], page: number): AppPdfHtmlNode[]{
    const htmlTexts = [];
    

    const elts = elements.filter(element => element.page === page)
      .sort((e1, e2) => e1.row - e2.row);

    for (let i = 0; i < elts.length; i++) {
      
      let htmlNodes = this.convertElementToHtmlNodes(elts[i]);
      htmlTexts.push(...htmlNodes);
    }
    return htmlTexts;
  }

  protected convertElementToHtmlNodes(element: Element): AppPdfHtmlNode[] {
    let subTexts = [];
    const titlesMap = new Map();
    titlesMap.set(ElementType.BIG_TITLE, 'h1');
    titlesMap.set(ElementType.MEDIUM_TITLE, 'h2');
    titlesMap.set(ElementType.SMALL_TITLE, 'h3');
    titlesMap.set(ElementType.VERY_SMALL_TITLE, 'h4');

    const titletag = titlesMap.get(element.type);
    if (element.text) {
      if (titletag) {
        subTexts = this.convertTitleToHtmlNodes(titletag, element.text);
      } else if (element.type === ElementType.TEXT) {
        subTexts = this.convertTextToHtmlNodes(element.text);
      } else if (element.type === ElementType.SOURCE_CODE) {
        subTexts = this.convertSourceCodeToHtmlNodes(element.text);
      }
    }
    return subTexts;
  }

  private getElementsBiggerPage(elements: Element[]): number {
    let biggerPage = 0;
    if (elements && elements.length > 0) {
      biggerPage = elements.sort((e1, e2) => e2.page - e1.page)[0].page;
    }
    return biggerPage;
  }

  private convertTitleToHtmlNodes(titletag: string, text: string): AppPdfHtmlNode[] {
    return [
      {
        leftPosition: LINES_LEFT_MARGIN,
        text: `<${titletag}>${text}</${titletag}>`
      }
      , {
        leftPosition: LINES_LEFT_MARGIN,
        text: ''
      }];
  }

  private convertTextToHtmlNodes(text: string): AppPdfHtmlNode[] {
    const subTexts = this.splitText(text);
    if (subTexts && subTexts.length) {
      return subTexts.map(txt => {
        return {
          leftPosition: LINES_LEFT_MARGIN,
          text: `<span>${txt}</span><br/>`
        };
      });
    }
    return [];
  }

  private splitText(text: string){
    const list1 = text.split(/\r\n|\n/);
    const res = [];
    for(let i = 0; i<list1.length; i++){
      res.push(...this.splitTextLine(list1[i]));
    }
    return res;
  }

  private splitTextLine(text: string): string[]{
    let res = [];
    let max = 100;
    let count = text.length / max;
    let from = 0;
    let to = 0;
    for(var i = 0; i<count; i++){
      from = to;
      to = this.findBlank(from + max, text);
      res.push(text.substring(from, to));
    }
    return res;
  }

  findBlank(from, text: string): number{
    let index = from;
    while(text[index] !== ' ' && index<text.length) index++;
    return index;
  }

  private convertSourceCodeToHtmlNodes(text: string): AppPdfHtmlNode[] {
    const subTexts = text.split(/\r\n|\n/);
    if (subTexts && subTexts.length) {
      //subTexts.unshift('');
      return subTexts.map(txt => {
        let marginLineLeft = this.getLineLeftMargin(txt);
        return {
          leftPosition: marginLineLeft,
          text: `<pre><textarea>${txt}</textarea></pre>`
        };
      });
    }
    return [];
  }

  private getLineLeftMargin(text: string): number {
    let count = 0;
    for(let i = 0; i<text.length && (text[i] == ' ' || text[i] == '	'); i++){
      if(text[i] == ' '){
        count++;
      } else if(text[i] == '	'){
        count+=2;
      }
    }
    return LINES_LEFT_MARGIN + count * 2;
  }

  formatElementsTextForExcelExporting(elements: Element[]): Element[] {
    const excelData = [];
    elements.forEach(element => {
      let text = element.text ? element.text.replace(/\n/g, excelReportConfig.newLineSeparator) : '';
      text = text ? text.replace(/"/g, excelReportConfig.doubleQuoteString) : '';
      excelData.push({...element, text: text});
    });
    return excelData;
  }
}
