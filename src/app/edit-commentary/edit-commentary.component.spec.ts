import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommentaryComponent } from './edit-commentary.component';

describe('EditCommentaryComponent', () => {
  let component: EditCommentaryComponent;
  let fixture: ComponentFixture<EditCommentaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommentaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommentaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
