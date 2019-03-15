import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComplaintViolenceComponent } from './edit-complaint-violence.component';

describe('EditComplaintViolenceComponent', () => {
  let component: EditComplaintViolenceComponent;
  let fixture: ComponentFixture<EditComplaintViolenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComplaintViolenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComplaintViolenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
