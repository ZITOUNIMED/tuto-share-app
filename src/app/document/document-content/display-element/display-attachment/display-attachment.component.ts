import { Component, Input } from '@angular/core';

import {Element} from '../../../shared/model/element.model';
import {AttachmentContent} from "../../../shared/model/app-element-content";

@Component({
  selector: 'app-display-attachment',
  templateUrl: './display-attachment.component.html',
  styleUrls: ['./display-attachment.component.css']
})
export class DisplayAttachmentComponent {
  @Input() attachmentContent: AttachmentContent;
}
