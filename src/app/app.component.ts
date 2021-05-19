import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AppStoreService } from './shared/service/app.store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(private router: Router,
    private appStoreService: AppStoreService){}

  ngOnInit(): void {
    this.router.events.subscribe(events => {
      this.appStoreService.cleanNotification(true);
    });
  }
}
