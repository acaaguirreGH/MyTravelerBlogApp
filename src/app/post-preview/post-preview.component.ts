import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
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
  screenHeight: number;
  screenWidth: number;
  miniView: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, public http: HttpClient, public dialog: MatDialog,private deviceService: DeviceDetectorService) {
    
   }
  
  ngOnInit() {
    this.getScreenSize();
    if (this.postData.comments === undefined) {
      this.commentsLength = 0;
    } else {
      this.commentsLength = this.postData.comments.length;
    }
    this.URLNEW = '/Posts/'+ this.postData.id;   
  }

  isMobile(): boolean {
    return this.deviceService.isMobile();
  }

  @HostListener('touchend', ['$event'])
  EmitEdit($event:any) {
    if($event.srcElement.offsetParent.innerText == 'delete') {
      this.removeEmit();
    }else if($event.srcElement.offsetParent.innerText == 'edit') {
      this.openEditDialog(this.postData.id)
    }
    return false;
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        //Normal screen size
        if(this.screenHeight < 746 && this.screenWidth < 1536 || this.isMobile()) {
          this.showActions = true;
        } else {
         this.showActions = false;
        }
  }

  openEditDialog(data: string): void {
   
    //1- way to send data in localStorage
    this.postData.state = postState .Modified;
    localStorage.setItem('EditingPost', JSON.stringify(this.postData));

    this.dialog.open(BaseModalComponent, {
      width: 'auto',
      
      //2- send data in modal object
      //data:{id: data}
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


