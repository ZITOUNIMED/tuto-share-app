import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppDocument} from '../../model/document.model';
import {Element} from '../../model/element.model';
import {excelReportConfig} from '../../../../../environments/report/excel.config';
import { oc, isNotEmptyArray } from 'src/app/shared/app-utils';
import { INPUT_TEXT_LONG } from '../../../../shared/constants-utils';

@Component({
  templateUrl: './import-document-file.component.html'
})
export class ImportDocumentFileComponent implements OnInit {
  _documents: AppDocument[];
  fb = new FormBuilder();
  importForm: FormGroup;
  INPUT_TEXT_LONG = INPUT_TEXT_LONG;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {}) {}

  selectFiles($event) {
    const files = $event.srcElement.files;
    if (oc(files).length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.importFile(file);
      }
    }
  }

  private importFile(file) {
    if (file && file.name.endsWith('.csv')) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (data) => {
        const csvData = reader.result;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);
        if (csvRecordsArray && csvRecordsArray.length > 2) {
          const elements = [];
          for (let i = 1; i < csvRecordsArray.length; i++) {
            const dataCsv = csvRecordsArray[i].split(excelReportConfig.options.fieldSeparator);
            let text = dataCsv[1] && dataCsv[1].replace(new RegExp(excelReportConfig.newLineSeparator, 'g'), '\n');
            text = text && text.replace(new RegExp(excelReportConfig.doubleQuoteString, 'g'), '"');
            const element = {
              id: null,
              type: dataCsv[0],
              text: text,
              row: Number(dataCsv[2]),
              page: Number(dataCsv[3]),
            } as Element;

            if (element.type) {
              elements.push(element);
            }
          }
          const doc: AppDocument = {
            id: null,
            name: '',
            description: '',
            author: '',
            elements: elements,
            confidentiality: null,
            ownerUsername: '',
          };

          const control = new FormControl(file.name, [Validators.required, Validators.minLength(4),
            Validators.maxLength(INPUT_TEXT_LONG)]);

          this.names.push(control);
          this._documents.push(doc);
        }
      };
    }
  }

  get documents() {
    if (isNotEmptyArray(this._documents)) {
      for (let i = 0; i < this.names.controls.length; i++) {
        const name = this.names.controls[i].value;
        this._documents[i].name = name;
      }
    }
    return this._documents;
  }

  get names(): FormArray {
    return this.importForm.get('names') as FormArray;
  }

  ngOnInit() {
    this._documents = [];
    this.importForm = this.fb.group({
      names: this.fb.array([])
    });
  }
}
