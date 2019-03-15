import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintTypeListComponent } from './complaint-type-list.component';

describe('ComplaintTypeListComponent', () => {
  let component: ComplaintTypeListComponent;
  let fixture: ComponentFixture<ComplaintTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
