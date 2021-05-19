import { Component, ViewChild, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './display-pdf-report.document.html',
    styleUrls: ['./display-pdf-report.document.css']
})
export class DisplayPdfReportComponent implements OnInit {
    @ViewChild('iframe', {static: false}) iframe: ElementRef;

    constructor(@Inject(MAT_DIALOG_DATA) public data: {doc: any}) {}

    ngOnInit() {
        this.iframe.nativeElement.src = this.data.doc.output('datauristring');
    }
}
