import { Component, OnInit, Inject } from '@angular/core';
import { AppCollection } from 'src/app/app-collection/shared/model/app-collection.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-add-member-to-collection',
  templateUrl: './add-member-to-collection.component.html',
  styleUrls: ['./add-member-to-collection.component.css']
})
export class AddMemberToCollectionComponent implements OnInit {
  selectedCollection: AppCollection;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                member: User,
                collections: AppCollection[],
              }) { }

  ngOnInit() {
  }

}
