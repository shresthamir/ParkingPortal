import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string) : MatSnackBarRef<any> {
    return this.snackBar.open(message, "Dismiss", {
      verticalPosition: 'top',
      duration: 2000
    });
  }
}
