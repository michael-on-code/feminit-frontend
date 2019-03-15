import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComplainViolenceComponent } from './add-complain-violence.component';

describe('AddComplainViolenceComponent', () => {
  let component: AddComplainViolenceComponent;
  let fixture: ComponentFixture<AddComplainViolenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComplainViolenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComplainViolenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
