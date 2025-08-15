import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HttpClientModule } from '@angular/common/http';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsHolderComponent } from './posts-holder/posts-holder.component';
import { NewPostComponent } from './new-post/new-post.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { BaseModalComponent } from './base-modal/base-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewPostReactiveComponent } from './new-post-reactive/new-post-reactive.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarmenuComponent } from './sidebarmenu/sidebarmenu.component';
import { DevSiteComponent } from './dev-site/dev-site.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    PostPreviewComponent,
    PostDetailsComponent,
    PostsHolderComponent,
    NewPostComponent,
    BaseModalComponent,
    NewPostReactiveComponent,
    SidebarmenuComponent,
    DevSiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatGridListModule,
    MatProgressBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
