import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from '../Models/post';
import { createApi } from 'unsplash-js';
import { PostService } from '../services/post-service.service';

@Component({
  selector: 'app-posts-holder',
  templateUrl: './posts-holder.component.html',
  styleUrls: ['./posts-holder.component.css']
})
export class PostsHolderComponent implements OnInit  {
  categories: ICategory[];
  currCat: ICategory;
  selectedValueCategory: string;
  newPost: PostModel = {id: 0, category : '', title: '', description: ''};
  postArray: PostModel[];
  postArrayF: PostModel[];
  filterCategory = 'All';
  lastId: number;
  activeModal = false;
  @ViewChild('closebutton', {static: false}) private closeModal: ElementRef;
  unsplashApi = createApi({
    accessKey: 'JxTV9Lriy4vflMjdekklqBnq-ODL0aZP9omvh8Jg3mE'

       });

  constructor(public postServiceOne: PostService, private router: Router) { }
  
  ngOnInit() {
  this.categories = this.postServiceOne.GetCategories();
  if (!localStorage.getItem('EditingPost')) {
      this.postServiceOne.GetPosts().subscribe(postArray => this.postArray = postArray);
      this.postArrayF = this.postArray;
      this.postServiceOne.getUrl();       
  } else {
    let postsCache = localStorage.getItem('EditingPost');
    if (postsCache !== undefined) {
      let r: PostModel[] = JSON.parse(postsCache!);
      this.postArray = r;
      this.postArrayF = this.postArray;
    }
  }
  this.lastId = this.postArray.length;
  this.activeModal = true;
  
}

removePost(postId: number) {
  const postPos = this.postArray.indexOf(this.postArray.find(x => x.id === postId)!);
  this.postArray.splice(postPos, 1);
  if(localStorage.getItem('1')) {
    localStorage.removeItem( '1');
    localStorage.setItem( '1', JSON.stringify(this.postArray));
  } else {
    localStorage.setItem( '1', JSON.stringify(this.postArray));
  }
}

setCategory(option: ICategory) {
  this.currCat = option;
  if (option !== undefined ) {
    this.filterCategory = option.value;
    if(this.filterCategory !== 'All') {
      this.postArray = this.postArrayF.filter(x => x.category === this.filterCategory);
    } else if(this.filterCategory === 'All') {
      this.postArray = this.postArrayF;
    }
  }
}

filterPosts($event: any) {
  if (this.filterCategory === 'All' || this.filterCategory === $event) {
    if($event !== undefined && $event !== '' && $event !== 'All') {
      this.postArray = this.postArray.filter(x => x.category === $event);
    } else if(this.filterCategory === 'All') {
      this.postArray = this.postArrayF;
    }
  }
}

SavePost(data: PostModel) {
  if (data != null) {
     if (this.postArray !== undefined) {
        this.lastId = this.lastId + 1;
        this.postArrayF.push(
          {id: data.id = this.lastId, title: data.title, description: data.description, category: data.category, state: data.state});
          this.lastId = this.lastId + 1;
        this.newPost = new PostModel;
        this.hideModel();
        localStorage.setItem( '1', JSON.stringify(this.postArray));
        
        if(this.postArray.length === 0 && this.postArrayF.length > 0) {
          this.postArray = this.postArrayF;
        }      
        if(this.currCat !== undefined){
          this.setCategory(this.currCat);  
        }else {
          this.currCat = {key: 'AllKey', value: 'All'};
          this.setCategory(this.currCat);
        }
        this.postServiceOne.getUrl();
        
  }
}
}

hideModel() {
this.closeModal.nativeElement.click();
}
}
interface ICategory {
  key: string;
  value: string;
}
