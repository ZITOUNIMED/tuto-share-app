import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AppSnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, duration?: number) {
    this.snackBar.open(message, action, {
      duration: duration ? duration : 4000,
    });
  }
}
