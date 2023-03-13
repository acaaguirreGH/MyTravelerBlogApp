import { Component, OnDestroy } from '@angular/core';
import { PostModel } from './Models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  ngOnDestroy(): void {
  if(localStorage.getItem('1')){
      let arrayPosts: PostModel[] = JSON.parse(localStorage.getItem('1')!);
        if(arrayPosts.length == 0){
          localStorage.removeItem( '1');
        }      
    }
  }
  title = 'The Traveler Blog';
}
