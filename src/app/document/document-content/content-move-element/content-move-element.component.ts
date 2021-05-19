import { Component, Input } from '@angular/core';
import {Observable} from 'rxjs';

import {DocumentWrapperState} from '../shared/document-wrapper.state';
import {AppStoreService} from '../../../shared/service/app.store.service';
import {Element} from '../../shared/model/element.model';

@Component({
  selector: 'app-content-move-element',
  templateUrl: './content-move-element.component.html',
})
export class ContentMoveElementComponent {
  @Input() documentWrapperState$: Observable<DocumentWrapperState>;
  @Input() element: Element;
  constructor(public appStoreService: AppStoreService){}
}
