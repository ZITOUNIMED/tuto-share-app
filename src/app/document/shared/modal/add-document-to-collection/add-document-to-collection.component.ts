import { Component, OnInit, Inject } from '@angular/core';
import { AppCollection } from 'src/app/app-collection/shared/model/app-collection.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AppDocument } from '../../model/document.model';

@Component({
  selector: 'app-add-document-to-collection',
  templateUrl: './add-document-to-collection.component.html',
  styleUrls: ['./add-document-to-collection.component.css']
})
export class AddDocumentToCollectionComponent implements OnInit {
  selectedCollection: AppCollection;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                appDocument: AppDocument,
                collections: AppCollection[],
              }) { }

  ngOnInit() {
  }
}
