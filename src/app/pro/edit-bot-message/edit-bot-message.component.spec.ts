import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBotMessageComponent } from './edit-bot-message.component';

describe('EditBotMessageComponent', () => {
  let component: EditBotMessageComponent;
  let fixture: ComponentFixture<EditBotMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBotMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBotMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
