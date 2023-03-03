import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsHolderComponent } from './posts-holder.component';

describe('PostsHolderComponent', () => {
  let component: PostsHolderComponent;
  let fixture: ComponentFixture<PostsHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsHolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
