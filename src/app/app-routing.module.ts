import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { DevSiteComponent } from './dev-site/dev-site.component';

const routes: Routes = [
  {path:'', redirectTo: 'Home', pathMatch:'prefix'},
  {path:'Home', component: HomeComponentComponent},
  {path: 'Posts/:id', component: PostDetailsComponent},
  {path: 'Posts', component: HomeComponentComponent},
  {path: 'Testing', component: DevSiteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
