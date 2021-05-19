import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppStoreService} from '../service/app.store.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  showLoadignIcon$: Observable<boolean>;
  constructor(private appStoreService: AppStoreService) { }

  ngOnInit() {
    this.showLoadignIcon$ = this.appStoreService.checkLoading();
  }

}
