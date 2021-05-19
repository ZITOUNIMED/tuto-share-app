import { Component, OnInit } from '@angular/core';
import { AppCollection } from '../shared/model/app-collection.model';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-app-collection-sheet',
  templateUrl: './app-collection-sheet.component.html',
  styleUrls: ['./app-collection-sheet.component.css']
})
export class AppCollectionSheetComponent implements OnInit {
  collection: AppCollection;
  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(data => data && !!data['collection']),
        map(data => data['collection']),
      )
      .subscribe(collection => {
        this.collection = collection;
      });
  }

}
