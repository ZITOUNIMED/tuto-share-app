import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent {

  @Input() drawer;
  @Output() toolBarOpenClicked = new EventEmitter<boolean>();
  private value = true;

  constructor() { }

  open() {
    this.toolBarOpenClicked.emit(this.value);
    this.value = !this.value;
  }


}
