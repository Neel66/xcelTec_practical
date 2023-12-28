import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  title: any = 'Delete this item?';
  message: any;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    if (this.inputData) {
      this.title = inputData.title;
      this.message = inputData.message;
    }
  }

  confirm() {
    this.dialogRef.close({ confirm: true });
  }
}
