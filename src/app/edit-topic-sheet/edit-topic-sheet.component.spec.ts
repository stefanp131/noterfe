import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTopicSheetComponent } from './edit-topic-sheet.component';

describe('EditTopicSheetComponent', () => {
  let component: EditTopicSheetComponent;
  let fixture: ComponentFixture<EditTopicSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTopicSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTopicSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
