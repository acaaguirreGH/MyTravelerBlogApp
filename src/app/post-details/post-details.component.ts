import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from '../Models/post';
import { PostComment } from '../Models/post-comment';
import { PostService } from '../services/post-service.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {

  currPostId = 0;
  posts: PostModel[];
  currentPost: PostModel;
  commentsArray: PostComment[];
  newComment: PostComment;

  constructor(private postSvc: PostService, private actRoute: ActivatedRoute, private location: Location) {
}

  ngOnInit() {
    let postID = this.actRoute.snapshot.params['id'];

    if (!localStorage.getItem('1')) {
      this.postSvc.GetPosts().subscribe(postArray => this.posts = postArray);
      } else {
        let postsCache = localStorage.getItem('1');
          if (postsCache !== undefined) {
              let r: PostModel[] = JSON.parse(postsCache!);
              this.posts = r;
          }
      }
   
    if (this.posts !== null) {
        this.currentPost = this.posts[this.posts.findIndex(x => x.id == postID)];

        if (this.currentPost.comments !== undefined) {
          this.commentsArray = this.currentPost.comments;
        }
    }
  
    if (this.newComment === undefined) {
      this.newComment = {author: '', comment: ''};
    }  
}

  
  getBGUrl() {
    if(this.currentPost.imageUrl !== '') {
      return this.currentPost.imageUrl;
    } else {
      return 'url(\'https://source.unsplash.com/random\')';
    }    
  }

  GoBack() {
    this.location.back();
  }

  AddComment() {
    if (this.newComment !== undefined) {
      this.newComment.author = 'Juan Perez';
      if ( this.commentsArray === undefined) {
        this.commentsArray = [{author: this.newComment.author, comment: this.newComment.comment}];
      } else {
        this.commentsArray.push({author: this.newComment.author, comment: this.newComment.comment});
      }
      this.currentPost.comments = this.commentsArray;
      this.posts.map(obj => this.posts.find(o => o.id === this.currentPost.id) || obj);
      localStorage.removeItem('1');
      localStorage.setItem('1', JSON.stringify(this.posts));
      this.newComment.comment = '';
      this.newComment.author = '';
    }
  }

}
