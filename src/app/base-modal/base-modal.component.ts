import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.css']
})
export class BaseModalComponent {
bars: number;
Title2Use: string;

  constructor(public dialogRef: MatDialogRef<BaseModalComponent>) {
    this.Title2Use = ""
   this.Title2Use = dialogRef.id;
  }
}
