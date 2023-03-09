import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostReactiveComponent } from './new-post-reactive.component';

describe('NewPostReactiveComponent', () => {
  let component: NewPostReactiveComponent;
  let fixture: ComponentFixture<NewPostReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostReactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPostReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
