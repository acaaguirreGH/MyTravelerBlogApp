import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostService } from '../services/post-service.service';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.css']
})
export class BaseModalComponent {
bars: number;

  constructor(private postServiceOne: PostService, public dialogRef: MatDialogRef<BaseModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
   
  }
}
