import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotMessageListComponent } from './bot-message-list.component';

describe('BotMessageListComponent', () => {
  let component: BotMessageListComponent;
  let fixture: ComponentFixture<BotMessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotMessageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
