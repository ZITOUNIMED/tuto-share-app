import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { INPUT_TEXT_LONG, DESCRITION_MAX_LENGTH } from '../../../../shared/constants-utils';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AppCollection } from '../../model/app-collection.model';
import { oc } from 'src/app/shared/app-utils';

@Component({
  selector: 'app-create-update-collection',
  templateUrl: './create-update-collection.component.html',
  styleUrls: ['./create-update-collection.component.css']
})
export class CreateUpdateCollectionComponent implements OnInit {
  createUpdateDocForm: FormGroup;
  fb = new FormBuilder();
  DESCRITION_MAX_LENGTH = DESCRITION_MAX_LENGTH;
  INPUT_TEXT_LONG = INPUT_TEXT_LONG;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    collection: AppCollection
  }) { }

  ngOnInit() {
    this.createUpdateDocForm = this.fb.group({
      name: [oc(oc(this.data).collection).name || '', [Validators.required, Validators.minLength(4), Validators.maxLength(INPUT_TEXT_LONG)]],
      description: [oc(oc(this.data).collection).description || '', Validators.maxLength(DESCRITION_MAX_LENGTH)],
    });
  }

  get description() {
    return oc(this.createUpdateDocForm.get('description'));
  }

  get name() {
    return oc(this.createUpdateDocForm.get('name'));
  }

  get collection(): AppCollection {
    let collection = null;
    if (this.createUpdateDocForm) {
      collection = {
        id: null,
        name: this.createUpdateDocForm.get('name').value,
        description: this.createUpdateDocForm.get('description').value,
      };
    }
    return collection;
  }
}
