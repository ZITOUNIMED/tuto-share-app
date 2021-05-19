import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ConfidentialityTypes } from 'src/app/permissions/model/confidentiality-types';
import { oc } from 'src/app/shared/app-utils';
import {AppDocument} from '../../model/document.model';
import { DESCRITION_MAX_LENGTH, INPUT_TEXT_LONG } from '../../../../shared/constants-utils';

@Component({
  selector: 'app-create-update-document',
  templateUrl: './create-update-document.component.html',
  styleUrls: ['./create-update-document.component.css']
})
export class CreateUpdateDocumentComponent implements OnInit {
  createUpdateDocForm: FormGroup;
  fb = new FormBuilder();
  DESCRITION_MAX_LENGTH = DESCRITION_MAX_LENGTH;
  INPUT_TEXT_LONG = INPUT_TEXT_LONG;

  ConfidentialityTypes = ConfidentialityTypes;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    doc: AppDocument
  }) {}

  ngOnInit() {
    this.createUpdateDocForm = this.fb.group({
      name: [oc(oc(this.data).doc).name || '', [Validators.required, Validators.minLength(4), Validators.maxLength(INPUT_TEXT_LONG)]],
      confidentiality: [oc(oc(this.data).doc).confidentiality ||
        ConfidentialityTypes.PRIVATE, Validators.required],
      author: [oc(oc(this.data).doc).author || '', [Validators.required, Validators.minLength(4), Validators.maxLength(INPUT_TEXT_LONG)]],
      description: [oc(oc(this.data).doc).description || '', Validators.maxLength(DESCRITION_MAX_LENGTH)],
    });
  }

  get description() {
    return oc(this.createUpdateDocForm.get('description'));
  }

  get name() {
    return oc(this.createUpdateDocForm.get('name'));
  }

  get author() {
    return oc(this.createUpdateDocForm.get('author'));
  }

  get doc(): AppDocument {
    let doc = null;
    if (this.createUpdateDocForm) {
      doc = {
        id: null,
        elements: [],
        name: this.createUpdateDocForm.get('name').value,
        author: this.createUpdateDocForm.get('author').value,
        description: this.createUpdateDocForm.get('description').value,
        confidentiality: this.createUpdateDocForm.get('confidentiality').value,
      };
    }
    return doc;
  }

}
