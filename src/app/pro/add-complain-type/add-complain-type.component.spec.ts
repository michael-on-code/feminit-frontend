import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComplainTypeComponent } from './add-complain-type.component';

describe('AddComplainTypeComponent', () => {
  let component: AddComplainTypeComponent;
  let fixture: ComponentFixture<AddComplainTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComplainTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComplainTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
