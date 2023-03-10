import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'typescript-guid';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { PostModel, postState } from '../Models/post';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent {
  @Input() postData: PostModel;
  @Input() filterCat: string;
  @Output() removeEmitter = new EventEmitter<string>();
  showActions = false;
  commentsLength: number;
  hover: string = 'out';
  sameTypeCounter: {catName: '', };
  URLNEW: string;
  
  constructor(private route: ActivatedRoute, private router: Router, public http: HttpClient, public dialog: MatDialog) { }
  
  ngOnInit() {
    this.showActions = false;
    if (this.postData.comments === undefined) {
      this.commentsLength = 0;
    } else {
      this.commentsLength = this.postData.comments.length;
    }
    this.URLNEW = '/Posts/'+ this.postData.id;   
  }

  openEditDialog(data: string): void {
   
    //1- way to send data in localStorage
    this.postData.state = postState .Modified;
    localStorage.setItem('EditingPost', JSON.stringify(this.postData));

    this.dialog.open(BaseModalComponent, {
      width: 'auto',
      //2- send data in modal object
      data:{id: data}
    });

  }

  filterPosts() {
    if (this.filterCat === 'All' || this.filterCat === this.postData.category) {      
      return true;
    }
    return false;
  }

  removeEmit() {
    this.postData.state = postState.Deleted;
    this.removeEmitter.emit(this.postData.id);
  }

  editEmit() {
    if(this.postData !== undefined) {
      localStorage.setItem('EditingPost', JSON.stringify(this.postData));
    }    
  }

  mouseOver() {
    this.hover = 'in';
    this.showActions = !this.showActions;
  }

  mouseOut() {
    this.hover = 'out';
    this.showActions = !this.showActions;
  } 
}


