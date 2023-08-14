import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {

  hideButton: boolean = true;

  constructor( public dialog: MatDialog) { 
  }

  openDialog(): void {
    this.hideButton = true;
    this.dialog.open(BaseModalComponent, {
      width: '350px',
      id : 'Create'
    });
  }
}
