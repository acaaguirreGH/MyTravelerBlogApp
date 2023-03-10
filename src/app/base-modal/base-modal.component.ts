import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.css']
})
export class BaseModalComponent {
bars: number;

  constructor(public dialogRef: MatDialogRef<BaseModalComponent>) {
   
  }
}
