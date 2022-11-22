import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  deleteUser: (id: string) => void;
  isDelete: boolean;
  id: string;
}
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  @Output() isDelete = new EventEmitter<boolean>();
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.isDelete.emit(true);
    console.log('chaning is Delete', this.isDelete);
    // this.data.deleteUser(this.data.id);
    this._snackBar.open(`Merchant ${this.data.id} Deleted`, 'Dismiss', {
      duration: 2000,
    });
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
