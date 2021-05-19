import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-generec-dialog',
  templateUrl: './generec-dialog.component.html',
  styleUrls: ['./generec-dialog.component.css']
})
export class GenerecDialogComponent {

  constructor(public dialogRef: MatDialogRef<GenerecDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, message: string}) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
