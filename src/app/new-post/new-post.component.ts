import {  Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostModel, postState } from '../Models/post';
import { PostService } from '../services/post-service.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnDestroy {
  categories: { key: string; value: string; }[];
  @Input() newPost: PostModel;
  @Output() postEmit = new EventEmitter<PostModel>();

   constructor(public postService: PostService, public dialog: MatDialog) {
    
  }
 
  ngOnInit() {

    if( localStorage.getItem('EditingPost')) {
      let postsCache = localStorage.getItem('EditingPost');
      let r: PostModel = JSON.parse(postsCache!);
      this.newPost = r;
    }
    if (this.newPost === undefined) {
      this.newPost = new PostModel();
      this.newPost.id = 0;
      this.ClearData();
    }   
    this.categories = this.postService.GetCategories();
  } 

  ngAfterContentChecked(): void {
    if(localStorage.getItem('EditingPost')) {
      let postsCache = localStorage.getItem('EditingPost');
      let r: PostModel = JSON.parse(postsCache!); 
      if (r.state === postState.Existing || r.state === postState.Added) {
        this.newPost = r; 
        this.newPost.state = postState.Modified;
        localStorage.removeItem('EditingPost');
      }
    } 
  }

  SavePost(data: PostModel) {
    
    if(this.newPost.state === postState.Modified) {   
      localStorage.removeItem('EditingPost');  
      localStorage.setItem('EditingPost', JSON.stringify(this.newPost));
      this.postService.savePost(data);
    } else {
      if (data != null) {
        data.state = postState.Added;
        this.postService.savePost(data);
      }
    }
    this.dialog.closeAll();
  } 

  ClearData() {    
    this.newPost.category = '';
    this.newPost.description = '';
    this.newPost.id = 0;
    this.newPost.imageUrl = undefined;
    this.newPost.title = '';
    localStorage.removeItem('EditingPost'); 
  }

  ngOnDestroy(): void {
    this.ClearData();
  }
  
}
