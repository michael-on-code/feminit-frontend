import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercomplainComponent } from './usercomplain.component';

describe('UsercomplainComponent', () => {
  let component: UsercomplainComponent;
  let fixture: ComponentFixture<UsercomplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercomplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercomplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
