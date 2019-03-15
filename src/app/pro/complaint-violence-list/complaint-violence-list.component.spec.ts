import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintViolenceListComponent } from './complaint-violence-list.component';

describe('ComplaintViolenceListComponent', () => {
  let component: ComplaintViolenceListComponent;
  let fixture: ComponentFixture<ComplaintViolenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintViolenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintViolenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
