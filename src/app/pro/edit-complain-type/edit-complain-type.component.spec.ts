import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComplainTypeComponent } from './edit-complain-type.component';

describe('EditComplainTypeComponent', () => {
  let component: EditComplainTypeComponent;
  let fixture: ComponentFixture<EditComplainTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComplainTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComplainTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
