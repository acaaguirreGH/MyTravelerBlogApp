import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  hideButton: boolean = true;
  //menuItems: string[];

  constructor(private router: Router, public dialog: MatDialog) { 
  }

  ngOnInit() {
    //this.menuItems = ['All', 'Travel', 'Lifestyle', 'Business', 'Food', 'Work'];
    //this.router.navigate(['']);
  }
  

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.hideButton = true;
    this.dialog.open(BaseModalComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
