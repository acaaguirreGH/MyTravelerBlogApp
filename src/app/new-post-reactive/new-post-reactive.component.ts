import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PostModel, postState } from '../Models/post';
import { PostService } from '../services/post-service.service';

@Component({
  selector: 'app-new-post-reactive',
  templateUrl: './new-post-reactive.component.html',
  styleUrls: ['./new-post-reactive.component.css']
})
export class NewPostReactiveComponent {
  postGroup: FormGroup;
  categories: { key: string; value: string; }[];
  newPost: PostModel;

  constructor(private postSvc: PostService, public dialog: MatDialog) {}

  ngOnInit() {    

    if(localStorage.getItem('EditingPost')) {
      let postsCache = localStorage.getItem('EditingPost');
      let r: PostModel = JSON.parse(postsCache!);
      this.newPost = r;

      this.postGroup = new FormGroup({
        Title: new FormControl(this.newPost.title, Validators.required),
        Description: new FormControl(this.newPost.description, Validators.required),
        Category: new FormControl(this.newPost.category, Validators.required),
        imageURL: new FormControl(this.newPost.imageUrl),
        postState: new FormControl(this.newPost.state),
        ID: new FormControl(this.newPost.id)
      });
    }
    if (this.newPost === undefined) {
      this.newPost = new PostModel();
      this.newPost.id = 0;
      this.postGroup = new FormGroup({
        Title: new FormControl('', Validators.required),
        Description: new FormControl('', Validators.required),
        Category: new FormControl('', Validators.required),
        imageURL: new FormControl(),
        postState: new FormControl()
      });
    }  

    this.categories =  this.postSvc.GetCategories();
  }

  get Title() { return this.postGroup.get('Title');}
  get Description() { return this.postGroup.get('Description');}
  get Category() { return this.postGroup.get('Category');}

savePost() {
  if(this.postGroup.valid) {

    let postData: PostModel;
    postData = new PostModel();
    postData.category = this.postGroup.controls['Category'].value;
    postData.description = this.postGroup.controls['Description'].value;
    postData.title = this.postGroup.controls['Title'].value;
    postData.imageUrl = this.postGroup.controls['imageURL'].value;
    postData.state = this.postGroup.controls['postState'].value;
    postData.id = this.postGroup.controls['ID'] ? this.postGroup.controls['ID'].value : 0;

    if(postData.state == postState.Modified) {   
      localStorage.removeItem('EditingPost');  
      localStorage.setItem('EditingPost', JSON.stringify(postData));
      this.postSvc.savePost(postData);
    } else {
      if (postData != null) {
        postData.state = postState.Added;
        this.postSvc.savePost(postData);
      }
    }
    this.dialog.closeAll();
  }

}

ClearData() {    
  this.newPost.category = '';
  this.newPost.description = '';
  this.newPost.id = 0;
  this.newPost.imageUrl = undefined;
  this.newPost.title = '';
  localStorage.removeItem('EditingPost'); 
  this.postGroup.controls['Category'].setValue("");
  this.postGroup.controls['Description'].setValue("");
  this.postGroup.controls['Title'].setValue("");
  this.postGroup.controls['imageURL'].setValue("");
  this.postGroup.controls['postState'].setValue("");
  if(this.postGroup.controls['ID']){
    this.postGroup.controls['ID'].setValue("");
  } 
}

ngOnDestroy(): void {
  this.ClearData();
}

}
