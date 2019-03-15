import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBotMessageComponent } from './add-bot-message.component';

describe('AddBotMessageComponent', () => {
  let component: AddBotMessageComponent;
  let fixture: ComponentFixture<AddBotMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBotMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBotMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
