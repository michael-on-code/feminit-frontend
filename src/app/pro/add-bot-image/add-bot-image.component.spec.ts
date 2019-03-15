import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBotImageComponent } from './add-bot-image.component';

describe('AddBotImageComponent', () => {
  let component: AddBotImageComponent;
  let fixture: ComponentFixture<AddBotImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBotImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBotImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
