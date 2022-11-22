import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {}
@Component({
  selector: 'app-unsaved-dialog',
  templateUrl: './unsaved-dialog.component.html',
  styleUrls: ['./unsaved-dialog.component.css'],
})
export class UnsavedDialogComponent implements OnInit {
  @Output() isDelete = new EventEmitter<boolean>();
  constructor(
    public dialogRef: MatDialogRef<UnsavedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  save() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
  ngOnInit(): void {}
}
