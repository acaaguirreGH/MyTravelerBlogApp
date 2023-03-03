import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  hideButton: boolean = true;
  //menuItems: string[];

  constructor(private router: Router) { 
  //   this.router.events.subscribe((event: NavigationStart) => {
  //     if (event !== undefined && event.url !== undefined) {
  //       const postId = event.url.substr(7, 8);
  //       if(postId !== undefined && postId !== '') {
  //         this.hideButton = false;
  //       } else {
  //         this.hideButton = true;
  //       }
  //     }
  // });
  }

  ngOnInit() {
    //this.menuItems = ['All', 'Travel', 'Lifestyle', 'Business', 'Food', 'Work'];
    //this.router.navigate(['']);
  }
}
